'use client';

import React, { useState, useMemo } from 'react';
import { useTransit, Vehicle, Route } from '../context/TransitContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  Wifi,
  WifiOff,
  AlertOctagon,
  ShieldCheck,
  Navigation,
  Check,
  User,
  Info,
  Clock,
  Compass,
  AlertCircle,
  MapPin
} from 'lucide-react';

export function PassengerHomeScreen() {
  const {
    routes,
    vehicles,
    activeRouteFilter,
    setActiveRouteFilter,
    searchQuery,
    setSearchQuery,
    lowDataMode,
    toggleLowDataMode,
    triggerAlert,
    setActiveScreen,
    setScannedVehicle,
  } = useTransit();

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(vehicles[0]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Quick SOS activator
  const handleEmergencySOS = () => {
    triggerAlert(
      'EMERGENCY ACTUATED 🚨',
      'Location coordinates shared instantly with Federal Police, Addis Ababa Traffic Control, and emergency contacts. Visual SOS glow triggered.',
      'error'
    );
  };

  // Preset search locations for presentation demo
  const suggestions = [
    { name: 'Kazanchis (Total)', routeId: 'r1' },
    { name: 'Piazza (Cinema Ethiopia)', routeId: 'r5' },
    { name: 'Bole Medhanialem', routeId: 'r1' },
    { name: 'Megenagna (Diaspora Square)', routeId: 'r2' },
    { name: 'Mexico Square', routeId: 'r3' },
  ];

  // Filtering vehicles based on current state & search inputs
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchRoute = activeRouteFilter === 'all' || v.routeId === activeRouteFilter;
      const routeObj = routes.find((r) => r.id === v.routeId);
      const matchSearch =
        searchQuery === '' ||
        routeObj?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        routeObj?.via.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRoute && matchSearch;
    });
  }, [vehicles, activeRouteFilter, searchQuery, routes]);

  // Handle route click on map
  const activeRouteObj = useMemo(() => {
    return routes.find((r) => r.id === activeRouteFilter);
  }, [routes, activeRouteFilter]);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white relative">
      {/* MAP VIEW SECTION (Upper half) */}
      <div className="relative h-[250px] sm:h-[300px] w-full bg-slate-900 overflow-hidden border-b border-white/10">
        {/* Animated Digital Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Floating Controls Overlay (Glassmorphism layout) */}
        <div className="absolute top-3 left-3 right-3 z-10 flex flex-col gap-2">
          {/* Top Bar with Brand & Low Data Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider uppercase text-slate-100 font-mono">Bole Hub Active</span>
            </div>

            {/* Low Data Mode and Emergency Action */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLowDataMode}
                className={`p-2 rounded-full border backdrop-blur-md transition-all duration-200 shadow-lg ${
                  lowDataMode
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-slate-950/80 border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Toggle Low Data Cost Presets"
              >
                {lowDataMode ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
              </button>
              <button
                onClick={handleEmergencySOS}
                className="bg-red-600/90 hover:bg-red-500 border border-red-500 text-white p-2 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all animate-pulse"
                title="Immediate Driver Security SOS Flags"
              >
                <AlertOctagon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Destination Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-slate-300 shadow-xl relative">
              <Search className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Where are you going? (e.g., Piazza, Kazanchis)"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-white focus:outline-none w-full placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-white text-xs font-mono font-bold mr-1"
                >
                  Clear
                </button>
              )}
              <SlidersHorizontal className="w-4 h-4 text-slate-400 ml-1 shrink-0" />
            </div>

            {/* Preset location suggestions matching presentation design */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-0 right-0 mt-1 bg-slate-950/95 border border-white/15 rounded-xl overflow-hidden shadow-2xl z-20"
                >
                  <div className="p-2 border-b border-white/10 bg-slate-900/50 flex justify-between items-center text-[11px] text-slate-400 uppercase font-mono tracking-wider">
                    <span>Popular Addis Boarding Locations</span>
                    <button onClick={() => setIsSearchFocused(false)} className="text-amber-400 font-bold hover:underline">
                      Close
                    </button>
                  </div>
                  <div className="max-h-[160px] overflow-y-auto divide-y divide-white/5">
                    {suggestions.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => {
                          setSearchQuery(s.name);
                          setActiveRouteFilter(s.routeId);
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-900 transition"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-white font-medium">{s.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {routes.find((r) => r.id === s.routeId)?.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* HIGH-FIDELITY VECTOR MAP OF ADDIS ABABA GRID */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <svg
            className="w-full h-full text-slate-600 transition-all duration-300"
            viewBox="0 0 400 350"
            fill="none"
          >
            {/* Ambient visual overlay for active route flow */}
            {activeRouteFilter === 'r1' && (
              <path d="M 50,220 Q 200,100 350,180" stroke="#10B981" strokeWidth="8" strokeOpacity="0.15" fill="none" strokeLinecap="round" />
            )}
            {activeRouteFilter === 'r2' && (
              <path d="M 50,50 L 350,300" stroke="#FBBF24" strokeWidth="8" strokeOpacity="0.15" fill="none" strokeLinecap="round" />
            )}
            
            {/* Stylized Grid Roads Lines */}
            <path d="M 0,220 C 120,200 240,110 400,180" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            <path d="M 50,0 Q 150,200 350,350" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 0,100 H 400" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 280,0 V 350" stroke="#1e293b" strokeWidth="2" />
            <path d="M 0,300 C 150,300 250,220 400,320" stroke="#1e293b" strokeWidth="3" />

            {/* Glowing active route line overlay based on filtering */}
            <g className="transition-all duration-500">
              {/* Bole Road Piazza (Route 1 - Green) */}
              <path
                d="M 50,220 Q 200,100 350,180"
                stroke={activeRouteFilter === 'r1' ? '#10B981' : '#334155'}
                strokeWidth={activeRouteFilter === 'r1' ? '4' : '1.5'}
                fill="none"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              {/* Megenagna Gerji (Route 2 - Yellow) */}
              <path
                d="M 50,50 L 350,300"
                stroke={activeRouteFilter === 'r2' ? '#FBBF24' : '#334155'}
                strokeWidth={activeRouteFilter === 'r2' ? '4' : '1.5'}
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Landmark Label Dots */}
            {/* Piazza (North-West) */}
            <g transform="translate(70, 70)">
              <circle cx="0" cy="0" r="4.5" fill="#f87171" className="animate-pulse" />
              <text x="8" y="4" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">Piazza</text>
            </g>
            {/* Kazanchis (Center) */}
            <g transform="translate(180, 160)">
              <circle cx="0" cy="0" r="4.5" fill="#10B981" />
              <text x="8" y="4" fill="#e2e8f0" fontSize="8" fontWeight="black" fontFamily="monospace">Kazanchis HUB</text>
            </g>
            {/* Bole (East) */}
            <g transform="translate(320, 240)">
              <circle cx="0" cy="0" r="4.5" fill="#fbbf24" />
              <text x="8" y="4" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">Bole Medhanialem</text>
            </g>
            {/* Stadium (South Central) */}
            <g transform="translate(260, 310)">
              <circle cx="0" cy="0" r="4.5" fill="#38bdf8" />
              <text x="-48" y="-4" fill="#94a3b8" fontSize="8" fontFamily="monospace">Stadium Hub</text>
            </g>

            {/* Real-time moving vehicle markers */}
            {filteredVehicles.map((v) => {
              const isSelected = selectedVehicle?.id === v.id;
              const routeColor = v.routeId === 'r3' ? '#EF4444' : v.routeId === 'r2' || v.routeId === 'r5' ? '#FBBF24' : '#10B981';

              return (
                <g
                  key={v.id}
                  transform={`translate(${v.longitude}, ${v.latitude})`}
                  className="cursor-pointer transition-all duration-700"
                  onClick={() => setSelectedVehicle(v)}
                >
                  {/* Outer pulsing radar ripple */}
                  {isSelected && (
                    <circle cx="0" cy="0" r="16" fill="none" stroke={routeColor} strokeWidth="1.5" className="animate-ping" opacity="0.4" />
                  )}
                  {/* Outer frame border */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? '10' : '7.5'}
                    fill="#020617"
                    stroke={routeColor}
                    strokeWidth={v.isVerified ? '2' : '1'}
                    className="transition-all"
                  />
                  {/* Central Core representing minibus fill state */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? '5.5' : '4'}
                    fill={v.availableSeats === 0 ? '#EF4444' : v.availableSeats <= 2 ? '#FBBF24' : '#10B981'}
                    className="transition-all"
                  />
                  {/* Localised visual label identifier above marker */}
                  {isSelected && (
                    <g transform="translate(0, -18)">
                      <rect x="-30" y="-8" width="60" height="15" rx="3" fill="#020617" stroke={routeColor} strokeWidth="1" />
                      <text x="0" y="2.5" fill="#ffffff" fontSize="7" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                        {v.plateNumber}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Map Mini-Vehicle Preview Card (Absolute slider drawer) */}
        {selectedVehicle && (
          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md rounded-2xl p-3 border border-indigo-500/20 flex gap-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)] md:max-w-md md:left-auto md:right-3 md:top-3 md:bottom-auto">
            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-amber-500 font-bold font-mono tracking-tight flex items-center gap-1">
                  <span>🔵 Blue/White Minibus:</span>
                  <span className="text-white hover:underline">{selectedVehicle.plateNumber}</span>
                </span>
                
                {selectedVehicle.isVerified && (
                  <span className="bg-emerald-500/15 border border-emerald-500/40 text-[9px] font-mono text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                )}
              </div>

              <div className="text-md font-bold text-white tracking-tight">
                {routes.find((r) => r.id === selectedVehicle.routeId)?.name}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                via {routes.find((r) => r.id === selectedVehicle.routeId)?.via}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-2 px-1 border-t border-white/5 pt-2">
                <div>
                  <div className="text-[9px] text-slate-400 font-mono uppercase">Open Seats</div>
                  <div className={`text-sm font-bold font-mono flex items-center gap-1 ${selectedVehicle.availableSeats === 0 ? 'text-red-500' : 'text-emerald-400'}`}>
                    <span>{selectedVehicle.availableSeats === 0 ? 'FULL' : `${selectedVehicle.availableSeats} Free`}</span>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-mono uppercase">Trust Score</div>
                  <div className="text-sm font-bold font-mono text-amber-400">{selectedVehicle.trustScore}%</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-mono uppercase">ETA</div>
                  <div className="text-sm font-bold font-mono text-cyan-400 flex items-center gap-0.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>~4 min</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end border-l border-white/10 pl-3 shrink-0">
              <button
                onClick={() => {
                  setScannedVehicle(selectedVehicle);
                  setActiveScreen('vehicle-id');
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-[11px] py-1.5 px-3 rounded-lg font-mono tracking-tighter uppercase transition-colors"
              >
                Scan ID
              </button>
              
              <button
                onClick={() => setActiveScreen('discovery')}
                className="text-[10px] text-indigo-400 hover:underline flex items-center gap-0.5 mt-2"
              >
                See All Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FILTER BUTTONS & VEHICLE SELECTION BAR */}
      <div className="px-4 py-3 bg-slate-950 flex flex-col gap-2 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#B4E5AF] uppercase flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Select Active Corridor</span>
          </h2>
          <span className="text-[10px] text-slate-400 font-mono">{filteredVehicles.length} of {vehicles.length} Active</span>
        </div>

        {/* Route Filter Carousel */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveRouteFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all font-mono border ${
              activeRouteFilter === 'all'
                ? 'bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 border-transparent text-slate-950'
                : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]'
            }`}
          >
            All Areas
          </button>
          {routes.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRouteFilter(r.id)}
              className={`px-3 py-1.5 rounded-full text-xs shrink-0 transition-all font-mono border flex items-center gap-1.5 ${
                activeRouteFilter === r.id
                  ? 'bg-slate-900 border-white/20 text-white font-bold'
                  : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.hex }}></span>
              {r.name.split('⇄')[0]} {/* Shorten name for tag */}
            </button>
          ))}
        </div>
      </div>

      {/* MID LABELS / DISCOVERY FEED */}
      <div className="flex-grow overflow-y-auto px-4 divide-y divide-white/5 no-scrollbar pb-24">
        {filteredVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
            <AlertCircle className="w-10 h-10 mb-2 text-slate-600" />
            <p className="text-xs font-mono">No active minibuses matched search criteria.</p>
            <p className="text-[11px] text-slate-500 max-w-[240px] mt-1">Try changing route filter or search term to discover available Addis transport corridors.</p>
          </div>
        ) : (
          filteredVehicles.map((v) => {
            const isSelected = selectedVehicle?.id === v.id;
            const routeObj = routes.find((r) => r.id === v.routeId);

            return (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`py-3 flex items-center justify-between gap-3 cursor-pointer group transition-all duration-200 ${
                  isSelected ? 'bg-white/[0.04] px-2 rounded-xl border border-white/5 my-1 shadow-inner' : 'hover:bg-white/[0.02] rounded-xl px-1'
                }`}
              >
                {/* Visual indicator (LED glowing system) */}
                <div className="relative shrink-0 flex items-center justify-center w-3 h-10 rounded-full bg-slate-900 border border-white/10">
                  <span
                    className={`absolute w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]`}
                    style={{
                      color: routeObj?.hex,
                      backgroundColor: routeObj?.hex,
                      animationDuration: '1.5s',
                    }}
                  ></span>
                </div>

                {/* Core description details */}
                <div className="flex-grow">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-white group-hover:underline">
                      {v.plateNumber}
                    </span>
                    {v.isVerified && (
                      <span className="bg-emerald-500/10 text-emerald-400 text-[8px] px-1 font-semibold rounded border border-emerald-500/20 uppercase">
                        Verified
                      </span>
                    )}
                    {v.headingYourWay && (
                      <span className="bg-amber-500/10 text-amber-300 text-[8px] px-1 font-semibold rounded border border-amber-500/20 uppercase">
                        On Way
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">{routeObj?.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">via {routeObj?.via}</div>
                </div>

                {/* Live Seat Availability Bubble */}
                <div className="text-right shrink-0">
                  <div
                    className={`text-xs font-bold font-mono uppercase tracking-tight py-1 px-2.5 rounded-lg border ${
                      v.availableSeats === 0
                        ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_12px_rgba(239,52,52,0.1)]'
                        : v.availableSeats <= 2
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.1)]'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}
                  >
                    {v.availableSeats === 0 ? (
                      <span>Full</span>
                    ) : (
                      <span>{v.availableSeats} Seats</span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono mt-0.5">Trust: {v.trustScore}%</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 bg-slate-900/40 backdrop-blur-md border-t border-white/5 absolute bottom-0 left-0 right-0 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Simulation Live</span>
        </div>
        <button 
          onClick={() => setActiveScreen('discovery')}
          className="text-amber-400 font-bold hover:underline"
        >
          Explore Detailed Grid &rarr;
        </button>
      </div>
    </div>
  );
}
