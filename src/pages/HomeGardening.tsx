import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, Droplets, Sun, Bug, Calendar, Lightbulb, Flower2, Thermometer, Sprout, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartPlantRecommendation from "@/components/gardening/SmartPlantRecommendation";
import WateringSchedule from "@/components/gardening/WateringSchedule";
import PotSoilCalculator from "@/components/gardening/PotSoilCalculator";
import SunlightAnalyzer from "@/components/gardening/SunlightAnalyzer";
import PestDiseaseHelper from "@/components/gardening/PestDiseaseHelper";
import HarvestTracker from "@/components/gardening/HarvestTracker";
import SeasonalCalendar from "@/components/gardening/SeasonalCalendar";
import OrganicTips from "@/components/gardening/OrganicTips";
import WaterSavingMode from "@/components/gardening/WaterSavingMode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  { id: "plants", icon: Sprout, label: "Smart Plants", component: SmartPlantRecommendation },
  { id: "watering", icon: Droplets, label: "Watering", component: WateringSchedule },
  { id: "pot-soil", icon: Flower2, label: "Pot & Soil", component: PotSoilCalculator },
  { id: "sunlight", icon: Sun, label: "Sunlight", component: SunlightAnalyzer },
  { id: "pest", icon: Bug, label: "Pest Help", component: PestDiseaseHelper },
  { id: "harvest", icon: Calendar, label: "Harvest", component: HarvestTracker },
  { id: "seasonal", icon: Thermometer, label: "Seasonal", component: SeasonalCalendar },
  { id: "tips", icon: Lightbulb, label: "Organic Tips", component: OrganicTips },
  { id: "water-save", icon: Droplets, label: "Water Save", component: WaterSavingMode },
];

const HomeGardening = () => {
  const [mode, setMode] = useState<"beginner" | "pro">("beginner");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Home className="w-6 h-6 text-primary" />
              <span className="text-primary font-medium uppercase tracking-wide text-sm">
                Personal Farming Assistant
              </span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Home Gardening Guide
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your complete guide to growing plants at home - from balcony gardens to backyard farms
            </p>
          </motion.div>

          {/* Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-full">
              <button
                onClick={() => setMode("beginner")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  mode === "beginner"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🌱 Beginner
              </button>
              <button
                onClick={() => setMode("pro")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  mode === "pro"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🧑‍🌾 Pro Mode
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="plants" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent h-auto">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border border-border/50 shadow-sm hover:shadow-md transition-all"
                >
                  <feature.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{feature.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {features.map((feature) => (
                <TabsContent key={feature.id} value={feature.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.component mode={mode} />
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeGardening;
