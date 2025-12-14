import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Wheat, Droplets, ThermometerSun, Timer, Star } from "lucide-react";
import { useState } from "react";

interface CropRecommendation {
  name: string;
  season: string;
  waterNeeds: string;
  temperature: string;
  duration: string;
  rating: number;
  tips: string[];
  color: string;
}

const cropRecommendations: CropRecommendation[] = [
  {
    name: "Chickpea",
    season: "Rabi (Winter)",
    waterNeeds: "Low - Moderate",
    temperature: "15-25°C",
    duration: "90-120 days",
    rating: 4.8,
    tips: ["Drought tolerant", "Fixes nitrogen in soil", "Best for red soils"],
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Lentil",
    season: "Rabi (Winter)",
    waterNeeds: "Low",
    temperature: "10-20°C",
    duration: "100-130 days",
    rating: 4.6,
    tips: ["Minimal water requirements", "High protein content", "Good rotation crop"],
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Mustard",
    season: "Rabi (Winter)",
    waterNeeds: "Moderate",
    temperature: "12-25°C",
    duration: "110-140 days",
    rating: 4.5,
    tips: ["Oil seed crop", "Cold tolerant", "Pest resistant varieties available"],
    color: "from-yellow-400 to-amber-500",
  },
  {
    name: "Wheat",
    season: "Rabi (Winter)",
    waterNeeds: "Moderate",
    temperature: "15-25°C",
    duration: "120-150 days",
    rating: 4.7,
    tips: ["Short-duration varieties recommended", "Requires timely irrigation", "High yield potential"],
    color: "from-amber-400 to-yellow-500",
  },
  {
    name: "Fenugreek",
    season: "Rabi (Winter)",
    waterNeeds: "Low",
    temperature: "10-25°C",
    duration: "90-120 days",
    rating: 4.3,
    tips: ["Dual purpose crop", "Improves soil health", "Used in spices & medicine"],
    color: "from-lime-500 to-green-600",
  },
];

const SeasonalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % cropRecommendations.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + cropRecommendations.length) % cropRecommendations.length);
  };

  const currentCrop = cropRecommendations[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wheat className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Seasonal Guide
            </span>
          </div>
          <h2 className="section-title mb-4">Recommended Crops</h2>
          <p className="section-subtitle mx-auto">
            Top crops for the current season based on your region's climate
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10
                         w-12 h-12 rounded-full bg-card shadow-lg border border-border
                         flex items-center justify-center text-foreground
                         hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10
                         w-12 h-12 rounded-full bg-card shadow-lg border border-border
                         flex items-center justify-center text-foreground
                         hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: 10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden rounded-3xl shadow-elevated"
              >
                <div className={`bg-gradient-to-r ${currentCrop.color} p-8 md:p-12`}>
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left - Crop Info */}
                    <div className="flex-1 text-white">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm mb-4">
                        <Wheat className="w-4 h-4" />
                        {currentCrop.season}
                      </div>
                      
                      <h3 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
                        {currentCrop.name}
                      </h3>
                      
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(currentCrop.rating)
                                ? "fill-white text-white"
                                : "text-white/40"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-white/90">{currentCrop.rating}/5</span>
                      </div>

                      <ul className="space-y-2">
                        {currentCrop.tips.map((tip, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="flex items-center gap-2 text-white/90"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                            {tip}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Right - Stats */}
                    <div className="flex-1">
                      <div className="grid gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <Droplets className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-white/70 text-sm">Water Needs</div>
                            <div className="text-white font-semibold">{currentCrop.waterNeeds}</div>
                          </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <ThermometerSun className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-white/70 text-sm">Temperature Range</div>
                            <div className="text-white font-semibold">{currentCrop.temperature}</div>
                          </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <Timer className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-white/70 text-sm">Growth Duration</div>
                            <div className="text-white font-semibold">{currentCrop.duration}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {cropRecommendations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalCarousel;
