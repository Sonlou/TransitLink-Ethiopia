'use client';

import React from 'react';
import { useTransit } from '../context/TransitContext';
import { motion } from 'motion/react';
import { Radio, Users, Map, Plus, Minus, AlertTriangle, RefreshCw, Smartphone } from 'lucide-react';

export function DriverModeScreen() {
  const {
    routes,
    driverOnline,
    toggleDriverOnline,
    driverAvailableSeats,
    incrementDriverSeats,
    decrementDriverSeats,
    driverActiveRoute,
    setDriverActiveRoute,
  } = useTransit();

  const currentRouteObj = routes.find((r) => r.id === driverActiveRoute);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white overflow-y-auto no-scrollbar pb-24">
      {/* Upper header section resembling terminal HUD */}
      <div className="p-4 bg-slate-900/60 border-b border-white/10 text-center relative overflow-hidden">
        {/* Ethiopian visual accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-red-600" />
        
        <h1 className="text-xl font-black uppercase tracking-tight">Driver Center Hub</h1>
        <p className="text-xs text-slate-400 font-mono">Addis Ababa Informal Transport Transit Network</p>

        {/* Live Status indicator label */}
        <div className="mt-3 flex justify-center">
          <button
            onClick={toggleDriverOnline}
            className={`w-full max-w-xs py-3 rounded-2xl font-black text-sm tracking-widest uppercase transition-all duration-300 border flex items-center justify-center gap-2 ${
              driverOnline
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                : 'bg-red-500/10 text-red-400 border-red-500/30'
            }`}
          >
            <Radio className={`w-5 h-5 ${driverOnline ? 'animate-pulse' : ''}`} />
            <span>{driverOnline ? 'Broadcasting Location : LIVE' : 'BROADCAST STATS : OFFLINE'}</span>
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {/* SELECT THE RUNNING ROUTE */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
            Running Transit Corridor
          </label>
          <div className="grid grid-cols-1 gap-2">
            {routes.map((rt) => {
              const isActive = rt.id === driverActiveRoute;
              return (
                <button
                  key={rt.id}
                  onClick={() => setDriverActiveRoute(rt.id)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all flex justify-between items-center ${
                    isActive
                      ? 'bg-slate-900 border-amber-400 shadow-[inset_0_0_10px_rgba(251,191,36,0.1)]'
                      : 'bg-white/[0.01] border-white/5 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div>
                    <span className="text-xs font-mono font-bold block" style={{ color: rt.hex }}>
                      {rt.id.toUpperCase()} CORRIDOR
                    </span>
                    <span className="text-base font-black text-white">{rt.name}</span>
                    <span className="text-xs text-slate-400 block font-mono">via {rt.via}</span>
                  </div>
                  <div className="shrink-0">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isActive ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                      }`}
                    >
                      {isActive && <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DRIVING COCKPIT CONTROLLER - ADJUST EMPTY SEATS */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h2 className="text-sm font-mono text-slate-400 uppercase tracking-widest">
              Vacant Vehicle Seats Tracker
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto mb-4 font-mono">
            TAP QUICKLY TO ANNOUNCE OPENINGS TO PASSENGERS WALKING IN CROWDED HOOKS.
          </p>

          <div className="flex items-center justify-around max-w-xs mx-auto mb-3">
            {/* Decrement Button */}
            <button
              onClick={decrementDriverSeats}
              disabled={driverAvailableSeats === 0}
              className="w-16 h-16 rounded-full bg-slate-950 border border-white/10 hover:border-red-500/40 text-red-500 flex items-center justify-center text-4xl font-extrabold active:scale-95 transition disabled:opacity-35 select-none"
            >
              <Minus className="w-8 h-8" />
            </button>

            {/* Total count display */}
            <div className="flex flex-col items-center">
              <span className="text-5xl font-black font-mono tracking-tight text-white mb-1">
                {driverAvailableSeats}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B4E5AF]">
                Available
              </span>
            </div>

            {/* Increment Button */}
            <button
              onClick={incrementDriverSeats}
              disabled={driverAvailableSeats === 15}
              className="w-16 h-16 rounded-full bg-slate-950 border border-white/10 hover:border-emerald-500/40 text-emerald-400 flex items-center justify-center text-3xl font-extrabold active:scale-95 transition disabled:opacity-35 select-none"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div>

          <p className="text-xs text-slate-400 font-mono">
            Toyota Hiace Standard Limit: <span className="text-amber-400 font-bold">15 Seats</span>
          </p>
        </div>

        {/* DYNAMIC HEATMAP METRICS */}
        <div className="bg-slate-950 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
            <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1">
              <Map className="w-4 h-4 text-amber-400" />
              <span>COMMUTER DEMAND INDICES</span>
            </span>
            <span className="bg-red-500/10 text-red-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
              Heavy Demand
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-white">Kazanchis Hook (Total)</span>
                <span className="text-red-500">CRITICAL CROWDS</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-white">Piazza Post Office</span>
                <span className="text-red-400">HIGH DEMAND</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-white">Bole Medhanialem Mall</span>
                <span className="text-emerald-400">STEADY COMMUTES</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
