import { motion } from "framer-motion";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { TrendingUp, BarChart2 } from "lucide-react";

const rainfallData = [
  { region: "Northern CA", rainfall: 180, optimal: 150 },
  { region: "Central CA", rainfall: 120, optimal: 130 },
  { region: "Southern CA", rainfall: 75, optimal: 100 },
  { region: "Coastal", rainfall: 145, optimal: 140 },
  { region: "Valley", rainfall: 95, optimal: 110 },
];

const temperatureData = [
  { month: "Oct", day: 22, night: 12 },
  { month: "Nov", day: 18, night: 8 },
  { month: "Dec", day: 14, night: 4 },
  { month: "Jan", day: 12, night: 2 },
  { month: "Feb", day: 15, night: 5 },
  { month: "Mar", day: 19, night: 9 },
];

const moistureData = [
  { week: "W1", moisture: 65 },
  { week: "W2", moisture: 72 },
  { week: "W3", moisture: 68 },
  { week: "W4", moisture: 58 },
  { week: "W5", moisture: 52 },
  { week: "W6", moisture: 48 },
  { week: "W7", moisture: 45 },
  { week: "W8", moisture: 42 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.unit || ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ClimateCharts = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart2 className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Climate Analytics
            </span>
          </div>
          <h2 className="section-title mb-4">Regional Climate Data</h2>
          <p className="section-subtitle mx-auto">
            Interactive visualizations of rainfall, temperature, and soil moisture trends
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Rainfall Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-water/20 flex items-center justify-center">
                <BarChart2 className="w-5 h-5 text-water" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Rainfall Distribution</h3>
                <p className="text-sm text-muted-foreground">By region (mm)</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainfallData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="region" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="rainfall" 
                    fill="hsl(195 85% 50%)" 
                    radius={[4, 4, 0, 0]}
                    name="Actual Rainfall"
                  />
                  <Bar 
                    dataKey="optimal" 
                    fill="hsl(142 55% 42%)" 
                    radius={[4, 4, 0, 0]}
                    name="Optimal Range"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Temperature Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Temperature Trends</h3>
                <p className="text-sm text-muted-foreground">Day vs Night (°C)</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="day" 
                    stroke="hsl(24 75% 55%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(24 75% 55%)", strokeWidth: 2 }}
                    name="Day Temp"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="night" 
                    stroke="hsl(200 75% 55%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(200 75% 55%)", strokeWidth: 2 }}
                    name="Night Temp"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Soil Moisture Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 card-glass p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-soil/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-soil" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Soil Moisture Forecast</h3>
                <p className="text-sm text-muted-foreground">Weekly projection (%)</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moistureData}>
                  <defs>
                    <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25 35% 30%)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(25 35% 30%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="moisture"
                    stroke="hsl(25 35% 30%)"
                    strokeWidth={3}
                    fill="url(#moistureGradient)"
                    name="Moisture Level"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-risk-low" />
                <span>Optimal: 50-70%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-risk-medium" />
                <span>Low: 30-50%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-risk-high" />
                <span>Critical: &lt;30%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClimateCharts;
