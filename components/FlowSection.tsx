import { Waves } from "lucide-react";

interface FlowSectionProps {
    btcPrice: number;
    stablecoinMcap: number;
}

export function FlowSection({ btcPrice, stablecoinMcap }: FlowSectionProps) {
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
                <p className="text-6xl font-mono font-bold text-amber-100">
                    ${btcPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs font-medium text-slate-400 mt-2">Live Market Price (USD)</p>
            </div>

            {/* Stablecoin Market Cap */}
            <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-slate-900/80 to-blue-950/30 p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs font-bold tracking-wider uppercase text-blue-200">
                        Stablecoin Liquidity
                    </h2>
                    <Waves className="w-5 h-5 text-blue-300" />
                </div>

                <p className="text-4xl font-mono font-bold text-slate-100 mb-2">
                    ${(stablecoinMcap / 1_000_000_000).toFixed(1)}B
                </p>

                {/* Mock sparkline placeholder */}
                <div className="flex items-end gap-1 h-12 mt-4">
                    {[40, 45, 42, 48, 52, 49, 55, 53, 58, 62, 60, 65, 68, 70, 75].map((height, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-blue-400/30 rounded-t transition-all hover:bg-blue-400/50"
                            style={{ height: `${height}%` }}
                        />
                    ))}
                </div>
                <p className="text-xs font-medium text-slate-400 mt-2">Total Market Capitalization</p>
            </div>
        </div>
    );
}
