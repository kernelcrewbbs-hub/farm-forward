import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Globe, Search, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLocation } from "@/contexts/LocationContext";

const countries = [
  { code: "IN", name: "India", flag: "🇮🇳", regions: ["Madhya Pradesh", "Maharashtra", "Punjab", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Gujarat", "Rajasthan", "West Bengal", "Kerala"] },
  { code: "US", name: "United States", flag: "🇺🇸", regions: ["California", "Texas", "Florida", "Iowa", "Nebraska", "Kansas", "Illinois", "Wisconsin", "Minnesota", "Ohio"] },
  { code: "CN", name: "China", flag: "🇨🇳", regions: ["Heilongjiang", "Henan", "Shandong", "Jiangsu", "Sichuan", "Anhui", "Hubei", "Hunan", "Jiangxi", "Guangdong"] },
  { code: "BR", name: "Brazil", flag: "🇧🇷", regions: ["São Paulo", "Mato Grosso", "Paraná", "Goiás", "Rio Grande do Sul", "Minas Gerais", "Bahia", "Maranhão", "Piauí", "Tocantins"] },
  { code: "AU", name: "Australia", flag: "🇦🇺", regions: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Northern Territory", "ACT"] },
  { code: "RU", name: "Russia", flag: "🇷🇺", regions: ["Krasnodar", "Rostov", "Stavropol", "Volgograd", "Saratov", "Samara", "Orenburg", "Altai", "Novosibirsk", "Omsk"] },
  { code: "CA", name: "Canada", flag: "🇨🇦", regions: ["Saskatchewan", "Alberta", "Manitoba", "Ontario", "Quebec", "British Columbia", "Prince Edward Island", "New Brunswick", "Nova Scotia"] },
  { code: "FR", name: "France", flag: "🇫🇷", regions: ["Île-de-France", "Nouvelle-Aquitaine", "Occitanie", "Auvergne-Rhône-Alpes", "Grand Est", "Hauts-de-France", "Brittany", "Normandy"] },
  { code: "DE", name: "Germany", flag: "🇩🇪", regions: ["Bavaria", "Lower Saxony", "Baden-Württemberg", "North Rhine-Westphalia", "Saxony", "Schleswig-Holstein", "Brandenburg", "Mecklenburg"] },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", regions: ["England", "Scotland", "Wales", "Northern Ireland", "East Anglia", "Yorkshire", "Midlands", "Cornwall"] },
  { code: "JP", name: "Japan", flag: "🇯🇵", regions: ["Hokkaido", "Tohoku", "Kanto", "Chubu", "Kinki", "Chugoku", "Shikoku", "Kyushu", "Okinawa"] },
  { code: "KR", name: "South Korea", flag: "🇰🇷", regions: ["Gyeonggi", "North Chungcheong", "South Chungcheong", "North Jeolla", "South Jeolla", "North Gyeongsang", "South Gyeongsang", "Gangwon"] },
  { code: "MX", name: "Mexico", flag: "🇲🇽", regions: ["Jalisco", "Sinaloa", "Sonora", "Chihuahua", "Michoacán", "Veracruz", "Guanajuato", "Tamaulipas", "Nuevo León", "Durango"] },
  { code: "AR", name: "Argentina", flag: "🇦🇷", regions: ["Buenos Aires", "Córdoba", "Santa Fe", "Entre Ríos", "La Pampa", "Mendoza", "San Juan", "Tucumán", "Salta", "Chaco"] },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", regions: ["Free State", "Western Cape", "KwaZulu-Natal", "Mpumalanga", "Limpopo", "North West", "Eastern Cape", "Gauteng", "Northern Cape"] },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", regions: ["Kano", "Kaduna", "Niger", "Benue", "Plateau", "Taraba", "Adamawa", "Oyo", "Osun", "Ekiti"] },
  { code: "EG", name: "Egypt", flag: "🇪🇬", regions: ["Nile Delta", "Upper Egypt", "Sinai", "Western Desert", "Faiyum", "Aswan", "Luxor", "Alexandria"] },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", regions: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Gilgit-Baltistan", "Azad Kashmir"] },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", regions: ["Java", "Sumatra", "Kalimantan", "Sulawesi", "Papua", "Bali", "Nusa Tenggara", "Maluku"] },
  { code: "TH", name: "Thailand", flag: "🇹🇭", regions: ["Central Thailand", "Northern Thailand", "Northeastern Thailand", "Southern Thailand", "Eastern Thailand"] },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", regions: ["Mekong Delta", "Red River Delta", "Central Highlands", "Southeast", "North Central Coast", "South Central Coast"] },
  { code: "PH", name: "Philippines", flag: "🇵🇭", regions: ["Luzon", "Visayas", "Mindanao", "Metro Manila", "Central Luzon", "Calabarzon", "Ilocos Region"] },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", regions: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Rangpur", "Barisal", "Mymensingh"] },
  { code: "IT", name: "Italy", flag: "🇮🇹", regions: ["Emilia-Romagna", "Lombardy", "Veneto", "Piedmont", "Tuscany", "Puglia", "Sicily", "Sardinia", "Campania"] },
  { code: "ES", name: "Spain", flag: "🇪🇸", regions: ["Andalusia", "Castile and León", "Extremadura", "Aragon", "Catalonia", "Murcia", "Valencia", "La Rioja"] },
  { code: "UA", name: "Ukraine", flag: "🇺🇦", regions: ["Kyiv", "Kharkiv", "Odessa", "Dnipro", "Lviv", "Poltava", "Chernihiv", "Zaporizhzhia", "Vinnytsia"] },
  { code: "PL", name: "Poland", flag: "🇵🇱", regions: ["Greater Poland", "Masovia", "Lesser Poland", "Silesia", "Lublin", "Podlaskie", "Warmian-Masurian", "Pomerania"] },
  { code: "TR", name: "Turkey", flag: "🇹🇷", regions: ["Central Anatolia", "Southeastern Anatolia", "Mediterranean", "Aegean", "Marmara", "Black Sea", "Eastern Anatolia"] },
  { code: "IR", name: "Iran", flag: "🇮🇷", regions: ["Khuzestan", "Fars", "Kerman", "Khorasan", "Isfahan", "East Azerbaijan", "West Azerbaijan", "Gilan", "Mazandaran"] },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", regions: ["Riyadh", "Eastern Province", "Mecca", "Medina", "Asir", "Jizan", "Tabuk", "Ha'il"] },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹", regions: ["Oromia", "Amhara", "SNNPR", "Tigray", "Somali", "Afar", "Benishangul-Gumuz", "Gambela"] },
  { code: "KE", name: "Kenya", flag: "🇰🇪", regions: ["Rift Valley", "Central", "Eastern", "Western", "Nyanza", "Coast", "North Eastern", "Nairobi"] },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", regions: ["Dar es Salaam", "Arusha", "Mwanza", "Morogoro", "Dodoma", "Kilimanjaro", "Mbeya", "Tanga"] },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", regions: ["Johor", "Kedah", "Perak", "Pahang", "Sabah", "Sarawak", "Selangor", "Penang", "Kelantan"] },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", regions: ["Canterbury", "Waikato", "Otago", "Southland", "Manawatu-Wanganui", "Hawke's Bay", "Taranaki", "Bay of Plenty"] },
  { code: "CL", name: "Chile", flag: "🇨🇱", regions: ["O'Higgins", "Maule", "Biobío", "Araucanía", "Los Ríos", "Los Lagos", "Valparaíso", "Metropolitan"] },
  { code: "CO", name: "Colombia", flag: "🇨🇴", regions: ["Antioquia", "Valle del Cauca", "Cundinamarca", "Santander", "Boyacá", "Tolima", "Meta", "Huila"] },
  { code: "PE", name: "Peru", flag: "🇵🇪", regions: ["Lima", "Arequipa", "La Libertad", "Piura", "Lambayeque", "Junín", "Cusco", "Ica", "Ancash"] },
];

const regionCoordinates: Record<string, { lat: number; lon: number }> = {
  // India
  "Madhya Pradesh": { lat: 23.2599, lon: 77.4126 },
  "Maharashtra": { lat: 19.7515, lon: 75.7139 },
  "Punjab": { lat: 31.1471, lon: 75.3412 },
  "Karnataka": { lat: 15.3173, lon: 75.7139 },
  "Tamil Nadu": { lat: 11.1271, lon: 78.6569 },
  "Uttar Pradesh": { lat: 26.8467, lon: 80.9462 },
  "Gujarat": { lat: 22.2587, lon: 71.1924 },
  "Rajasthan": { lat: 27.0238, lon: 74.2179 },
  "West Bengal": { lat: 22.9868, lon: 87.855 },
  "Kerala": { lat: 10.8505, lon: 76.2711 },
  // USA
  "California": { lat: 36.7783, lon: -119.4179 },
  "Texas": { lat: 31.9686, lon: -99.9018 },
  "Florida": { lat: 27.6648, lon: -81.5158 },
  "Iowa": { lat: 41.878, lon: -93.0977 },
  "Nebraska": { lat: 41.4925, lon: -99.9018 },
  "Kansas": { lat: 39.0119, lon: -98.4842 },
  "Illinois": { lat: 40.6331, lon: -89.3985 },
  "Wisconsin": { lat: 43.7844, lon: -88.7879 },
  "Minnesota": { lat: 46.7296, lon: -94.6859 },
  "Ohio": { lat: 40.4173, lon: -82.9071 },
  // China
  "Heilongjiang": { lat: 47.862, lon: 127.7615 },
  "Henan": { lat: 34.7657, lon: 113.7536 },
  "Shandong": { lat: 36.3427, lon: 118.1498 },
  "Jiangsu": { lat: 32.9711, lon: 119.455 },
  "Sichuan": { lat: 30.6516, lon: 104.0759 },
  // Brazil
  "São Paulo": { lat: -23.5505, lon: -46.6333 },
  "Mato Grosso": { lat: -12.6819, lon: -56.9211 },
  "Paraná": { lat: -25.2521, lon: -52.0216 },
  "Goiás": { lat: -15.827, lon: -49.8362 },
  // Australia
  "New South Wales": { lat: -31.8406, lon: 145.6128 },
  "Victoria": { lat: -36.9848, lon: 143.3906 },
  "Queensland": { lat: -22.5752, lon: 144.085 },
  "Western Australia": { lat: -25.0423, lon: 117.7933 },
  // Default fallback
  "default": { lat: 23.2599, lon: 77.4126 },
};

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocationSelector = ({ isOpen, onClose }: LocationSelectorProps) => {
  const { location, setLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[0] | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setSelectedRegion("");
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    const coords = regionCoordinates[region] || regionCoordinates["default"];
    
    setLocation({
      lat: coords.lat,
      lon: coords.lon,
      city: region,
      state: region,
      country: selectedCountry?.name || "Unknown",
      countryCode: selectedCountry?.code || "XX",
      loading: false,
    });
    
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            const data = await response.json();
            const address = data.address || {};
            
            setLocation({
              lat: latitude,
              lon: longitude,
              city: address.city || address.town || address.village || "Unknown",
              state: address.state || address.region || "",
              country: address.country || "Unknown",
              countryCode: address.country_code?.toUpperCase() || "XX",
              loading: false,
            });
            onClose();
          } catch (error) {
            console.error("Error fetching location details:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-4 bg-card rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Select Location</h2>
                    <p className="text-sm text-muted-foreground">Choose your farming region</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Use Current Location Button */}
            <button
              onClick={handleUseCurrentLocation}
              className="mx-6 mt-4 p-3 bg-primary/10 hover:bg-primary/20 rounded-xl flex items-center gap-3 transition-colors"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Use My Current Location</span>
            </button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!selectedCountry ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredCountries.map((country) => (
                    <motion.button
                      key={country.code}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCountrySelect(country)}
                      className="p-4 bg-muted hover:bg-muted/80 rounded-xl text-left transition-colors border border-transparent hover:border-primary/30"
                    >
                      <div className="text-2xl mb-2">{country.flag}</div>
                      <div className="font-medium text-foreground">{country.name}</div>
                      <div className="text-xs text-muted-foreground">{country.regions.length} regions</div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="flex items-center gap-2 text-primary mb-4 hover:underline"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                    Back to countries
                  </button>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{selectedCountry.flag}</span>
                    <h3 className="text-lg font-semibold">{selectedCountry.name}</h3>
                  </div>

                  <div className="space-y-2">
                    {selectedCountry.regions.map((region) => (
                      <motion.button
                        key={region}
                        whileHover={{ x: 4 }}
                        onClick={() => handleRegionSelect(region)}
                        className="w-full p-4 bg-muted hover:bg-primary/10 rounded-xl text-left transition-colors flex items-center justify-between"
                      >
                        <span className="text-foreground">{region}</span>
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LocationSelector;
