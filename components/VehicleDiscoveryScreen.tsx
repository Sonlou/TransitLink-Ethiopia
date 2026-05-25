'use client';

import React, { useState } from 'react';
import { useTransit, Vehicle } from '../context/TransitContext';
import { motion } from 'motion/react';
import { ShieldCheck, Flame, Users, Landmark, Search, MessageSquareCode, Sliders, MapPin, Share2, HelpCircle } from 'lucide-react';

export function VehicleDiscoveryScreen() {
  const { routes, vehicles, triggerAlert, shareTripDetails, setActiveScreen, setScannedVehicle } = useTransit();
  const [filterRoute, setFilterRoute] = useState<string>('all');
  const [sharePhone, setSharePhone] = useState<string>('');
  const [activeShareId, setActiveShareId] = useState<string | null>(null);

  // Filter list
  const filteredList = vehicles.filter((v) => {
    return filterRoute === 'all' || v.routeId === filterRoute;
  });

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white overflow-y-auto no-scrollbar pb-24">
      {/* Visual Header Banner */}
      <div className="p-4 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/10 shrink-0">
        <h1 className="text-xl font-black tracking-tight text-white uppercase">Addis Corridor Grid</h1>
        <p className="text-[11px] text-slate-400 font-mono tracking-tight">
          Double-buffered informal route mapping and vacant seat tracking.
        </p>

        {/* Small Horizontal Filter Bar */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pt-3">
          <button
            onClick={() => setFilterRoute('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 font-bold transition-all border ${
              filterRoute === 'all'
                ? 'bg-amber-400 text-slate-950 border-transparent shadow-[0_0_10px_rgba(251,191,36,0.35)]'
                : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Corridors ({vehicles.length})
          </button>
          {routes.map((rt) => {
            const count = vehicles.filter((v) => v.routeId === rt.id).length;
            return (
              <button
                key={rt.id}
                onClick={() => setFilterRoute(rt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 transition-all border flex items-center gap-2 ${
                  filterRoute === rt.id
                    ? 'bg-white/10 border-white/30 text-white font-black'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: rt.hex }} />
                <span>{rt.name.split(' ⇄ ')[0]}</span>
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Discovery Feed Grid of Minibuses */}
      <div className="p-4 flex flex-col gap-4">
        {filteredList.map((v) => {
          const routeObj = routes.find((r) => r.id === v.routeId);
          const isFull = v.availableSeats === 0;
          const occupancyPercentage = ((v.seatCount - v.availableSeats) / v.seatCount) * 100;
          
          return (
            <div
              key={v.id}
              className="relative bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-lg transition-all duration-300 hover:border-white/25 hover:shadow-[0_0_20px_rgba(251,191,36,0.05)]"
            >
              {/* Highlight bar with the color concept */}
              <div className="h-1.5 w-full flex">
                <div className="h-full w-1/3" style={{ backgroundColor: '#009c3a' }} />
                <div className="h-full w-1/3" style={{ backgroundColor: '#fed100' }} />
                <div className="h-full w-1/3" style={{ backgroundColor: '#cd1619' }} />
              </div>

              {/* Card Body */}
              <div className="p-4">
                {/* Upper row: ID tags, trust index & verification badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-slate-950 border border-white/10 font-mono text-xs font-bold px-2 py-0.5 rounded-md text-white">
                      {v.plateNumber}
                    </span>
                    
                    {v.isVerified ? (
                      <span className="bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 px-1.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
                        <ShieldCheck className="w-3 h-3" /> VERIFIED
                      </span>
                    ) : (
                      <span className="bg-slate-950 border border-white/5 text-slate-500 text-[9px] font-mono px-1.5 py-0.5 rounded-full">
                        Pending Community Checks
                      </span>
                    )}

                    {v.headingYourWay && (
                      <span className="bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono text-amber-400 px-1.5 py-0.5 rounded-full animate-pulse font-bold">
                        ★ HEADING YOUR WAY
                      </span>
                    )}
                  </div>

                  {/* Trust Score circular meter representation */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 font-mono">Trust Index:</span>{' '}
                    <span className={`text-xs font-mono font-black ${v.trustScore >= 95 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {v.trustScore}%
                    </span>
                  </div>
                </div>

                {/* Corridor & via points */}
                <h3 className="text-lg font-black tracking-tight text-white mb-0.5">
                  {routeObj?.name}
                </h3>
                <div className="text-xs text-slate-300 font-mono flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>via: {routeObj?.via}</span>
                </div>

                {/* Seat Capacity Bar visualization tool */}
                <div className="space-y-1 bg-slate-950/70 p-3 rounded-xl border border-white/5 mb-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Passengers ({v.seatCount - v.availableSeats}/{v.seatCount})</span>
                    </span>
                    <span className={`font-black ${isFull ? 'text-red-500' : 'text-emerald-400'}`}>
                      {isFull ? 'FULL VACANCY' : `${v.availableSeats} SEAT${v.availableSeats > 1 ? 'S' : ''} FREE`}
                    </span>
                  </div>
                  
                  {/* Gauge bar */}
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull
                          ? 'bg-red-500 shadow-[0_0_8px_#EF4444]'
                          : v.availableSeats <= 2
                          ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${occupancyPercentage}%` }}
                    />
                  </div>

                  <div className="text-[10px] text-slate-500 flex justify-between font-mono pt-1">
                    <span>Addis Abma / Siniya Minibus Standard</span>
                    <span>Last reported: {v.lastUpdated}</span>
                  </div>
                </div>

                {/* Card footer triggers & quick interactivity integrations */}
                <div className="flex justify-between items-center gap-2 pt-1 border-t border-white/5">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <span>Driver:</span>
                    <span className="text-slate-100 font-bold">{v.driverName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Share action triggering modular simulation */}
                    <button
                      onClick={() => {
                        if (activeShareId === v.id) {
                          setActiveShareId(null);
                        } else {
                          setActiveShareId(v.id);
                        }
                      }}
                      className="p-2 bg-slate-950 hover:bg-slate-900 border border-white/10 rounded-lg hover:border-white/20 transition-all text-slate-400 hover:text-white"
                      title="Share trip details with family"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {/* QR SCAN ACTUATOR */}
                    <button
                      onClick={() => {
                        setScannedVehicle(v);
                        setActiveScreen('vehicle-id');
                      }}
                      className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 font-black text-slate-950 text-xs rounded-lg font-mono tracking-tighter uppercase transition-colors"
                    >
                      Verify NFC Code
                    </button>
                  </div>
                </div>

                {/* Expanded share panel drawer within card */}
                {activeShareId === v.id && (
                  <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-white/10 animate-fade-in flex flex-col gap-2">
                    <span className="text-[11px] text-slate-300 font-mono font-bold uppercase tracking-wider block">
                      En-route Safety Broadcasting System (SMS)
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. +251 912 345678"
                        value={sharePhone}
                        onChange={(e) => setSharePhone(e.target.value)}
                        className="bg-slate-900 text-xs font-mono text-white p-2 border border-white/10 rounded-lg focus:outline-none flex-grow"
                      />
                      <button
                        onClick={() => {
                          if (!sharePhone) {
                            triggerAlert('Missing Field', 'Please provide a valid recipient mobile phone number.', 'warning');
                            return;
                          }
                          shareTripDetails(v.id, sharePhone);
                          setSharePhone('');
                          setActiveShareId(null);
                        }}
                        className="bg-purple-600 hover:bg-purple-500 font-mono text-xs px-3.5 rounded-lg font-bold"
                      >
                        Send SMS
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      * SMS parses coordinate markers offline, optimized for feature phone users.
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
