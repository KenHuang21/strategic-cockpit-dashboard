'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Info } from 'lucide-react';

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState('overview');

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-400">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center text-slate-400 hover:text-slate-100 transition-colors text-sm font-medium"
                    >
                        <span className="mr-2">←</span>
                        Back to Cockpit
                    </Link>
                    <div className="text-sm text-slate-500">Strategic Cockpit Documentation</div>
                </div>
            </header>

            <div className="flex max-w-7xl mx-auto">
                {/* Sidebar Navigation */}
                <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-800 min-h-screen sticky top-[73px] self-start">
                    <nav className="p-6 space-y-6">
                        <div>
                            <button
                                onClick={() => scrollToSection('overview')}
                                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === 'overview'
                                    ? 'bg-slate-800 text-slate-100'
                                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                                    }`}
                            >
                                Overview
                            </button>
                        </div>

                        <div>
                            <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Macro Environment
                            </h3>
                            <div className="mt-2 space-y-1">
                                <button
                                    onClick={() => scrollToSection('us-10y-yield')}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === 'us-10y-yield'
                                        ? 'bg-slate-800 text-slate-100'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                                        }`}
                                >
                                    US 10Y Treasury Yield
                                </button>
                                <button
                                    onClick={() => scrollToSection('fed-liquidity')}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === 'fed-liquidity'
                                        ? 'bg-slate-800 text-slate-100'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                                        }`}
                                >
                                    Fed Net Liquidity
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Market Engine
                            </h3>
                            <div className="mt-2 space-y-1">
                                <button
                                    onClick={() => scrollToSection('bitcoin')}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === 'bitcoin'
                                        ? 'bg-slate-800 text-slate-100'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                                        }`}
                                >
                                    Bitcoin Price
                                </button>
                                <button
                                    onClick={() => scrollToSection('stablecoin')}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === 'stablecoin'
                                        ? 'bg-slate-800 text-slate-100'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                                        }`}
                                >
                                    Stablecoin Market Cap
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Strategic Focus
                            </h3>
                            <div className="mt-2 space-y-1">
                                <button
                                    onClick={() => scrollToSection('usdt-dominance')}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === 'usdt-dominance'
                                        ? 'bg-slate-800 text-slate-100'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                                        }`}
                                >
                                    USDT Dominance
                                </button>
                                <button
                                    onClick={() => scrollToSection('rwa')}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === 'rwa'
                                        ? 'bg-slate-800 text-slate-100'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                                        }`}
                                >
                                    RWA Onchain Value
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Notifications
                            </h3>
                            <div className="mt-2 space-y-1">
                                <button
                                    onClick={() => scrollToSection('telegram-notifications')}
                                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === 'telegram-notifications'
                                        ? 'bg-slate-800 text-slate-100'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                                        }`}
                                >
                                    Telegram Notifications
                                </button>
                            </div>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 px-6 lg:px-12 py-12 max-w-4xl">
                    {/* Overview */}
                    <section id="overview" className="mb-16">
                        <div className="mb-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">Overview</div>
                        <h1 className="text-4xl font-bold text-slate-100 mb-4">Dashboard Definitions &amp; Strategy</h1>

                        {/* Info Box */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8 flex gap-3">
                            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div className="text-sm text-slate-300">
                                <strong className="text-slate-100">Core Philosophy:</strong> This dashboard tracks the correlation between{' '}
                                <strong className="text-slate-100">Global Macro Constraints</strong> (The Ceiling) and{' '}
                                <strong className="text-slate-100">Web3 Structural Liquidity</strong> (The Floor).
                            </div>
                        </div>
                    </section>

                    {/* Macro Environment Section */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-100 mb-8 pb-3 border-b border-slate-800">
                            1. Macro Environment (The Constraints)
                        </h2>

                        {/* US 10Y Treasury Yield */}
                        <div id="us-10y-yield" className="mb-12">
                            <h3 className="text-xl font-semibold text-slate-100 mb-4">🏛️ US 10Y Treasury Yield</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <div>
                                    <strong className="text-slate-200">Definition:</strong>
                                    <p className="mt-1">The &quot;Risk-Free Rate&quot;. It acts as the gravity for all risk assets.</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Data Source:</strong>
                                    <p className="mt-1">FRED (Series: DGS10)</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Update Frequency:</strong>
                                    <p className="mt-1">Daily Close</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">How to Read:</strong>
                                    <ul className="mt-2 ml-6 space-y-2 list-disc">
                                        <li><strong className="text-red-400">▼ Decrease (Red)</strong>: Bullish. Cheaper money usually fuels Crypto assets.</li>
                                        <li><strong className="text-emerald-400">▲ Increase (Green)</strong>: Bearish. Higher yields drain liquidity back to bonds.</li>
                                        <li><strong className="text-slate-300">Timeframe</strong>: The delta shows the change over the last <strong>7 Days (7d)</strong> to filter out daily noise.</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 mt-4">
                                    <strong className="text-slate-200">Strategic Threshold:</strong>
                                    <p className="mt-1">If Yield &gt; <code className="px-2 py-0.5 bg-slate-800 rounded text-emerald-400">4.5%</code>, we enter a &quot;Risk Off&quot; regime.</p>
                                </div>
                                <div className="mt-4">
                                    <strong className="text-slate-200">🔗 Learn More:</strong>
                                    <p className="mt-1">
                                        <a
                                            href="https://www.investopedia.com/terms/1/10-yeartreasury.asp"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                                        >
                                            Understanding the 10-Year Treasury Note (Investopedia)
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Fed Net Liquidity */}
                        <div id="fed-liquidity" className="mb-12">
                            <h3 className="text-xl font-semibold text-slate-100 mb-4">💧 Fed Net Liquidity</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <div>
                                    <strong className="text-slate-200">Definition:</strong>
                                    <p className="mt-1">The actual amount of USD available in the financial system for asset purchasing. It acts as the &quot;fuel&quot; for markets.</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Data Source:</strong>
                                    <p className="mt-1">FRED (St. Louis Fed). Calculation required.</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Update Frequency:</strong>
                                    <p className="mt-1">Weekly (Published Thursday afternoon EST)</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Formula:</strong>
                                    <div className="mt-2 bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400">
                                        Fed Balance Sheet - TGA (Treasury General Account) - Reverse Repo (RRP)
                                    </div>
                                </div>
                                <div>
                                    <strong className="text-slate-200">How to Read:</strong>
                                    <ul className="mt-2 ml-6 space-y-2 list-disc">
                                        <li><strong className="text-emerald-400">▲ Increase (Green)</strong>: Liquidity Injection. The Fed is effectively adding fuel. Bullish for risk assets.</li>
                                        <li><strong className="text-red-400">▼ Decrease (Red)</strong>: Liquidity Drain. The Fed is withdrawing fuel. Bearish for risk assets.</li>
                                        <li><strong className="text-slate-300">Timeframe</strong>: The delta shows the change Week-over-Week (<strong>WoW</strong>)</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 mt-4">
                                    <strong className="text-slate-200">Strategic Threshold:</strong>
                                    <p className="mt-1">This is the &quot;Water Level&quot;. Even if rates are high, if Net Liquidity is showing sustained <strong className="text-emerald-400">▲ Increases (Green)</strong>, assets can still pump. Watch out for consecutive weekly drains.</p>
                                </div>
                                <div className="mt-4">
                                    <strong className="text-slate-200">🔗 Learn More:</strong>
                                    <p className="mt-1">
                                        <a
                                            href="https://www.investopedia.com/terms/f/federalreservebalancesheet.asp"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                                        >
                                            Understanding the Federal Reserve Balance Sheet (Investopedia)
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Market Engine Section */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-100 mb-8 pb-3 border-b border-slate-800">
                            2. Market Engine (The Flow)
                        </h2>

                        {/* Bitcoin Price */}
                        <div id="bitcoin" className="mb-12">
                            <h3 className="text-xl font-semibold text-slate-100 mb-4">₿ Bitcoin Price</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <div>
                                    <strong className="text-slate-200">Definition:</strong>
                                    <p className="mt-1">The Beta of the entire industry.</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Role:</strong>
                                    <p className="mt-1">The Benchmark. We use BTC price action to confirm if the market is decoupling from Macro.</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Visuals:</strong>
                                    <p className="mt-1">Displayed in <strong className="text-yellow-500">Gold</strong> to serve as the visual anchor.</p>
                                </div>
                            </div>
                        </div>

                        {/* Stablecoin Market Cap */}
                        <div id="stablecoin" className="mb-12">
                            <h3 className="text-xl font-semibold text-slate-100 mb-4">🌊 Stablecoin Market Cap</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <div>
                                    <strong className="text-slate-200">Definition:</strong>
                                    <p className="mt-1">The &quot;M2 Supply&quot; of Web3. It represents dry powder on-chain.</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Data Source:</strong>
                                    <p className="mt-1">DefiLlama</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">How to Read:</strong>
                                    <ul className="mt-2 ml-6 space-y-2 list-disc">
                                        <li><strong className="text-emerald-400">Uptrend</strong>: Fresh fiat capital is entering the ecosystem (Genuine Bull Market)</li>
                                        <li><strong className="text-red-400">Flat/Down</strong>: Capital is just rotating between assets (PVP Market)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Strategic Focus Section */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-100 mb-8 pb-3 border-b border-slate-800">
                            3. Strategic Focus (Cobo Alpha)
                        </h2>

                        {/* USDT Dominance */}
                        <div id="usdt-dominance" className="mb-12">
                            <h3 className="text-xl font-semibold text-slate-100 mb-4">😨 USDT Dominance</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <div>
                                    <strong className="text-slate-200">Definition:</strong>
                                    <p className="mt-1">The &quot;Fear Gauge&quot;. The percentage of total crypto market cap held in USDT.</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">How to Read:</strong>
                                    <ul className="mt-2 ml-6 space-y-2 list-disc">
                                        <li><strong className="text-red-400">&gt; 6.0%</strong>: High Fear (Investors fleeing to cash). Often a local bottom signal.</li>
                                        <li><strong className="text-emerald-400">&lt; 4.0%</strong>: Extreme Greed</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Logic:</strong>
                                    <p className="mt-1">It acts as a counter-indicator to price.</p>
                                </div>
                            </div>
                        </div>

                        {/* RWA Onchain Value */}
                        <div id="rwa" className="mb-12">
                            <h3 className="text-xl font-semibold text-slate-100 mb-4">🏦 RWA Onchain Value</h3>
                            <div className="space-y-4 text-sm leading-relaxed">
                                <div>
                                    <strong className="text-slate-200">Definition:</strong>
                                    <p className="mt-1">Total Value Locked in Real World Asset protocols (excluding Stablecoins).</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Focus:</strong>
                                    <p className="mt-1">We specifically track <strong className="text-slate-100">Tokenized Treasuries</strong> (e.g., Ondo, Franklin Templeton).</p>
                                </div>
                                <div>
                                    <strong className="text-slate-200">Why we track this:</strong>
                                    <ul className="mt-2 ml-6 space-y-2 list-disc">
                                        <li>To validate the &quot;Institutional Adoption&quot; thesis</li>
                                        <li>If RWA grows while BTC is flat, it confirms a structural shift in utility</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Telegram Notifications Section */}
                    <section id="telegram-notifications" className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-100 mb-8 pb-3 border-b border-slate-800">
                            4. Telegram Notifications
                        </h2>

                        <div className="space-y-6 text-sm leading-relaxed">
                            <div>
                                <strong className="text-slate-200">Overview:</strong>
                                <p className="mt-1">
                                    The Strategic Cockpit runs automated data collection every <strong>15 minutes</strong> via GitHub Actions.
                                    However, to minimize noise and maximize signal, Telegram notifications are <strong>only sent when metrics
                                        cross predefined thresholds</strong>.
                                </p>
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-100">Smart Filtering:</strong>
                                        <p className="mt-1 text-slate-300">
                                            Notifications detect changes in <strong>both directions</strong> (increases ▲ and decreases ▼).
                                            This ensures you're alerted to significant moves regardless of market direction.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <strong className="text-slate-200">Notification Thresholds:</strong>
                                <div className="mt-3 overflow-x-auto">
                                    <table className="w-full border border-slate-800 rounded-lg overflow-hidden">
                                        <thead>
                                            <tr className="bg-slate-900/50 border-b border-slate-800">
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Metric</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Threshold</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Sensitivity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            <tr className="hover:bg-slate-900/30">
                                                <td className="px-4 py-3 text-slate-300">🏛️ US 10Y Yield</td>
                                                <td className="px-4 py-3">
                                                    <code className="px-2 py-0.5 bg-slate-800 rounded text-emerald-400">0.0</code>
                                                </td>
                                                <td className="px-4 py-3 text-slate-400">Absolute</td>
                                                <td className="px-4 py-3 text-red-400 font-medium">Any Change</td>
                                            </tr>
                                            <tr className="hover:bg-slate-900/30">
                                                <td className="px-4 py-3 text-slate-300">💧 Fed Net Liquidity</td>
                                                <td className="px-4 py-3">
                                                    <code className="px-2 py-0.5 bg-slate-800 rounded text-emerald-400">0.0%</code>
                                                </td>
                                                <td className="px-4 py-3 text-slate-400">Relative</td>
                                                <td className="px-4 py-3 text-red-400 font-medium">Any Change</td>
                                            </tr>
                                            <tr className="hover:bg-slate-900/30">
                                                <td className="px-4 py-3 text-slate-300">🌊 Stablecoin Market Cap</td>
                                                <td className="px-4 py-3">
                                                    <code className="px-2 py-0.5 bg-slate-800 rounded text-emerald-400">0.1%</code>
                                                </td>
                                                <td className="px-4 py-3 text-slate-400">Relative</td>
                                                <td className="px-4 py-3 text-yellow-400">High</td>
                                            </tr>
                                            <tr className="hover:bg-slate-900/30">
                                                <td className="px-4 py-3 text-slate-300">₿ Bitcoin Price</td>
                                                <td className="px-4 py-3">
                                                    <code className="px-2 py-0.5 bg-slate-800 rounded text-emerald-400">0.5%</code>
                                                </td>
                                                <td className="px-4 py-3 text-slate-400">Relative</td>
                                                <td className="px-4 py-3 text-blue-400">Medium</td>
                                            </tr>
                                            <tr className="hover:bg-slate-900/30">
                                                <td className="px-4 py-3 text-slate-300">😨 USDT Dominance</td>
                                                <td className="px-4 py-3">
                                                    <code className="px-2 py-0.5 bg-slate-800 rounded text-emerald-400">0.5%</code>
                                                </td>
                                                <td className="px-4 py-3 text-slate-400">Relative</td>
                                                <td className="px-4 py-3 text-blue-400">Medium</td>
                                            </tr>
                                            <tr className="hover:bg-slate-900/30">
                                                <td className="px-4 py-3 text-slate-300">🏦 RWA TVL</td>
                                                <td className="px-4 py-3">
                                                    <code className="px-2 py-0.5 bg-slate-800 rounded text-emerald-400">1.0%</code>
                                                </td>
                                                <td className="px-4 py-3 text-slate-400">Relative</td>
                                                <td className="px-4 py-3 text-slate-400">Low</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <strong className="text-slate-200">How It Works:</strong>
                                <ul className="mt-2 ml-6 space-y-2 list-disc">
                                    <li>
                                        <strong className="text-slate-300">Absolute Thresholds</strong> (US 10Y Yield):
                                        Triggers on the raw difference in value (e.g., 4.15% → 4.16% = 0.01 point change).
                                    </li>
                                    <li>
                                        <strong className="text-slate-300">Relative Thresholds</strong> (All others):
                                        Triggers on percentage change from the previous value (e.g., BTC $100,000 → $100,500 = 0.5% change).
                                    </li>
                                    <li>
                                        <strong className="text-slate-300">Bidirectional Detection</strong>:
                                        Both increases (▲ green arrows) and decreases (▼ red arrows) are tracked.
                                        The threshold applies to the <em>absolute value</em> of the change.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mt-4">
                                <strong className="text-slate-200">Notification Format:</strong>
                                <p className="mt-2">Each notification displays:</p>
                                <ul className="mt-2 ml-6 space-y-1 list-disc text-slate-300">
                                    <li>Current metric value</li>
                                    <li>Direction indicator (▲ green for up, ▼ red for down)</li>
                                    <li>Percentage change since last notification</li>
                                    <li>Risk status (RISK ON / RISK OFF)</li>
                                </ul>
                            </div>

                            <div>
                                <strong className="text-slate-200">Example Scenarios:</strong>
                                <div className="mt-3 space-y-3">
                                    <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-3">
                                        <div className="text-slate-200 font-medium mb-1">✅ Notification Sent</div>
                                        <div className="text-xs text-slate-400">
                                            BTC price: $100,000 → $100,600 (0.6% increase) - Exceeds 0.5% threshold
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-3">
                                        <div className="text-slate-200 font-medium mb-1">❌ No Notification</div>
                                        <div className="text-xs text-slate-400">
                                            BTC price: $100,000 → $100,400 (0.4% increase) - Below 0.5% threshold
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-3">
                                        <div className="text-slate-200 font-medium mb-1">✅ Notification Sent (Decrease)</div>
                                        <div className="text-xs text-slate-400">
                                            BTC price: $100,000 → $99,400 (0.6% decrease) - Exceeds 0.5% threshold
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mt-6">
                                <strong className="text-amber-400">⚡ High-Priority Metrics:</strong>
                                <p className="mt-1 text-slate-300">
                                    US 10Y Yield and Fed Net Liquidity have <strong>0.0 thresholds</strong>, meaning you'll be
                                    notified of <strong>every change</strong>. These are critical macro indicators that directly
                                    impact market conditions.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
