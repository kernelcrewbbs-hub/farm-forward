import { motion } from "framer-motion";
import { Gauge, Leaf, Droplets, Sprout, TrendingUp, Award, Target } from "lucide-react";
import { useState } from "react";

interface TrackerMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: typeof Leaf;
  color: string;
  trend: "up" | "down" | "stable";
}

const metrics: TrackerMetric[] = [
  {
    id: "organic",
    label: "Organic Inputs",
    value: 72,
    target: 100,
    unit: "%",
    icon: Leaf,
    color: "stroke-leaf",
    trend: "up",
  },
  {
    id: "water",
    label: "Water Efficiency",
    value: 85,
    target: 100,
    unit: "%",
    icon: Droplets,
    color: "stroke-water",
    trend: "up",
  },
  {
    id: "soil",
    label: "Soil Health Score",
    value: 68,
    target: 100,
    unit: "/100",
    icon: Sprout,
    color: "stroke-soil",
    trend: "stable",
  },
  {
    id: "carbon",
    label: "Carbon Footprint",
    value: 34,
    target: 0,
    unit: "t CO₂",
    icon: Target,
    color: "stroke-primary",
    trend: "down",
  },
];

const ProgressRing = ({ 
  value, 
  maxValue, 
  color, 
  size = 120 
}: { 
  value: number; 
  maxValue: number; 
  color: string; 
  size?: number 
}) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.min(value / maxValue, 1);
  const strokeDashoffset = circumference - percent * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-muted fill-none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={`${color} fill-none`}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">/ {maxValue}</span>
      </div>
    </div>
  );
};

const SustainabilityTracker = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const overallScore = Math.round(
    metrics.reduce((acc, m) => {
      if (m.id === "carbon") {
        return acc + (100 - m.value);
      }
      return acc + m.value;
    }, 0) / metrics.length
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
            <Gauge className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Eco Impact
            </span>
          </div>
          <h2 className="section-title mb-4">Sustainability Tracker</h2>
          <p className="section-subtitle mx-auto">
            Monitor your farm's environmental impact and track progress towards sustainability goals
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex flex-col items-center">
              <div className="relative">
                <ProgressRing value={overallScore} maxValue={100} color="stroke-primary" size={160} />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
                >
                  <Award className="w-6 h-6 text-secondary-foreground" />
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mt-4">Overall Sustainability Score</h3>
              <p className="text-muted-foreground text-sm">
                {overallScore >= 80 ? "Excellent! Keep up the great work." :
                 overallScore >= 60 ? "Good progress. Room for improvement." :
                 "Let's work on improving your sustainability."}
              </p>
            </div>
          </motion.div>

          {/* Individual Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
                className={`card-glass p-6 cursor-pointer transition-all ${
                  selectedMetric === metric.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <ProgressRing 
                    value={metric.id === "carbon" ? 100 - metric.value : metric.value} 
                    maxValue={100} 
                    color={metric.color} 
                    size={100} 
                  />
                  <div className="mt-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <metric.icon className={`w-4 h-4 ${metric.color.replace("stroke-", "text-")}`} />
                      <span className="font-medium text-foreground">{metric.label}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-1 text-sm">
                      <span className={`${
                        metric.trend === "up" ? "text-leaf" : 
                        metric.trend === "down" ? (metric.id === "carbon" ? "text-leaf" : "text-destructive") : 
                        "text-muted-foreground"
                      }`}>
                        {metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→"}
                      </span>
                      <span className="text-muted-foreground">
                        {metric.value}{metric.unit}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedMetric === metric.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground"
                  >
                    {metric.id === "organic" && "Increase organic inputs by using more compost and bio-fertilizers."}
                    {metric.id === "water" && "Great water efficiency! Consider mulching to reduce evaporation further."}
                    {metric.id === "soil" && "Add more organic matter and practice cover cropping to improve soil health."}
                    {metric.id === "carbon" && "Reducing tillage and planting more trees can lower carbon footprint."}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground mb-4">Earned Badges</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {["🌱 Eco Starter", "💧 Water Saver", "🌿 Organic Pioneer"].map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityTracker;
