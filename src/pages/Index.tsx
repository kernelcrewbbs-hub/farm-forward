import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeatherSection from "@/components/WeatherSection";
import SoilCropManagement from "@/components/SoilCropManagement";
import SeasonalCarousel from "@/components/SeasonalCarousel";
import ClimateCharts from "@/components/ClimateCharts";
import FarmingTips from "@/components/FarmingTips";
import MarketPrices from "@/components/MarketPrices";
import ColdStorageMap from "@/components/ColdStorageMap";
import ProfitCalculator from "@/components/ProfitCalculator";
import SustainabilityTracker from "@/components/SustainabilityTracker";
import CommunityForum from "@/components/CommunityForum";
import SummarySection from "@/components/SummarySection";
import PestForecast from "@/components/PestForecast";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="weather">
          <WeatherSection />
        </section>
        <ClimateCharts />
        <PestForecast />
        <section id="crops">
          <SoilCropManagement />
        </section>
        <SeasonalCarousel />
        <FarmingTips />
        <section id="market">
          <MarketPrices />
        </section>
        <ProfitCalculator />
        <section id="storage">
          <ColdStorageMap />
        </section>
        <SustainabilityTracker />
        <CommunityForum />
        <SummarySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
