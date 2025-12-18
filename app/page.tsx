"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MacroSignalCard } from "@/components/MacroSignalCard";
import { FlowSection } from "@/components/FlowSection";
import { RWAFocusCard } from "@/components/RWAFocusCard";
import { RefreshButton } from "@/components/RefreshButton";
import { isMacroBearish } from "@/lib/utils";
import { Activity } from "lucide-react";

interface DashboardData {
  timestamp: string;
  metrics: {
    us_10y_yield: number;
    fed_net_liquidity: number;
    bitcoin_price: number;
    stablecoin_mcap: number;
    usdt_dominance: number;
    rwa_tvl: number;
    us_10y_yield_7d_change?: number;
    fed_net_liquidity_7d_change?: number;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/dashboard_data.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 animate-pulse text-emerald-400" />
          <p className="text-slate-300 font-mono">Loading Strategic Cockpit...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-300 font-medium">Failed to load dashboard data</p>
      </div>
    );
  }

  const bearish = isMacroBearish(data.metrics.us_10y_yield, data.metrics.usdt_dominance);
  const updatedAt = new Date(data.timestamp).toLocaleString('en-SG', {
    timeZone: 'Asia/Singapore',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <main className="min-h-screen p-6 md:p-8 lg:p-10 bg-slate-950">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-200 mb-1">
                Strategic Cockpit
              </h1>
              <p className="text-sm text-slate-500">
                Macro & Web3 Intelligence Dashboard
              </p>
            </div>
            <Link
              href="/docs"
              className="px-3 py-1.5 rounded-md bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600 transition-all text-sm text-slate-300 hover:text-slate-100 font-medium"
            >
              📖 Docs
            </Link>
          </div>

          {/* Last Updated & Refresh */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-wide text-slate-500 uppercase">Last Updated</p>
              <p className="text-sm font-mono text-slate-400">{updatedAt} SGT</p>
            </div>
            <RefreshButton />
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Column - Macro Environment (span 3) */}
          <div className="md:col-span-3">
            <MacroSignalCard
              us10yYield={data.metrics.us_10y_yield}
              fedNetLiquidity={data.metrics.fed_net_liquidity}
              isBearish={bearish}
              us10yYield7dChange={data.metrics.us_10y_yield_7d_change}
              fedNetLiquidity7dChange={data.metrics.fed_net_liquidity_7d_change}
            />
          </div>

          {/* Middle Column - The Flow (span 6) */}
          <div className="md:col-span-6">
            <FlowSection
              btcPrice={data.metrics.bitcoin_price}
              stablecoinMcap={data.metrics.stablecoin_mcap}
            />
          </div>

          {/* Right Column - RWA Focus + USDT Dominance (span 3) */}
          <div className="md:col-span-3">
            <RWAFocusCard
              rwaTvl={data.metrics.rwa_tvl}
              usdtDominance={data.metrics.usdt_dominance}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1600px] mx-auto mt-8">
        <div className="flex items-center justify-between text-xs pt-6 border-t border-white/5">
          <div className="text-slate-600">
            <span>6 metrics tracked</span>
            <span className="mx-2">•</span>
            <span>Real-time data feeds</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">OPERATIONAL</span>
          </div>
        </div>
      </div>
    </main>
  );
}
