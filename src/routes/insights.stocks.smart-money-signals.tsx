import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { Button } from "@/components/finalyse/ui";
import {
  MorningPick,
  MacroPanel,
  MainChart,
  IndustryPanel,
  PortfolioOptimization,
  PerformancePanel,
} from "@/components/finalyse/dashboard";
import { ArrowRight, BrainCircuit, LineChart, ShieldCheck, Lock } from "lucide-react";

export const Route = createFileRoute("/insights/stocks/smart-money-signals")({
  head: () => ({
    meta: [
      { title: "finAlyse: AI-assisted Stock Picker · Eric Costa" },
      {
        name: "description",
        content:
          "A product case study by Eric Costa. finAlyse ingests insider and congressional disclosures, runs nine quant models per ticker, and pushes scored calls to a dashboard and Slack.",
      },
      { property: "og:title", content: "finAlyse: AI-assisted Stock Picker" },
      {
        property: "og:description",
        content:
          "Ensemble scoring, Bayesian decay curves, and copula tail risk in one minimalist platform.",
      },
    ],
  }),
  component: SmartMoneySignals,
});

// Local badge variant for the marketing surface (differs from the dashboard Badge).
function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "neutral";
}) {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    neutral: "bg-gray-800 text-gray-300 border-gray-700",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function SmartMoneySignals() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fcfcfc]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif font-bold text-xl tracking-tight text-gray-900">finAlyse.</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#ai-capabilities" className="hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#dashboard" className="hover:text-gray-900 transition-colors">
              Platform
            </a>
            <Link to="/" className="hover:text-gray-900 transition-colors">
              Portfolio
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden sm:block"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ericnc09/financial-planner"
              target="_blank"
              rel="noreferrer"
            >
              <Button size="sm">View on GitHub</Button>
            </a>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
          <Badge className="mb-6">v2.0 Beta Now Available</Badge>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Plan your investments with <span className="italic text-gray-600">precision.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A product case study by Eric Costa. Analyze allocation details, track portfolio growth,
            and leverage advanced AI models in one unified, minimalist platform. Designed for ease
            and absolute control.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 py-2 px-4 rounded-full w-fit mx-auto border border-gray-200">
            <Lock className="w-4 h-4" /> Standalone analysis. No brokerage linking required.
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/ericnc09/financial-planner"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="w-full group">
                Start Analyzing{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </section>
        {/* AI & Morning Pick Section */}
        <section
          id="ai-capabilities"
          className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <MorningPick />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
                AI Capabilities
              </h2>
              <h3 className="font-serif text-4xl font-bold text-gray-900 mb-6">
                Institutional grade models, simplified.
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We've abstracted away the complexity of advanced financial modeling. Get your
                morning top pick powered by ensemble scoring, right out of the box.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: BrainCircuit,
                    title: "Ensemble Scoring",
                    desc: "Combines multiple predictive models for a single, high-conviction composite score.",
                  },
                  {
                    icon: LineChart,
                    title: "Bayesian Decay Curves",
                    desc: "Real-time adjustment of signal strength based on historical half-life data.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Copula Tail Risk",
                    desc: "Advanced gauge for extreme market events and portfolio vulnerability.",
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600 mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Scrolling Details Vibe */}
        <section id="dashboard" className="py-24 px-6 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
                Deep Dive
              </h2>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                Uncover the details as you scroll.
              </h3>
              <p className="mt-4 text-gray-600">
                From macro regimes to options flow, get the full picture without the clutter.
              </p>
            </div>
            <div className="space-y-16">
              {/* Row 1: Ticker Detail & Macro */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                    <div className="font-serif text-2xl">Ticker Detail: AAPL</div>
                    <Badge variant="neutral" className="bg-gray-800 text-gray-300 border-gray-700">
                      Live Analysis
                    </Badge>
                  </div>
                  <div className="space-y-6 font-mono text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Monte Carlo (10k paths)</span>
                      <span className="text-green-400">P(Profit) = 68.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">GARCH(1,1) Vol Forecast</span>
                      <span>18.4% Ann.</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">HMM Regime Prob.</span>
                      <span>Bull (82%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Fama-French Exposure</span>
                      <span>Quality, Momentum</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Options Flow (PCR)</span>
                      <span className="text-red-400">0.85 (Bearish)</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <MacroPanel />
                </div>
              </div>
              {/* Row 2: Main Chart & Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <MainChart />
                <div className="lg:col-span-1">
                  <PerformancePanel />
                </div>
              </div>
              {/* Row 3: Industry Flow & Portfolio Optimization */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <IndustryPanel />
                </div>
                <div className="lg:col-span-2">
                  <PortfolioOptimization />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif font-bold text-xl tracking-tight text-gray-900">finAlyse.</div>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900 transition-colors">
              Portfolio
            </Link>
            <a
              href="https://github.com/ericnc09/financial-planner"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              LinkedIn
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Eric Costa. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
