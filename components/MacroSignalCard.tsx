import { TrendingDown, TrendingUp } from "lucide-react";

interface MacroSignalCardProps {
    us10yYield: number;
    fedNetLiquidity: number;
    isBearish: boolean;
}

export function MacroSignalCard({ us10yYield, fedNetLiquidity, isBearish }: MacroSignalCardProps) {
    return (
        <div
            className={`
        rounded-lg border p-6 h-full
        transition-all duration-500
        ${isBearish
                    ? 'border-red-500/30 bg-gradient-to-br from-red-950/40 to-red-900/20'
                    : 'border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-emerald-900/20'
                }
      `}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold tracking-wider uppercase text-slate-300">
                    Macro Environment
                </h2>
                {isBearish ? (
                    <TrendingDown className="w-5 h-5 text-red-300" />
                ) : (
                    <TrendingUp className="w-5 h-5 text-emerald-300" />
                )}
            </div>

            <div className="space-y-6">
                {/* US 10Y Yield */}
                <div>
                    <p className="text-xs font-medium text-slate-400 mb-2">US 10Y Treasury Yield</p>
                    <p className={`text-4xl font-mono font-bold ${isBearish ? 'text-red-300' : 'text-emerald-300'}`}>
                        {us10yYield.toFixed(2)}%
                    </p>
                </div>

                {/* Fed Net Liquidity */}
                <div>
                    <p className="text-xs font-medium text-slate-400 mb-2">Fed Net Liquidity</p>
                    <p className="text-4xl font-mono font-bold text-slate-100">
                        ${(fedNetLiquidity / 1_000_000).toFixed(2)}T
                    </p>
                </div>

                {/* Status Badge */}
                <div className="pt-4 border-t border-white/10">
                    <div className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold tracking-wide
            ${isBearish
                            ? 'bg-red-500/30 text-red-200 border border-red-500/40'
                            : 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/40'
                        }
          `}>
                        {isBearish ? '● RISK OFF' : '● RISK ON'}
                    </div>
                </div>
            </div>
        </div>
    );
}
