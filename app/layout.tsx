import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strategic Cockpit | Macro & Web3 Dashboard",
  description: "Executive dashboard for macro and Web3 strategic metrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0a0a0a] text-slate-200">
        {children}
      </body>
    </html>
  );
}
