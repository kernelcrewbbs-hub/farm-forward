import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Trash2, Sprout, Flower, Leaf, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  mode: "beginner" | "pro";
}

interface Plant {
  id: string;
  name: string;
  plantedDate: Date;
  harvestDays: number;
}

const plantOptions = [
  { name: "Tomato", harvestDays: 70, emoji: "🍅" },
  { name: "Chili", harvestDays: 75, emoji: "🌶️" },
  { name: "Spinach", harvestDays: 45, emoji: "🥬" },
  { name: "Mint", harvestDays: 60, emoji: "🌱" },
  { name: "Coriander", harvestDays: 35, emoji: "🌿" },
  { name: "Okra", harvestDays: 55, emoji: "🥒" },
  { name: "Brinjal", harvestDays: 65, emoji: "🍆" },
  { name: "Radish", harvestDays: 30, emoji: "🥕" },
];

const getGrowthStage = (daysPlanted: number, harvestDays: number) => {
  const progress = (daysPlanted / harvestDays) * 100;
  if (progress >= 100) return { stage: "Ready to Harvest! 🎉", icon: Leaf, color: "text-leaf" };
  if (progress >= 75) return { stage: "Flowering", icon: Flower, color: "text-primary" };
  if (progress >= 50) return { stage: "Growing", icon: Sprout, color: "text-water" };
  if (progress >= 25) return { stage: "Seedling", icon: Sprout, color: "text-secondary" };
  return { stage: "Germinating", icon: Sprout, color: "text-muted-foreground" };
};

const HarvestTracker = ({ mode }: Props) => {
  const [plants, setPlants] = useState<Plant[]>([
    { id: "1", name: "Tomato", plantedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), harvestDays: 70 },
    { id: "2", name: "Mint", plantedDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000), harvestDays: 60 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(plantOptions[0]);
  const [plantedDate, setPlantedDate] = useState(new Date().toISOString().split('T')[0]);

  const addPlant = () => {
    const newPlant: Plant = {
      id: Date.now().toString(),
      name: selectedPlant.name,
      plantedDate: new Date(plantedDate),
      harvestDays: selectedPlant.harvestDays,
    };
    setPlants([...plants, newPlant]);
    setShowAddModal(false);
  };

  const removePlant = (id: string) => {
    setPlants(plants.filter(p => p.id !== id));
  };

  const getDaysPlanted = (date: Date) => {
    const diff = Date.now() - date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getHarvestDate = (plantedDate: Date, harvestDays: number) => {
    const harvest = new Date(plantedDate);
    harvest.setDate(harvest.getDate() + harvestDays);
    return harvest.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Harvest Time Tracker
          </CardTitle>
          <Button onClick={() => setShowAddModal(true)} size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add Plant
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Track your plants' growth stages and harvest dates
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Plant Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card p-6 rounded-2xl shadow-xl max-w-md w-full mx-4 border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-foreground">Add New Plant</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Select Plant</label>
                    <div className="grid grid-cols-4 gap-2">
                      {plantOptions.map((plant) => (
                        <button
                          key={plant.name}
                          onClick={() => setSelectedPlant(plant)}
                          className={`p-2 rounded-lg border text-center transition-all ${
                            selectedPlant.name === plant.name
                              ? "border-primary bg-primary/10"
                              : "border-border/50 hover:border-primary/50"
                          }`}
                        >
                          <div className="text-xl">{plant.emoji}</div>
                          <div className="text-xs text-foreground">{plant.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Planting Date</label>
                    <Input
                      type="date"
                      value={plantedDate}
                      onChange={(e) => setPlantedDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="text-sm text-muted-foreground p-3 rounded-lg bg-muted/30">
                    Expected harvest in: <span className="font-medium text-foreground">{selectedPlant.harvestDays} days</span>
                  </div>

                  <Button onClick={addPlant} className="w-full">Add Plant</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plants List */}
        {plants.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Sprout className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No plants added yet. Start tracking your garden!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {plants.map((plant, index) => {
              const daysPlanted = getDaysPlanted(plant.plantedDate);
              const daysRemaining = Math.max(0, plant.harvestDays - daysPlanted);
              const progress = Math.min(100, (daysPlanted / plant.harvestDays) * 100);
              const { stage, icon: StageIcon, color } = getGrowthStage(daysPlanted, plant.harvestDays);
              const emoji = plantOptions.find(p => p.name === plant.name)?.emoji || "🌱";

              return (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{emoji}</div>
                      <div>
                        <h3 className="font-semibold text-foreground">{plant.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <StageIcon className={`w-4 h-4 ${color}`} />
                          <span className={color}>{stage}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removePlant(plant.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${progress >= 100 ? 'bg-leaf' : 'bg-primary'} rounded-full`}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Day {daysPlanted}</span>
                      <span>{daysRemaining > 0 ? `${daysRemaining} days left` : 'Ready!'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Planted:</span>
                      <span className="ml-2 text-foreground">
                        {plant.plantedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Harvest:</span>
                      <span className="ml-2 text-foreground">
                        {getHarvestDate(plant.plantedDate, plant.harvestDays)}
                      </span>
                    </div>
                  </div>

                  {progress >= 90 && progress < 100 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 p-2 rounded-lg bg-sun/10 text-sm text-center"
                    >
                      🍅 Your {plant.name.toLowerCase()} is almost ready!
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HarvestTracker;
