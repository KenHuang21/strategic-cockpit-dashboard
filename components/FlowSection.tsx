import { TrendingUp } from "lucide-react";

interface FlowSectionProps {
    btcPrice: number;
    stablecoinMcap: number;
}

export function FlowSection({ btcPrice, stablecoinMcap }: FlowSectionProps) {
    // Mock 24h change for Bitcoin
    const btcChange = 2.4; // Mock value

    return (
        <div className="space-y-4 h-full">
            {/* Bitcoin Price - Hero Card */}
            <div className="rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-950/50 to-orange-950/30 p-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs font-bold tracking-wider uppercase text-amber-200">
                        Bitcoin Price
                    </h2>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                </div>
                <div className="flex items-baseline gap-4">
                    <p className="text-6xl font-mono font-bold text-amber-100">
                        ${btcPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <span className={`text-xl font-bold ${btcChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {btcChange >= 0 ? '+' : ''}{btcChange.toFixed(1)}%
                    </span>
                </div>
                <p className="text-xs font-medium text-slate-400 mt-2">Live Market Price (USD)</p>
            </div>

            {/* Stablecoin Market Cap - Area Chart */}
            <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-slate-900/80 to-blue-950/30 p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs font-bold tracking-wider uppercase text-blue-200">
                        Stablecoin Liquidity
                    </h2>
                    <TrendingUp className="w-5 h-5 text-blue-300" />
                </div>

                <p className="text-4xl font-mono font-bold text-slate-100 mb-2">
                    ${(stablecoinMcap / 1_000_000_000).toFixed(1)}B
                </p>

                {/* Smooth Area Chart with Gradient */}
                <div className="relative h-16 mt-4">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                        <defs>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="rgb(96, 165, 250)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Area fill */}
                        <path
                            d="M 0 25 Q 10 22 20 20 T 40 18 T 60 16 T 80 14 T 100 10 L 100 40 L 0 40 Z"
                            fill="url(#areaGradient)"
                        />
                        {/* Line */}
                        <path
                            d="M 0 25 Q 10 22 20 20 T 40 18 T 60 16 T 80 14 T 100 10"
                            fill="none"
                            stroke="rgb(96, 165, 250)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <p className="text-xs font-medium text-slate-400 mt-2">Total Market Capitalization</p>
            </div>
        </div>
    );
}
