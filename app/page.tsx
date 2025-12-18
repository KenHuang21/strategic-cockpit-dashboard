"use client";

import { useEffect, useState } from "react";
import { MacroSignalCard } from "@/components/MacroSignalCard";
import { FlowSection } from "@/components/FlowSection";
import { RWAFocusCard } from "@/components/RWAFocusCard";
import { isMacroBearish } from "@/lib/utils";
import { Activity, TrendingUp } from "lucide-react";

interface DashboardData {
  timestamp: string;
  metrics: {
    us_10y_yield: number;
    fed_net_liquidity: number;
    bitcoin_price: number;
    stablecoin_mcap: number;
    usdt_dominance: number;
    rwa_tvl: number;
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
  const updatedAt = new Date(data.timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <main className="min-h-screen p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
              Strategic Cockpit
            </h1>
            <p className="text-sm font-medium text-slate-400">
              Macro & Web3 Intelligence Dashboard
            </p>
          </div>
          <div className="flex items-center gap-6">
            {/* USDT Dominance - Integrated into header */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2">
              <p className="text-[10px] font-bold tracking-wide text-slate-400 mb-1">USDT DOMINANCE</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <p className="text-xl font-mono font-bold text-slate-100">
                  {data.metrics.usdt_dominance.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-wide text-slate-400 mb-1">LAST UPDATED</p>
              <p className="text-sm font-mono font-medium text-slate-200">{updatedAt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Left Column - Macro Environment (span 3) */}
          <div className="md:col-span-3">
            <MacroSignalCard
              us10yYield={data.metrics.us_10y_yield}
              fedNetLiquidity={data.metrics.fed_net_liquidity}
              isBearish={bearish}
            />
          </div>

          {/* Middle Column - The Flow (span 6) */}
          <div className="md:col-span-6">
            <FlowSection
              btcPrice={data.metrics.bitcoin_price}
              stablecoinMcap={data.metrics.stablecoin_mcap}
            />
          </div>

          {/* Right Column - RWA Focus (span 3) */}
          <div className="md:col-span-3">
            <RWAFocusCard rwaTvl={data.metrics.rwa_tvl} />
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="max-w-[1600px] mx-auto mt-8">
        <div className="flex items-center justify-between text-xs border-t border-white/10 pt-6">
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span>6 metrics tracked</span>
            <span>•</span>
            <span>Real-time data feeds</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
            <span className="text-emerald-300 font-bold tracking-wide">OPERATIONAL</span>
          </div>
        </div>
      </div>
    </main>
  );
}
