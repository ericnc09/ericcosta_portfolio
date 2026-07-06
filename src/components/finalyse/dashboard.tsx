import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "./ui";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  ShieldAlert,
  Zap,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// --- Dummy Data ---
const chartData = Array.from({ length: 30 }).map((_, i) => ({
  date: `Day ${i + 1}`,
  price: 150 + Math.random() * 40 + i * 1.5,
  volume: 1000 + Math.random() * 5000,
}));
const efficientFrontierData = Array.from({ length: 50 }).map((_, i) => ({
  risk: 5 + Math.random() * 20,
  return: 2 + Math.random() * 15 + i * 0.2,
  z: 100,
}));
const macroData = [
  { label: "Yield Spread (10Y-2Y)", value: "-0.42%", status: "negative", trend: "down" },
  { label: "Unemployment", value: "3.8%", status: "neutral", trend: "up" },
  { label: "CPI (YoY)", value: "3.1%", status: "warning", trend: "down" },
  { label: "Fed Funds", value: "5.25%", status: "neutral", trend: "flat" },
];
const industryData = [
  { name: "Technology", signals: 42, split: 75, top: "NVDA" },
  { name: "Healthcare", signals: 28, split: 45, top: "LLY" },
  { name: "Financials", signals: 35, split: 60, top: "JPM" },
  { name: "Energy", signals: 12, split: 30, top: "XOM" },
];

export function MorningPick() {
  return (
    <Card className="h-full border-gray-200 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Morning Top Pick</CardTitle>
        <Badge variant="success" className="animate-pulse">
          Live Signal
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-5xl font-serif font-bold text-gray-900 tracking-tight">NVDA</h2>
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">
              Nvidia Corp • Technology
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light text-gray-900">
              98<span className="text-lg text-gray-400">/100</span>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Composite Score</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Conviction</div>
            <div className="font-semibold text-gray-900 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" /> Strong Buy
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Monte Carlo P(Win)
            </div>
            <div className="font-semibold text-gray-900">87.4%</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ensemble</div>
            <div className="font-semibold text-gray-900">Bullish</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" /> Signal Context
            </span>
            <span className="font-medium">Momentum Breakout + Option Flow</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-gray-400" /> Copula Tail Risk
            </span>
            <Badge variant="neutral">Low</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MacroPanel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Macro Regime</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-xl">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Current Regime
            </div>
            <div className="font-serif text-xl">Late Cycle Expansion</div>
          </div>
          <Activity className="w-8 h-8 text-gray-400 opacity-50" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {macroData.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-gray-900">{item.value}</span>
                {item.trend === "up" && <TrendingUp className="w-3 h-3 text-gray-400" />}
                {item.trend === "down" && <TrendingDown className="w-3 h-3 text-gray-400" />}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-100">
          <Button variant="ghost" size="sm" className="w-full justify-between text-gray-500">
            View Extended Macro <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function MainChart() {
  const [range, setRange] = useState("30D");
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <CardTitle>Price History & Projections</CardTitle>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-sm font-medium">NVDA</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {["30D", "90D", "1Y", "2Y"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                range === r
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111827" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                domain={["dataMin - 20", "dataMax + 20"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#111827", fontWeight: 500 }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#111827"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Price</div>
            <div className="text-xl font-serif">$210.45</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Period Change</div>
            <div className="text-xl font-serif text-green-600">+14.2%</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              GARCH Volatility
            </div>
            <div className="text-xl font-serif">High</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function IndustryPanel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Industry Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {industryData.map((ind) => (
            <div key={ind.name} className="group cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium text-gray-900">{ind.name}</div>
                <div className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                  Top: {ind.top}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-500 w-12">{ind.split}% Buy</div>
                <div className="h-1.5 flex-grow bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gray-900 transition-all duration-500"
                    style={{ width: `${ind.split}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PerformancePanel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Strategy & Execution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          Our quantitative approach leverages ensemble machine learning models to identify
          high-probability setups, strictly managing downside risk through dynamic position sizing.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Win Rate</div>
            <div className="text-2xl font-serif text-gray-900">68.4%</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg Return</div>
            <div className="text-2xl font-serif text-green-600">+14.2%</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sharpe Ratio</div>
            <div className="text-2xl font-serif text-gray-900">1.85</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Max Drawdown</div>
            <div className="text-2xl font-serif text-red-600">-8.4%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PortfolioOptimization() {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Mean-Variance Optimization</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Efficient frontier & risk contribution</p>
        </div>
        <Button variant="outline" size="sm">
          Run Backtest
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1 h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                type="number"
                dataKey="risk"
                name="Risk (Vol)"
                unit="%"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
              />
              <YAxis
                type="number"
                dataKey="return"
                name="Expected Return"
                unit="%"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
              />
              <ZAxis type="number" range={[20, 20]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ borderRadius: "8px" }} />
              <Scatter
                name="Portfolios"
                data={efficientFrontierData}
                fill="#9ca3af"
                opacity={0.5}
              />
              {/* Highlight Optimal Point */}
              <Scatter name="Max Sharpe" data={[{ risk: 15, return: 12, z: 100 }]} fill="#111827" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-6 flex flex-col justify-center">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Max Sharpe Allocation
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">NVDA</span>
                <span>40%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">MSFT</span>
                <span>35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Cash</span>
                <span>25%</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Expected Portfolio Return
            </div>
            <div className="text-2xl font-serif">
              12.4% <span className="text-sm text-gray-400 font-sans">Ann.</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
