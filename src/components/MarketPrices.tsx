import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, DollarSign, AlertCircle, Search } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Mock data - in production, this would come from a real commodity API
const marketData = [
  { crop: "Wheat", minPrice: 22, avgPrice: 25, maxPrice: 28, trend: "up", change: 3.2 },
  { crop: "Chickpea", minPrice: 45, avgPrice: 52, maxPrice: 58, trend: "up", change: 5.1 },
  { crop: "Mustard", minPrice: 38, avgPrice: 42, maxPrice: 48, trend: "down", change: -2.3 },
  { crop: "Lentil", minPrice: 55, avgPrice: 62, maxPrice: 70, trend: "stable", change: 0.5 },
  { crop: "Fenugreek", minPrice: 35, avgPrice: 40, maxPrice: 45, trend: "up", change: 4.8 },
];

const priceChartData = marketData.map((item) => ({
  name: item.crop,
  min: item.minPrice,
  avg: item.avgPrice,
  max: item.maxPrice,
}));

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-risk-low" />;
    case "down":
      return <TrendingDown className="w-4 h-4 text-risk-high" />;
    default:
      return <Minus className="w-4 h-4 text-risk-medium" />;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "text-risk-low bg-risk-low/10";
    case "down":
      return "text-risk-high bg-risk-high/10";
    default:
      return "text-risk-medium bg-risk-medium/10";
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.fill }}>
            {entry.name}: ₹{entry.value}/kg
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MarketPrices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const filteredData = marketData.filter((item) =>
    item.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="section-padding bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <DollarSign className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Market Intelligence
            </span>
          </div>
          <h2 className="section-title mb-4">Commodity Prices</h2>
          <p className="section-subtitle mx-auto">
            Real-time market prices to help you make profitable decisions
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Price Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass p-6"
          >
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Price Comparison (₹/kg)
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="min" fill="hsl(200 75% 55%)" radius={[0, 0, 0, 0]} name="Min Price" />
                  <Bar dataKey="avg" fill="hsl(142 55% 42%)" radius={[0, 0, 0, 0]} name="Avg Price" />
                  <Bar dataKey="max" fill="hsl(38 85% 55%)" radius={[0, 4, 4, 0]} name="Max Price" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Price Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {filteredData.map((item, index) => (
              <motion.div
                key={item.crop}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="card-glass p-4 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedCrop(selectedCrop === item.crop ? null : item.crop)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{item.crop}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>Min: ₹{item.minPrice}</span>
                      <span>Avg: ₹{item.avgPrice}</span>
                      <span>Max: ₹{item.maxPrice}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getTrendColor(item.trend)}`}>
                    {getTrendIcon(item.trend)}
                    <span className="text-sm font-medium">
                      {item.change > 0 ? "+" : ""}{item.change}%
                    </span>
                  </div>
                </div>
                
                {selectedCrop === item.crop && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">7-day change</span>
                      <span className={item.change > 0 ? "text-risk-low" : item.change < 0 ? "text-risk-high" : "text-risk-medium"}>
                        {item.change > 0 ? "↑" : item.change < 0 ? "↓" : "→"} {Math.abs(item.change)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Based on regional market data. Prices may vary by location.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}

            {filteredData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No crops found matching "{searchQuery}"</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          Market prices are indicative and updated periodically. Please verify with local mandis.
        </motion.div>
      </div>
    </section>
  );
};

export default MarketPrices;
