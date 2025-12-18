import { TrendingUp } from "lucide-react";

interface FlowSectionProps {
    btcPrice: number;
    stablecoinMcap: number;
}

export function FlowSection({ btcPrice, stablecoinMcap }: FlowSectionProps) {
    const btcChange = 2.4;

    return (
        <div className="space-y-4 h-full">
            {/* Bitcoin Price - Hero Card */}
            <div className="rounded-lg bg-amber-950/30 p-8">
                <p className="text-[10px] font-bold tracking-widest uppercase text-amber-300/70 mb-4">
                    Bitcoin Price
                </p>
                <div className="flex items-baseline gap-3">
                    <p className="text-6xl font-bold text-amber-200">
                        ${btcPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <span className={`text-xl font-bold ${btcChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {btcChange >= 0 ? '↑' : '↓'}{btcChange >= 0 ? '+' : ''}{btcChange.toFixed(1)}%
                    </span>
                </div>
            </div>

            {/* Stablecoin Market Cap */}
            <div className="rounded-lg bg-slate-800/40 p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                        Stablecoin Liquidity
                    </p>
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>

                <p className="text-4xl font-bold text-white mb-4">
                    ${(stablecoinMcap / 1_000_000_000).toFixed(1)}B
                </p>

                {/* Smooth Area Chart */}
                <div className="relative h-16 mt-4">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                        <defs>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="rgb(96, 165, 250)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 0 25 Q 10 22 20 20 T 40 18 T 60 16 T 80 14 T 100 10 L 100 40 L 0 40 Z"
                            fill="url(#areaGradient)"
                        />
                        <path
                            d="M 0 25 Q 10 22 20 20 T 40 18 T 60 16 T 80 14 T 100 10"
                            fill="none"
                            stroke="rgb(96, 165, 250)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <p className="text-xs text-slate-500 mt-2">Total Market Capitalization</p>
            </div>
        </div>
    );
}
