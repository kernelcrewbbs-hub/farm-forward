import { motion } from "framer-motion";
import { CheckCircle2, Target, Wheat, Droplets, Sprout, TrendingUp, Award } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

const countryCropMap: Record<string, { name: string; icon: string; varieties?: string[] }[]> = {
  IN: [
    { name: "Chickpea", icon: "🌱", varieties: ["JG 11", "Pusa 256"] },
    { name: "Lentil", icon: "🫘", varieties: ["Lira", "Eston"] },
    { name: "Short-duration Wheat", icon: "🌾", varieties: ["HD 2967", "PBW 343"] },
    { name: "Mustard", icon: "🌻", varieties: ["Pusa Bold", "Varuna"] },
  ],
  AR: [
    { name: "Soybean", icon: "🌱", varieties: ["RA 847", "PB 282"] },
    { name: "Corn", icon: "🌽", varieties: ["DK 691", "Pioneer P30"] },
    { name: "Sunflower", icon: "🌻", varieties: ["HA 89", "Helio"] },
  ],
  SA: [
    { name: "Dates", icon: "🌴", varieties: ["Medjool", "Deglet Noor"] },
    { name: "Alfalfa", icon: "🍀", varieties: ["Coastal", "Common"] },
    { name: "Fodder Sorghum", icon: "🌾", varieties: ["Sorghum BMR"] },
  ],
  US: [
    { name: "Corn", icon: "🌽" },
    { name: "Soybean", icon: "🌱" },
    { name: "Wheat", icon: "🌾" },
  ],
  ARB: [
    { name: "Dates", icon: "🌴", varieties: ["Medjool", "Deglet Noor"] },
  ],
  DEFAULT: [
    { name: "Mixed Grains", icon: "🌾" },
    { name: "Legumes", icon: "🫘" },
    { name: "Oilseeds", icon: "🌻" },
  ],
};

const keyPriorities = [
  {
    icon: Sprout,
    title: "Improve Soil Fertility",
    description: "Add organic matter and practice crop rotation",
    color: "bg-leaf",
  },
  {
    icon: Droplets,
    title: "Efficient Irrigation",
    description: "Implement drip/sprinkler systems",
    color: "bg-water",
  },
  {
    icon: Target,
    title: "Region-Specific Practices",
    description: "Adapt techniques to local climate",
    color: "bg-accent",
  },
  {
    icon: TrendingUp,
    title: "Market-Oriented Farming",
    description: "Grow crops with high demand",
    color: "bg-secondary",
  },
];

const SummarySection = () => {
  const { location } = useLocation();
  const countryCode = (location.countryCode || "").toUpperCase();
  const recommendedCrops =
    countryCropMap[countryCode] || countryCropMap[location.country as string] || countryCropMap["DEFAULT"];

  return (
    <section className="section-padding bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Action Plan
            </span>
          </div>
          <h2 className="section-title mb-4">Summary & Recommendations</h2>
          <p className="section-subtitle mx-auto">
            Your personalized farming roadmap for the Rabi season
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-leaf p-8 md:p-12 text-primary-foreground mb-8"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Wheat className="w-8 h-8" />
                <h3 className="text-2xl md:text-3xl font-bold font-playfair">
                  Recommended Focus Crops (Rabi Season)
                </h3>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-wrap gap-3">
                  {recommendedCrops.map((crop, index) => (
                    <motion.div
                      key={crop.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * index }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full"
                    >
                      <span className="text-xl">{crop.icon}</span>
                      <span className="font-medium">{crop.name}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {recommendedCrops.map((crop) => (
                    <div key={crop.name} className="p-3 bg-white/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{crop.name}</div>
                        <div className="text-sm text-muted-foreground">{crop.icon}</div>
                      </div>
                      {crop.varieties && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Varieties: {crop.varieties.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5" />
                <span>Based on your location, climate data, and market trends</span>
              </div>
            </div>
          </motion.div>

          {/* Key Priorities Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {keyPriorities.map((priority, index) => (
              <motion.div
                key={priority.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-glass p-6 flex items-start gap-4"
              >
                <div className={`w-14 h-14 rounded-2xl ${priority.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <priority.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-foreground mb-1">
                    {priority.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {priority.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Potential Yield Increase", value: "25-40%", icon: "📈" },
              { label: "Water Savings", value: "30%", icon: "💧" },
              { label: "Cost Reduction", value: "15-20%", icon: "💰" },
              { label: "Risk Mitigation", value: "High", icon: "🛡️" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-card border border-border/50"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
