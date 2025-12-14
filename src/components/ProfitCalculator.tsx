import { motion } from "framer-motion";
import { Calculator, DollarSign, Wheat, Droplets, TrendingUp, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";

const ProfitCalculator = () => {
  const [seedCost, setSeedCost] = useState(2000);
  const [fertilizerCost, setFertilizerCost] = useState(3000);
  const [laborCost, setLaborCost] = useState(5000);
  const [irrigationCost, setIrrigationCost] = useState(2500);
  const [expectedYield, setExpectedYield] = useState(20);
  const [marketPrice, setMarketPrice] = useState(2500);

  const calculations = useMemo(() => {
    const totalCost = seedCost + fertilizerCost + laborCost + irrigationCost;
    const grossRevenue = expectedYield * marketPrice;
    const netProfit = grossRevenue - totalCost;
    const roi = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(1) : 0;
    const costPerQuintal = expectedYield > 0 ? (totalCost / expectedYield).toFixed(0) : 0;

    return { totalCost, grossRevenue, netProfit, roi, costPerQuintal };
  }, [seedCost, fertilizerCost, laborCost, irrigationCost, expectedYield, marketPrice]);

  const inputFields = [
    { label: "Seed Cost (₹)", value: seedCost, setter: setSeedCost, icon: Wheat, color: "text-wheat" },
    { label: "Fertilizer Cost (₹)", value: fertilizerCost, setter: setFertilizerCost, icon: Sparkles, color: "text-leaf" },
    { label: "Labor Cost (₹)", value: laborCost, setter: setLaborCost, icon: DollarSign, color: "text-secondary" },
    { label: "Irrigation Cost (₹)", value: irrigationCost, setter: setIrrigationCost, icon: Droplets, color: "text-water" },
    { label: "Expected Yield (quintals)", value: expectedYield, setter: setExpectedYield, icon: TrendingUp, color: "text-accent" },
    { label: "Market Price (₹/quintal)", value: marketPrice, setter: setMarketPrice, icon: DollarSign, color: "text-primary" },
  ];

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
            <Calculator className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Financial Planning
            </span>
          </div>
          <h2 className="section-title mb-4">Profit & Cost Calculator</h2>
          <p className="section-subtitle mx-auto">
            Estimate your expected returns and make informed farming decisions
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="card-glass p-6">
                <h3 className="font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Enter Your Costs
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {inputFields.map((field, index) => (
                    <motion.div
                      key={field.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <field.icon className={`w-4 h-4 ${field.color}`} />
                        {field.label}
                      </label>
                      <input
                        type="range"
                        min={field.label.includes("Yield") ? 1 : field.label.includes("Market") ? 500 : 0}
                        max={field.label.includes("Yield") ? 100 : field.label.includes("Market") ? 10000 : 20000}
                        step={field.label.includes("Yield") ? 1 : 100}
                        value={field.value}
                        onChange={(e) => field.setter(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">₹0</span>
                        <span className="font-semibold text-foreground">
                          {field.label.includes("Yield") ? `${field.value} q` : `₹${field.value.toLocaleString()}`}
                        </span>
                        <span className="text-muted-foreground">
                          {field.label.includes("Yield") ? "100q" : field.label.includes("Market") ? "₹10k" : "₹20k"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Total Cost */}
              <div className="card-glass p-5">
                <div className="text-sm text-muted-foreground mb-1">Total Investment</div>
                <div className="text-2xl font-bold text-foreground">
                  ₹{calculations.totalCost.toLocaleString()}
                </div>
              </div>

              {/* Gross Revenue */}
              <div className="card-glass p-5">
                <div className="text-sm text-muted-foreground mb-1">Gross Revenue</div>
                <div className="text-2xl font-bold text-foreground">
                  ₹{calculations.grossRevenue.toLocaleString()}
                </div>
              </div>

              {/* Net Profit */}
              <div className={`rounded-2xl p-5 ${
                calculations.netProfit >= 0 
                  ? "bg-gradient-to-r from-leaf to-primary text-primary-foreground" 
                  : "bg-gradient-to-r from-destructive to-accent text-primary-foreground"
              }`}>
                <div className="text-sm opacity-90 mb-1">Net Profit</div>
                <div className="text-3xl font-bold">
                  {calculations.netProfit >= 0 ? "+" : ""}₹{calculations.netProfit.toLocaleString()}
                </div>
              </div>

              {/* ROI */}
              <div className="card-glass p-5">
                <div className="text-sm text-muted-foreground mb-1">Return on Investment</div>
                <div className={`text-2xl font-bold ${
                  Number(calculations.roi) >= 0 ? "text-leaf" : "text-destructive"
                }`}>
                  {calculations.roi}%
                </div>
                <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.max(Number(calculations.roi), 0), 100)}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${
                      Number(calculations.roi) >= 50 ? "bg-leaf" : 
                      Number(calculations.roi) >= 20 ? "bg-secondary" : "bg-accent"
                    }`}
                  />
                </div>
              </div>

              {/* Cost per Quintal */}
              <div className="card-glass p-5">
                <div className="text-sm text-muted-foreground mb-1">Cost per Quintal</div>
                <div className="text-xl font-bold text-foreground">
                  ₹{calculations.costPerQuintal}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfitCalculator;
