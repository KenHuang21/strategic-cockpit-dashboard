#!/usr/bin/env python3
"""
Macro & Web3 Strategic Dashboard - Metrics Fetcher
Fetches 6 key financial/crypto metrics from multiple data sources.
"""

import json
import requests
import time
from datetime import datetime
from typing import Dict, Any, Optional
import yfinance as yf
from fredapi import Fred
from tabulate import tabulate


class MetricsFetcher:
    """Fetches and processes financial metrics from various sources."""
    
    def __init__(self, fred_api_key: str = "YOUR_FRED_API_KEY"):
        """
        Initialize the metrics fetcher.
        
        Args:
            fred_api_key: API key for FRED (Federal Reserve Economic Data)
        """
        self.fred_api_key = fred_api_key
        self.results = []
        self.data = {}
        
        # Create a custom session for yfinance with User-Agent headers
        self.yf_session = requests.Session()
        self.yf_session.headers.update({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        })
        
    def fetch_us_10y_yield(self) -> Optional[float]:
        """
        Fetch US 10-Year Treasury Bond Yield.
        Primary: FRED API (DGS10)
        Fallback: yfinance with custom session
        
        Returns:
            Current yield value or None if fetch fails
        """
        max_retries = 2
        for attempt in range(max_retries):
            try:
                # Method 1 (Primary): Try FRED API first
                if self.fred_api_key != "YOUR_FRED_API_KEY":
                    try:
                        from datetime import datetime, timedelta
                        fred = Fred(api_key=self.fred_api_key)
                        
                        # Get last 14 days of data to ensure we have 7 business days
                        end_date = datetime.now()
                        start_date = end_date - timedelta(days=14)
                        
                        dgs10 = fred.get_series('DGS10', start_date=start_date, end_date=end_date)
                        
                        # Current value (most recent)
                        value = float(dgs10.iloc[-1])
                        
                        # Calculate 7-day change
                        seven_day_change = None
                        if len(dgs10) >= 7:
                            # Get value from ~7 business days ago
                            old_value = float(dgs10.iloc[-7])
                            seven_day_change = ((value - old_value) / old_value) * 100
                        
                        self.results.append({
                            "Metric": "US 10Y Bond Yield",
                            "Value": f"{value:.2f}%",
                            "Source": "FRED API (DGS10)",
                            "Status": "✓ Success"
                        })
                        self.data["us_10y_yield"] = value
                        if seven_day_change is not None:
                            self.data["us_10y_yield_7d_change"] = seven_day_change
                        return value
                    except Exception:
                        pass  # If FRED fails, try yfinance
                
                # Method 2 (Fallback): Try yfinance with custom session
                try:
                    ticker = yf.Ticker("^TNX", session=self.yf_session)
                    hist = ticker.history(period="5d")
                    
                    if not hist.empty:
                        value = float(hist['Close'].iloc[-1])
                        self.results.append({
                            "Metric": "US 10Y Bond Yield",
                            "Value": f"{value:.2f}%",
                            "Source": "yfinance (^TNX)",
                            "Status": "✓ Success"
                        })
                        self.data["us_10y_yield"] = value
                        return value
                except Exception:
                    pass  # Both failed
                
                raise ValueError("Both FRED and yfinance failed")
                
            except Exception as e:
                if attempt < max_retries - 1:
                    time.sleep(2)  # Wait 2 seconds before retry
                    continue
                else:
                    self.results.append({
                        "Metric": "US 10Y Bond Yield",
                        "Value": "N/A",
                        "Source": "FRED/yfinance",
                        "Status": f"✗ Failed: {str(e)[:30]}"
                    })
                    self.data["us_10y_yield"] = None
                    return None
    
    def fetch_bitcoin_price(self) -> Optional[float]:
        """
        Fetch current Bitcoin price.
        Primary: CoinGecko API
        Fallback: yfinance with custom session
        
        Returns:
            Current BTC price in USD or None if fetch fails
        """
        max_retries = 2
        for attempt in range(max_retries):
            try:
                # Method 1 (Primary): Try CoinGecko first
                try:
                    btc_url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
                    response = requests.get(btc_url, timeout=10)
                    response.raise_for_status()
                    btc_data = response.json()
                    value = float(btc_data['bitcoin']['usd'])
                    self.results.append({
                        "Metric": "Bitcoin Price",
                        "Value": f"${value:,.2f}",
                        "Source": "CoinGecko API",
                        "Status": "✓ Success"
                    })
                    self.data["bitcoin_price"] = value
                    return value
                except Exception:
                    pass  # If CoinGecko fails, try yfinance
                
                # Method 2 (Fallback): Try yfinance with custom session
                try:
                    ticker = yf.Ticker("BTC-USD", session=self.yf_session)
                    hist = ticker.history(period="5d")
                    
                    if not hist.empty:
                        value = float(hist['Close'].iloc[-1])
                        self.results.append({
                            "Metric": "Bitcoin Price",
                            "Value": f"${value:,.2f}",
                            "Source": "yfinance (BTC-USD)",
                            "Status": "✓ Success"
                        })
                        self.data["bitcoin_price"] = value
                        return value
                except Exception:
                    pass  # Both failed
                
                raise ValueError("Both CoinGecko and yfinance failed")
                
            except Exception as e:
                if attempt < max_retries - 1:
                    time.sleep(2)  # Wait 2 seconds before retry
                    continue
                else:
                    self.results.append({
                        "Metric": "Bitcoin Price",
                        "Value": "N/A",
                        "Source": "CoinGecko/yfinance",
                        "Status": f"✗ Failed: {str(e)[:30]}"
                    })
                    self.data["bitcoin_price"] = None
                    return None
    
    def fetch_stablecoin_mcap(self) -> Optional[float]:
        """
        Fetch total Stablecoin Market Cap from DefiLlama.
        
        Returns:
            Total stablecoin market cap or None if fetch fails
        """
        try:
            url = "https://stablecoins.llama.fi/stablecoins?includePrices=true"
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            # Sum circulating USD for all stablecoins
            total_mcap = 0
            for coin in data.get('peggedAssets', []):
                circulating = coin.get('circulating', {}).get('peggedUSD', 0)
                if circulating:
                    total_mcap += float(circulating)
            
            if total_mcap == 0:
                raise ValueError("No stablecoin data found")
                
            value = total_mcap
            self.results.append({
                "Metric": "Stablecoin Market Cap",
                "Value": f"${value:,.0f}",
                "Source": "DefiLlama API",
                "Status": "✓ Success"
            })
            self.data["stablecoin_mcap"] = value
            return value
            
        except Exception as e:
            self.results.append({
                "Metric": "Stablecoin Market Cap",
                "Value": "N/A",
                "Source": "DefiLlama API",
                "Status": f"✗ Failed: {str(e)[:30]}"
            })
            self.data["stablecoin_mcap"] = None
            return None
    
    def fetch_rwa_tvl(self) -> Optional[float]:
        """
        Fetch Total RWA (Real World Assets) TVL from DefiLlama.
        
        Returns:
            Total RWA TVL or None if fetch fails
        """
        try:
            # Fetch all protocols from DefiLlama
            url = "https://api.llama.fi/protocols"
            response = requests.get(url, timeout=15)
            response.raise_for_status()
            
            protocols = response.json()
            
            # Filter protocols by RWA category and sum their TVL
            target_categories = ["RWA", "RWA Lending", "Private Credit", "Real World Assets"]
            total_rwa_tvl = 0
            rwa_count = 0
            
            for protocol in protocols:
                # Check if protocol is in target categories
                if protocol.get('category') in target_categories:
                    tvl = protocol.get('tvl', 0)
                    if tvl:
                        total_rwa_tvl += float(tvl)
                        rwa_count += 1
            
            if total_rwa_tvl == 0:
                raise ValueError("No RWA protocols found or total TVL is zero")
            
            value = total_rwa_tvl
            self.results.append({
                "Metric": "Total RWA TVL",
                "Value": f"${value:,.0f}",
                "Source": f"DefiLlama API ({rwa_count} protocols)",
                "Status": "✓ Success"
            })
            self.data["rwa_tvl"] = value
            return value
            
        except Exception as e:
            self.results.append({
                "Metric": "Total RWA TVL",
                "Value": "N/A",
                "Source": "DefiLlama API",
                "Status": f"✗ Failed: {str(e)[:30]}"
            })
            self.data["rwa_tvl"] = None
            return None
    
    def fetch_usdt_dominance(self) -> Optional[float]:
        """
        Fetch USDT Dominance (USDT Market Cap / Total Crypto Market Cap * 100).
        Uses CoinGecko API for market cap data.
        
        Returns:
            USDT dominance percentage or None if fetch fails
        """
        try:
            # Fetch USDT market cap
            usdt_url = "https://api.coingecko.com/api/v3/coins/tether"
            response = requests.get(usdt_url, timeout=10)
            response.raise_for_status()
            usdt_data = response.json()
            usdt_mcap = float(usdt_data['market_data']['market_cap']['usd'])
            
            # Fetch global crypto market cap
            global_url = "https://api.coingecko.com/api/v3/global"
            response = requests.get(global_url, timeout=10)
            response.raise_for_status()
            global_data = response.json()
            total_mcap = float(global_data['data']['total_market_cap']['usd'])
            
            # Calculate dominance
            dominance = (usdt_mcap / total_mcap) * 100
            
            self.results.append({
                "Metric": "USDT Dominance",
                "Value": f"{dominance:.2f}%",
                "Source": "CoinGecko API",
                "Status": "✓ Success"
            })
            self.data["usdt_dominance"] = dominance
            return dominance
            
        except Exception as e:
            self.results.append({
                "Metric": "USDT Dominance",
                "Value": "N/A",
                "Source": "CoinGecko API",
                "Status": f"✗ Failed: {str(e)[:30]}"
            })
            self.data["usdt_dominance"] = None
            return None
    
    def fetch_fed_net_liquidity(self) -> Optional[float]:
        """
        Fetch Fed Net Liquidity.
        Formula: WALCL (Total Assets) - TGA (Treasury General Account) - RRP (Reverse Repo)
        
        Returns:
            Net liquidity value or None if fetch fails
        """
        try:
            if self.fred_api_key == "YOUR_FRED_API_KEY":
                raise ValueError("FRED API key not configured")
                
            from datetime import datetime, timedelta
            fred = Fred(api_key=self.fred_api_key)
            
            # Get last 14 days of data
            end_date = datetime.now()
            start_date = end_date - timedelta(days=14)
            
            # Fetch the latest values for each series
            walcl_series = fred.get_series('WALCL', start_date=start_date, end_date=end_date)
            tga_series = fred.get_series('WTREGEN', start_date=start_date, end_date=end_date)
            rrp_series = fred.get_series('RRPONTSYD', start_date=start_date, end_date=end_date)
            
            # Current values
            walcl = walcl_series.iloc[-1]
            tga = tga_series.iloc[-1]
            rrp = rrp_series.iloc[-1]
            
            # Calculate current net liquidity (in billions)
            net_liquidity = float(walcl - tga - rrp)
            
            # Calculate 7-day change
            seven_day_change = None
            if len(walcl_series) >= 7 and len(tga_series) >= 7 and len(rrp_series) >= 7:
                old_walcl = walcl_series.iloc[-7]
                old_tga = tga_series.iloc[-7]
                old_rrp = rrp_series.iloc[-7]
                old_net_liquidity = float(old_walcl - old_tga - old_rrp)
                seven_day_change = ((net_liquidity - old_net_liquidity) / old_net_liquidity) * 100
            
            self.results.append({
                "Metric": "Fed Net Liquidity",
                "Value": f"${net_liquidity:,.0f}B",
                "Source": "FRED API",
                "Status": "✓ Success"
            })
            self.data["fed_net_liquidity"] = net_liquidity
            if seven_day_change is not None:
                self.data["fed_net_liquidity_7d_change"] = seven_day_change
            return net_liquidity
            
        except Exception as e:
            self.results.append({
                "Metric": "Fed Net Liquidity",
                "Value": "N/A",
                "Source": "FRED API",
                "Status": f"✗ Failed: {str(e)[:30]}"
            })
            self.data["fed_net_liquidity"] = None
            return None
    
    def fetch_all_metrics(self) -> Dict[str, Any]:
        """
        Fetch all 6 metrics and compile results.
        
        Returns:
            Dictionary containing all metrics and metadata
        """
        print("🔄 Fetching Macro & Web3 Metrics...\n")
        
        # Fetch all metrics
        self.fetch_us_10y_yield()
        self.fetch_bitcoin_price()
        self.fetch_stablecoin_mcap()
        self.fetch_rwa_tvl()
        self.fetch_usdt_dominance()
        self.fetch_fed_net_liquidity()
        
        # Print results table
        print("\n" + "="*80)
        print("📊 MACRO & WEB3 STRATEGIC DASHBOARD - METRICS REPORT")
        print("="*80 + "\n")
        print(tabulate(self.results, headers="keys", tablefmt="rounded_grid"))
        print("\n" + "="*80 + "\n")
        
        # Compile final output
        output = {
            "timestamp": datetime.now().isoformat(),
            "timestamp_unix": int(datetime.now().timestamp()),
            "metrics": self.data,
            "summary": {
                "total_metrics": len(self.results),
                "successful": len([r for r in self.results if "✓" in r["Status"]]),
                "failed": len([r for r in self.results if "✗" in r["Status"]])
            }
        }
        
        return output
    
    def save_to_json(self, output: Dict[str, Any], filename: str = "dashboard_data.json"):
        """
        Save metrics data to JSON file.
        
        Args:
            output: Data dictionary to save
            filename: Output filename
        """
        try:
            with open(filename, 'w') as f:
                json.dump(output, f, indent=2)
            print(f"✅ Data saved to: {filename}")
        except Exception as e:
            print(f"❌ Failed to save JSON: {e}")


def main():
    """Main execution function."""
    # Initialize fetcher (replace with your actual FRED API key)
    fetcher = MetricsFetcher(fred_api_key="1be1d07bd97df586c3e81893338b87dc")
    
    # Fetch all metrics
    output = fetcher.fetch_all_metrics()
    
    # Save to JSON
    fetcher.save_to_json(output)


if __name__ == "__main__":
    main()
