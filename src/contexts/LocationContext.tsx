import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LocationData {
  lat: number;
  lon: number;
  city: string;
  state: string;
  country: string;
  countryCode: string;
  loading: boolean;
}

interface LocationContextType {
  location: LocationData;
  setLocation: (location: LocationData) => void;
}

const defaultLocation: LocationData = {
  lat: 23.2599,
  lon: 77.4126,
  city: "Bhopal",
  state: "Madhya Pradesh",
  country: "India",
  countryCode: "IN",
  loading: true,
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationData>(defaultLocation);

  useEffect(() => {
    const fetchLocationDetails = async (lat: number, lon: number) => {
      try {
        // Use Open-Meteo's geocoding reverse API (free, no key needed)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
        );
        const data = await response.json();
        
        const address = data.address || {};
        setLocation({
          lat,
          lon,
          city: address.city || address.town || address.village || address.county || "Unknown",
          state: address.state || address.region || "",
          country: address.country || "Unknown",
          countryCode: address.country_code?.toUpperCase() || "XX",
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching location details:", error);
        setLocation(prev => ({ ...prev, loading: false }));
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchLocationDetails(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log("Geolocation error:", error.message);
          setLocation(prev => ({ ...prev, loading: false }));
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setLocation(prev => ({ ...prev, loading: false }));
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
