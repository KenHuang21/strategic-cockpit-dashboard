import { TrendingDown, TrendingUp } from "lucide-react";

interface MacroSignalCardProps {
    us10yYield: number;
    fedNetLiquidity: number;
    isBearish: boolean;
    us10yYield7dChange?: number;
    fedNetLiquidity7dChange?: number;
}

export function MacroSignalCard({
    us10yYield,
    fedNetLiquidity,
    isBearish,
    us10yYield7dChange,
    fedNetLiquidity7dChange
}: MacroSignalCardProps) {
    // Calculate Fed Net Liquidity absolute change in billions
    const fedNetLiquidityAbsoluteChange = fedNetLiquidity7dChange !== undefined
        ? (fedNetLiquidity / 1_000) * (fedNetLiquidity7dChange / 100)
        : undefined;

    // Calculate US 10Y Yield absolute change
    const us10yYieldAbsoluteChange = us10yYield7dChange !== undefined
        ? (us10yYield * us10yYield7dChange) / 100
        : undefined;

    return (
        <div
            className={`
        rounded-lg p-6 h-full
        ${isBearish
                    ? 'bg-slate-800/60'
                    : 'bg-emerald-900/20'
                }
      `}
        >
            <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                    Macro Environment
                </p>
                {isBearish ? (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                ) : (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                )}
            </div>

            <div className="space-y-6">
                {/* US 10Y Yield - Terminal Style */}
                <div>
                    {/* Label */}
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-2">
                        US 10Y YIELD
                    </p>

                    {/* Main Value with Arrow and Delta */}
                    <div className="flex items-center gap-3">
                        <p className="text-5xl font-bold text-white">
                            {us10yYield.toFixed(2)}%
                        </p>
                        {us10yYieldAbsoluteChange !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <span className={`text-3xl ${us10yYieldAbsoluteChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {us10yYieldAbsoluteChange >= 0 ? '▲' : '▼'}
                                </span>
                                <span className={`text-2xl font-bold ${us10yYieldAbsoluteChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {Math.abs(us10yYieldAbsoluteChange).toFixed(2)}
                                </span>
                                <span className="text-xs text-zinc-600 font-normal ml-1">
                                    (7d)
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fed Net Liquidity - Terminal Style */}
                <div>
                    {/* Label */}
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-2">
                        FED NET LIQUIDITY
                    </p>

                    {/* Main Value with Arrow and Delta */}
                    <div className="flex items-center gap-3">
                        <p className="text-4xl font-bold text-white">
                            ${(fedNetLiquidity / 1_000_000).toFixed(2)}T
                        </p>
                        {fedNetLiquidityAbsoluteChange !== undefined && (
                            <div className="flex items-center gap-1.5">
                                <span className={`text-2xl ${fedNetLiquidityAbsoluteChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {fedNetLiquidityAbsoluteChange >= 0 ? '▲' : '▼'}
                                </span>
                                <span className={`text-xl font-bold ${fedNetLiquidityAbsoluteChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    ${Math.abs(fedNetLiquidityAbsoluteChange).toFixed(0)}B
                                </span>
                                <span className="text-xs text-zinc-600 font-normal ml-1">
                                    (WoW)
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Badge */}
                <div className="pt-4">
                    <div className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold
            ${isBearish
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-emerald-500/30 text-emerald-300'
                        }
          `}>
                        ● {isBearish ? 'RISK OFF' : 'RISK ON'}
                    </div>
                </div>
            </div>
        </div>
    );
}
