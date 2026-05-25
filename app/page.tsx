'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransitProvider, useTransit } from '../context/TransitContext';
import { SplashScreen } from '../components/SplashScreen';
import { PassengerHomeScreen } from '../components/PassengerHomeScreen';
import { VehicleDiscoveryScreen } from '../components/VehicleDiscoveryScreen';
import { DriverModeScreen } from '../components/DriverModeScreen';
import { SmartVehicleIdScreen } from '../components/SmartVehicleIdScreen';
import { SafetyScreen } from '../components/SafetyScreen';
import { AnalyticsScreen } from '../components/AnalyticsScreen';
import {
  Smartphone,
  MapPin,
  ShieldCheck,
  Compass,
  LayoutGrid,
  HeartPulse,
  LineChart,
  ChevronRight,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  BatteryCharging,
  Wifi,
  Signal,
  Info
} from 'lucide-react';

function AppContent() {
  const {
    activeScreen,
    setActiveScreen,
    isCustomAlertOpen,
    alertConfig,
    closeAlert,
    lowDataMode,
  } = useTransit();

  const [localTime, setLocalTime] = useState('09:30');
  const [showSplash, setShowSplash] = useState(true);

  // Sync simulated cell phone clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setLocalTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Dismiss splash automatically or via manual skip link
  const handleSplashDismiss = () => {
    setShowSplash(false);
    setActiveScreen('passenger-home');
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col md:flex-row items-stretch overflow-x-hidden relative">
      {/* Dynamic Background lights */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[50%] bg-emerald-500/5 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full filter blur-[120px]" />
      </div>

      {/* LEFT PANEL: STARTUP INCUBATOR PROFILE & DEMO GUIDE */}
      <div className="w-full md:w-5/12 lg:w-4/12 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative z-10 bg-slate-950/40 backdrop-blur-3xl shrink-0">
        <div className="space-y-6">
          {/* Main Brand with local flags branding */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="h-1 w-8 bg-emerald-500 rounded" />
              <span className="h-1 w-8 bg-amber-400 rounded" />
              <span className="h-1.5 w-8 bg-red-600 rounded" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter text-white uppercase flex items-center gap-1">
                <span>TransitLink</span>
                <span className="text-amber-400 font-extrabold">.et</span>
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-[#B4E5AF] uppercase">Addis Mobility Initiative</p>
            </div>
          </div>

          {/* Value Pitch & Pitching Concept */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                <Sparkles className="w-4 h-4" />
                <span>Incubator Pitch Deck</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                In sub-Saharan African cities like <strong>Addis Ababa</strong>, over 80% of urban commuters rely on informal blue-and-white minibuses (<em>&quot;Siniyas&quot;</em>).
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Commuters waste hours at crowded junctions (Kazanchis, Megenagna, Stadium) struggling to identify which vehicle is going their direction, has open seats, or is safe.
              </p>
              <div className="text-xs text-amber-400/90 font-mono italic">
                &ldquo;TransitLink makes informal public transport discoverable without expensive government infrastructure.&rdquo;
              </div>
            </div>

            {/* Core Features Overview Guide */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider">Demo Navigation Checklist</h3>
              
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setActiveScreen('passenger-home')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    activeScreen === 'passenger-home'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-white/[0.01] border-white/5 text-slate-300 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5" />
                    <span className="font-bold">1. Passenger Home Grid</span>
                  </div>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => setActiveScreen('discovery')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    activeScreen === 'discovery'
                      ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                      : 'bg-white/[0.01] border-white/5 text-slate-300 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="font-bold">2. Corridor Discovery Feed</span>
                  </div>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => setActiveScreen('driver')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    activeScreen === 'driver'
                      ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                      : 'bg-white/[0.01] border-white/5 text-slate-300 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="font-bold">3. Driver Co-Pilot Interface</span>
                  </div>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => setActiveScreen('vehicle-id')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    activeScreen === 'vehicle-id'
                      ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                      : 'bg-white/[0.01] border-white/5 text-slate-300 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5" />
                    <span className="font-bold">4. Smart Vehicle Tag QR Reader</span>
                  </div>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => setActiveScreen('safety')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    activeScreen === 'safety'
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-white/[0.01] border-white/5 text-slate-300 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="font-bold">5. Incident Trust safeguards</span>
                  </div>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => setActiveScreen('analytics')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                    activeScreen === 'analytics'
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'bg-white/[0.01] border-white/5 text-slate-300 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LineChart className="w-3.5 h-3.5" />
                    <span className="font-bold">6. Smart City Admin Dashboard</span>
                  </div>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Presentation Metadata */}
        <div className="mt-8 pt-4 border-t border-white/5 space-y-2 text-slate-500 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Simulated Real-time WebSocket Stream Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-amber-500" />
            <span>Low-Data compressed protocol implemented</span>
          </div>
          <p className="text-[10px] font-mono leading-relaxed mt-2 text-slate-600">
            For ideal mobile demo presentation on pitch monitors, resize browser to test responsiveness.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: CORRESPONDING SMARTPHONE DEVICE CHASSIS EMULATION */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8 relative z-10 overflow-hidden">
        <div className="relative w-full max-w-[400px] h-[780px] bg-slate-950 rounded-[44px] border-[10px] border-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between shrink-0">
          
          {/* PHONE CHASSIS STATIC DECORATION (Notch & Status bar) */}
          <div className="absolute top-0 inset-x-0 h-10 bg-slate-950 z-40 flex items-center justify-between px-6 pointer-events-none">
            {/* Clock Dynamic Indicator */}
            <span className="text-xs font-bold text-slate-200 font-mono">{localTime}</span>
            
            {/* Camera/Sensor Dynamic Notch bar */}
            <div className="w-24 h-4 bg-slate-900 rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0" />
            
            {/* Dynamic Signal/Battery System */}
            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
              <Signal className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-300">LTE+</span>
              <Wifi className="w-3.5 h-3.5 text-slate-300" />
              <BatteryCharging className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* INTERNAL CONTENT VIEWPORTS (Screen Controller Switch) */}
          <div className="flex-grow pt-10 relative overflow-hidden h-full">
            <AnimatePresence mode="wait">
              {showSplash ? (
                <SplashScreen onDismiss={handleSplashDismiss} />
              ) : (
                <div className="h-full w-full">
                  {activeScreen === 'passenger-home' && <PassengerHomeScreen />}
                  {activeScreen === 'discovery' && <VehicleDiscoveryScreen />}
                  {activeScreen === 'driver' && <DriverModeScreen />}
                  {activeScreen === 'vehicle-id' && <SmartVehicleIdScreen />}
                  {activeScreen === 'safety' && <SafetyScreen />}
                  {activeScreen === 'analytics' && <AnalyticsScreen />}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* CORE TACTILE PHONE BOTTOM NAVIGATION BUTTONS (Mobile layout feel) */}
          {!showSplash && (
            <div className="pb-3 bg-slate-950/95 backdrop-blur-md border-t border-white/5 relative z-30 pt-1.5">
              {/* Bottom Nav indicators grid */}
              <div className="grid grid-cols-5 gap-1.5 text-center">
                <button
                  onClick={() => setActiveScreen('passenger-home')}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeScreen === 'passenger-home' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Compass className="w-4.5 h-4.5" />
                  <span className="text-[9px] font-mono leading-none">Map</span>
                </button>

                <button
                  onClick={() => setActiveScreen('discovery')}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeScreen === 'discovery' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <LayoutGrid className="w-4.5 h-4.5" />
                  <span className="text-[9px] font-mono leading-none">Corridors</span>
                </button>

                <button
                  onClick={() => setActiveScreen('driver')}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeScreen === 'driver' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Smartphone className="w-4.5 h-4.5" />
                  <span className="text-[9px] font-mono leading-none">Driver</span>
                </button>

                <button
                  onClick={() => setActiveScreen('safety')}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeScreen === 'safety' ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span className="text-[9px] font-mono leading-none">Safety</span>
                </button>

                <button
                  onClick={() => setActiveScreen('analytics')}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeScreen === 'analytics' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <LineChart className="w-4.5 h-4.5" />
                  <span className="text-[9px] font-mono leading-none">Admin</span>
                </button>
              </div>

              {/* Physical Home bar drawer indicator */}
              <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-2.5" />
            </div>
          )}

          {/* HIGH CONTRAST MODULAR PHONE Toast / Alert Dialogs */}
          <AnimatePresence>
            {isCustomAlertOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="absolute inset-[auto_16px_72px_16px] z-50 bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.9)] text-xs flex gap-3 animate-fade-in"
              >
                <div className="grow space-y-1">
                  <div className="flex items-center gap-1.5">
                    {alertConfig.type === 'success' && <span className="text-emerald-400 font-extrabold uppercase tracking-widest font-mono">Notification ✔</span>}
                    {alertConfig.type === 'warning' && <span className="text-amber-400 font-extrabold uppercase tracking-widest font-mono">Safety Broadcast ⚠️</span>}
                    {alertConfig.type === 'error' && <span className="text-red-500 font-extrabold uppercase tracking-widest font-mono">Critical SOS 🚨</span>}
                    {alertConfig.type === 'info' && <span className="text-cyan-400 font-extrabold uppercase tracking-widest font-mono">Telemetry Alert 📡</span>}
                  </div>
                  <strong className="text-white block font-bold leading-tight">{alertConfig.title}</strong>
                  <p className="text-slate-400 leading-relaxed font-mono text-[10.5px]">{alertConfig.desc}</p>
                </div>
                <button
                  onClick={closeAlert}
                  className="bg-slate-950 font-mono font-bold px-3 shrink-0 uppercase tracking-tighter self-start py-1 rounded-lg hover:bg-slate-900 transition border border-white/5 active:scale-95 text-slate-300 select-none text-[10px]"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TransitProvider>
      <AppContent />
    </TransitProvider>
  );
}
