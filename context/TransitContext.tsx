'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Real-world Addis Ababa routes
export interface Route {
  id: string;
  name: string; // e.g. "Bole ⇄ Piazza"
  via: string; // e.g. "Kazanchis, Urael"
  color: 'green' | 'yellow' | 'red'; // Color-coded system
  hex: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string; // e.g. "AA 3-10452"
  driverName: string;
  routeId: string;
  seatCount: number; // Max seats (typically 12 or 15)
  availableSeats: number; // Current free seats
  trustScore: number; // Community trust rating percentage (e.g. 98)
  isVerified: boolean;
  headingYourWay: boolean;
  latitude: number; // For map visualization
  longitude: number;
  speed: number;
  lastUpdated: string;
  passengersShared: number;
}

export interface CommunityReport {
  id: string;
  vehicleId: string;
  issue: string;
  timestamp: string;
  description: string;
}

interface TransitContextType {
  routes: Route[];
  vehicles: Vehicle[];
  activeRouteFilter: string; // 'all' or specific routeId
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveRouteFilter: (filter: string) => void;
  lowDataMode: boolean;
  toggleLowDataMode: () => void;
  driverOnline: boolean;
  toggleDriverOnline: () => void;
  driverAvailableSeats: number;
  incrementDriverSeats: () => void;
  decrementDriverSeats: () => void;
  driverActiveRoute: string;
  setDriverActiveRoute: (routeId: string) => void;
  communityReports: CommunityReport[];
  addReport: (vehicleId: string, issue: string, desc: string) => void;
  shareTripDetails: (vehicleId: string, phone: string) => void;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  scannedVehicle: Vehicle | null;
  setScannedVehicle: (vehicle: Vehicle | null) => void;
  isCustomAlertOpen: boolean;
  alertConfig: { title: string; desc: string; type: 'success' | 'warning' | 'error' | 'info' };
  triggerAlert: (title: string, desc: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  closeAlert: () => void;
}

const ROUTES_DATA: Route[] = [
  { id: 'r1', name: 'Bole ⇄ Piazza', via: 'Kazanchis, Urael', color: 'green', hex: '#10B981' }, // Neon Green
  { id: 'r2', name: 'Megenagna ⇄ Gerji', via: 'Imperial, Bole Homes', color: 'yellow', hex: '#FBBF24' }, // Neon Yellow
  { id: 'r3', name: 'Tor Hailoch ⇄ Mexico', via: 'Lideta, Geja Sefer', color: 'red', hex: '#EF4444' }, // Neon Red
  { id: 'r4', name: 'Saris ⇄ Stadium', via: 'Gotera, Lancia', color: 'green', hex: '#10B981' },
  { id: 'r5', name: 'Shiro Meda ⇄ Piazza', via: 'Arat Kilo, Amist Kilo', color: 'yellow', hex: '#FBBF24' },
];

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    plateNumber: 'AA 3-A2345',
    driverName: 'Abdi Kebede',
    routeId: 'r1',
    seatCount: 15,
    availableSeats: 3,
    trustScore: 97,
    isVerified: true,
    headingYourWay: true,
    latitude: 120,
    longitude: 180,
    speed: 35,
    lastUpdated: 'Just now',
    passengersShared: 24,
  },
  {
    id: 'v2',
    plateNumber: 'AA 3-B9812',
    driverName: 'Yonas Tesfaye',
    routeId: 'r1',
    seatCount: 12,
    availableSeats: 0, // FULL
    trustScore: 94,
    isVerified: true,
    headingYourWay: true,
    latitude: 190,
    longitude: 250,
    speed: 40,
    lastUpdated: '1m ago',
    passengersShared: 14,
  },
  {
    id: 'v3',
    plateNumber: 'AA 3-A0976',
    driverName: 'Tariku Alamu',
    routeId: 'r2',
    seatCount: 15,
    availableSeats: 8,
    trustScore: 89,
    isVerified: false,
    headingYourWay: false,
    latitude: 280,
    longitude: 140,
    speed: 15,
    lastUpdated: '2m ago',
    passengersShared: 5,
  },
  {
    id: 'v4',
    plateNumber: 'AA 3-F4451',
    driverName: 'Mulugeta Haile',
    routeId: 'r3',
    seatCount: 15,
    availableSeats: 12, // Empty
    trustScore: 99,
    isVerified: true,
    headingYourWay: true,
    latitude: 70,
    longitude: 90,
    speed: 48,
    lastUpdated: 'Just now',
    passengersShared: 42,
  },
  {
    id: 'v5',
    plateNumber: 'AA 3-C5521',
    driverName: 'Selamawit Dagne',
    routeId: 'r4',
    seatCount: 12,
    availableSeats: 2,
    trustScore: 96,
    isVerified: true,
    headingYourWay: false,
    latitude: 45,
    longitude: 310,
    speed: 12,
    lastUpdated: '3m ago',
    passengersShared: 19,
  },
];

const TransitContext = createContext<TransitContextType | undefined>(undefined);

export function TransitProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [activeRouteFilter, setActiveRouteFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lowDataMode, setLowDataMode] = useState<boolean>(false);
  
  // Driver UI state
  const [driverOnline, setDriverOnline] = useState<boolean>(false);
  const [driverAvailableSeats, setDriverAvailableSeats] = useState<number>(4);
  const [driverActiveRoute, setDriverActiveRoute] = useState<string>('r1');
  
  // Security reports & navigation
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>([
    { id: 'rep1', vehicleId: 'v3', issue: 'Overcharging', timestamp: '10m ago', description: 'Charged 15 Birr instead of the regulated 10 Birr.' },
  ]);
  const [activeScreen, setActiveScreen] = useState<string>('splash');
  const [scannedVehicle, setScannedVehicle] = useState<Vehicle | null>(null);

  // Custom alert state
  const [isCustomAlertOpen, setIsCustomAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{ title: string; desc: string; type: 'success' | 'warning' | 'error' | 'info' }>({
    title: '',
    desc: '',
    type: 'success'
  });

  const triggerAlert = (title: string, desc: string, type: 'success' | 'warning' | 'error' | 'info') => {
    setAlertConfig({ title, desc, type });
    setIsCustomAlertOpen(true);
  };

  const closeAlert = () => setIsCustomAlertOpen(false);

  // Simulate vehicle movements & seat vacancy fluctuations
  useEffect(() => {
    if (lowDataMode) return; // Freeze simulation in low-data mode

    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          // Wander slightly on the coordinate grid
          let deltaX = (Math.random() - 0.5) * 8;
          let deltaY = (Math.random() - 0.5) * 8;
          
          let newLat = v.latitude + deltaX;
          let newLng = v.longitude + deltaY;

          // Stay within constraints
          if (newLat < 30 || newLat > 351) newLat = 150;
          if (newLng < 30 || newLng > 352) newLng = 150;

          // Occasionally change seats available
          let finalSeats = v.availableSeats;
          if (Math.random() > 0.8) {
            const seatsChange = Math.random() > 0.5 ? 1 : -1;
            finalSeats = Math.max(0, Math.min(v.seatCount, v.availableSeats + seatsChange));
          }

          return {
            ...v,
            latitude: Number(newLat.toFixed(1)),
            longitude: Number(newLng.toFixed(1)),
            availableSeats: finalSeats,
            lastUpdated: 'Just now',
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [lowDataMode]);

  // Handle Low Data Mode
  const toggleLowDataMode = () => {
    setLowDataMode((prev) => {
      const state = !prev;
      triggerAlert(
        state ? 'Low-Data Mode Enabled ⚡' : 'High-Fidelity Tracking Active 📡',
        state 
          ? 'Map tracking visual updates frequency reduced to save internet package costs (birr).'
          : 'Interactive real-time map active.',
        'info'
      );
      return state;
    });
  };

  // Driver Mode logic
  const toggleDriverOnline = () => {
    setDriverOnline((prev) => {
      const state = !prev;
      triggerAlert(
        state ? 'You are ONLINE 🟢' : 'You are OFFLINE 🔴',
        state 
          ? 'Commuters on Bole ⇄ Piazza route can now see your location and real-time open seats!'
          : 'Location broadcasting paused.',
        'success'
      );
      return state;
    });
  };

  const incrementDriverSeats = () => {
    setDriverAvailableSeats((prev) => {
      const nextVal = Math.min(15, prev + 1);
      if (driverOnline) {
        // Broadcast change
        triggerAlert('Seat Count Updated', `commuters informed that you now have ${nextVal} seats available.`, 'info');
      }
      return nextVal;
    });
  };

  const decrementDriverSeats = () => {
    setDriverAvailableSeats((prev) => {
      const nextVal = Math.max(0, prev - 1);
      if (driverOnline) {
        triggerAlert('Seat Taken 👥', `Seat marked occupied. ${nextVal} remaining.`, 'info');
      }
      return nextVal;
    });
  };

  // Add a safety security report
  const addReport = (vehicleId: string, issue: string, desc: string) => {
    const newReport: CommunityReport = {
      id: `rep_${Date.now()}`,
      vehicleId,
      issue,
      timestamp: 'Just now',
      description: desc,
    };
    setCommunityReports((prev) => [newReport, ...prev]);
    
    // Increase vehicle's reports / penalize trust score slightly for the mock session
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId) {
          return {
            ...v,
            trustScore: Math.max(40, v.trustScore - 12),
          };
        }
        return v;
      })
    );
    triggerAlert('Submitting Safety Flags ⚠️', 'Thank you. Report filed anonymously on the TransitLink community trust registry.', 'warning');
  };

  // Shared trip trigger
  const shareTripDetails = (vehicleId: string, phone: string) => {
    const target = vehicles.find((v) => v.id === vehicleId);
    if (!target) return;
    triggerAlert(
      'SMS Coordinates Sent 🌐',
      `Live encrypted tracking SMS dispatched to ${phone}. Decodes offline on simple mobile phones.`,
      'success'
    );
  };

  return (
    <TransitContext.Provider
      value={{
        routes: ROUTES_DATA,
        vehicles,
        activeRouteFilter,
        searchQuery,
        setSearchQuery,
        setActiveRouteFilter,
        lowDataMode,
        toggleLowDataMode,
        driverOnline,
        toggleDriverOnline,
        driverAvailableSeats,
        incrementDriverSeats,
        decrementDriverSeats,
        driverActiveRoute,
        setDriverActiveRoute,
        communityReports,
        addReport,
        shareTripDetails,
        activeScreen,
        setActiveScreen,
        scannedVehicle,
        setScannedVehicle,
        isCustomAlertOpen,
        alertConfig,
        triggerAlert,
        closeAlert,
      }}
    >
      {children}
    </TransitContext.Provider>
  );
}

export function useTransit() {
  const context = useContext(TransitContext);
  if (context === undefined) {
    throw new Error('useTransit must be used within a TransitProvider');
  }
  return context;
}
