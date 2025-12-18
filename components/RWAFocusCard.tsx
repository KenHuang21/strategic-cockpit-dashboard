import { Target, AlertCircle } from "lucide-react";

interface RWAFocusCardProps {
    rwaTvl: number;
}

export function RWAFocusCard({ rwaTvl }: RWAFocusCardProps) {
    return (
        <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-950/50 to-violet-950/30 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-xs font-bold tracking-wider uppercase text-purple-200">
                        RWA Focus
                    </h2>
                    <span className="px-2 py-1 text-[10px] font-bold bg-purple-500/40 text-purple-100 rounded border border-purple-400/40">
                        KEY STRATEGY
                    </span>
                </div>
                <Target className="w-5 h-5 text-purple-300" />
            </div>

            <div className="space-y-6">
                {/* Total RWA TVL */}
                <div>
                    <p className="text-xs font-medium text-slate-400 mb-2">Total Value Locked</p>
                    <p className="text-4xl font-mono font-bold text-purple-200">
                        ${(rwaTvl / 1_000_000_000).toFixed(1)}B
                    </p>
                    <p className="text-xs font-medium text-emerald-300 mt-1">129 protocols tracked</p>
                </div>

                {/* Monitoring Alert */}
                <div className="pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs font-bold text-slate-200 mb-1">Active Monitoring</p>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Ondo, Franklin Templeton, Maple, Goldfinch, Centrifuge
                            </p>
                        </div>
                    </div>
                </div>

                {/* Categories Breakdown */}
                <div className="pt-4 border-t border-white/10">
                    <p className="text-xs font-bold text-slate-300 mb-3">Coverage</p>
                    <div className="space-y-2">
                        {[
                            { name: 'RWA', color: 'purple' },
                            { name: 'RWA Lending', color: 'blue' },
                            { name: 'Private Credit', color: 'emerald' }
                        ].map((category) => (
                            <div key={category.name} className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full bg-${category.color}-400`} />
                                <span className="text-xs font-medium text-slate-300">{category.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
