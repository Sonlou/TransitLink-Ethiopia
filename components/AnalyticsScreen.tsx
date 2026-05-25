'use client';

import React from 'react';
import { useTransit } from '../context/TransitContext';
import { AreaChart, Terminal, Compass, BarChart3, TrendingUp, Radio, Flame, ShieldAlert } from 'lucide-react';

export function AnalyticsScreen() {
  const { vehicles, routes } = useTransit();

  // Metrics counts
  const totalFleet = vehicles.length + 18; // plus offline ones
  const activeCorridorsCount = routes.length;
  const criticalTrafficZones = 3;

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white overflow-y-auto no-scrollbar pb-24">
      {/* Visual top bar of administrative console */}
      <div className="p-4 bg-slate-900 border-b border-white/10 shrink-0">
        <h1 className="text-xl font-black uppercase text-white tracking-tight flex items-center gap-1.5">
          <Terminal className="text-amber-400 w-5 h-5 animate-pulse" />
          <span>Addis Transit Core Engine</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Municipal command panel and telemetry flow analytics.
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* TELEMETRY METRIC CARDS GRID */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-900 border border-white/10 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Fleet Active</span>
            <span className="text-lg font-black font-mono text-emerald-400">{totalFleet}</span>
            <span className="text-[8px] text-slate-500 font-mono block">Vehicles</span>
          </div>

          <div className="bg-slate-900 border border-white/10 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Active Hubs</span>
            <span className="text-lg font-black font-mono text-amber-400">{activeCorridorsCount}</span>
            <span className="text-[8px] text-slate-500 font-mono block">Routes</span>
          </div>

          <div className="bg-slate-900 border border-white/10 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">System load</span>
            <span className="text-lg font-black font-mono text-cyan-400">84%</span>
            <span className="text-[8px] text-slate-500 font-mono block">Addis Ababa</span>
          </div>
        </div>

        {/* CROWD TRANSIT FLOW INDEX GRAPH (SVG based visualizer) */}
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>COMMUTER FLOW INTENSITY MATRIX</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono font-bold">24 HR CYCLE</span>
          </div>

          {/* Simple Vector Graph representation */}
          <div className="relative pt-2 h-[120px] w-full flex items-end">
            {/* Background grids */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="w-full h-px bg-white border-t border-dashed" />
              <div className="w-full h-px bg-white border-t border-dashed" />
              <div className="w-full h-px bg-white border-t border-dashed" />
              <div className="w-full h-px bg-white border-t border-dashed" />
            </div>

            {/* Custom SVG Line graph containing beautiful color grids */}
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-emerald-400/20 fill-current overflow-visible">
              {/* Spline Area path */}
              <path d="M 0,30 L 10,25 L 20,28 L 30,12 L 40,3 L 50,8 L 60,18 L 70,5 L 80,3 L 90,15 L 100,28 L 100,30 Z" fill="url(#area-gradient)" stroke="#10B981" strokeWidth="0.8" />
              <defs>
                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Timestamps indicators */}
            <div className="w-full flex justify-between text-[8px] text-slate-500 font-mono pt-2 relative z-10 select-none">
              <span>06:00 (Morning Rush)</span>
              <span>12:00</span>
              <span>17:00 (Piazza Peak)</span>
              <span>22:00</span>
            </div>
          </div>
        </div>

        {/* LIST OF TOP CONGESTED AREAS & CRITICAL CORRIDORS */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-red-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
            <Flame className="w-4 h-4 animate-bounce" />
            <span>CRITICAL ROAD NECKS / HOTSPOTS</span>
          </span>

          <div className="space-y-2 font-mono text-[11px]">
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-white/5">
              <div className="space-y-0.5">
                <span className="font-bold text-white uppercase block">1. Kazanchis Total Interchange</span>
                <span className="text-slate-400 text-[10px]">Expected headway: 14m average boarding delay</span>
              </div>
              <span className="bg-red-500/10 border border-red-500/20 text-red-500 font-bold px-2 py-0.5 rounded uppercase">
                98% Jam
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-white/5">
              <div className="space-y-0.5">
                <span className="font-bold text-white uppercase block">2. Megenagna Diaspora Roundabout</span>
                <span className="text-slate-400 text-[10px]">Minibuses stranded due to light rail blockages</span>
              </div>
              <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded uppercase">
                72% Jam
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-white/5">
              <div className="space-y-0.5">
                <span className="font-bold text-white uppercase block">3. Stadium Gotera Bridge Interchange</span>
                <span className="text-slate-400 text-[10px]">Moderate passenger backup on northbound vehicles</span>
              </div>
              <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold px-2 py-0.5 rounded uppercase">
                48% Jam
              </span>
            </div>
          </div>
        </div>

        {/* LIVE SYSTEM LOGS TERMINAL COMS */}
        <div className="bg-slate-950 border border-white/10 rounded-2xl p-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
            <span className="text-slate-400 uppercase text-[10px]">TransitLink Municipal Logs</span>
            <span className="text-[9px] text-slate-500">Node: Addis-Central-V8</span>
          </div>
          <div className="space-y-1 text-slate-500 text-[10px] bg-slate-950 py-1 max-h-[100px] overflow-y-auto no-scrollbar">
            <p className="text-emerald-500">[INFO] Received seat available broadcast from AA 3-A2345 (3 remaining).</p>
            <p className="text-slate-400">[PING] Sync with Kazanchis sensor antennas: SUCCESS.</p>
            <p className="text-slate-400">[INFO] Enacting cost reduction compression algorithm; low-data protocol: 1.</p>
            <p className="text-red-400">[WARN] Community reported tarifa overcharge for vehicle ID: v3 (Tariku Alamu).</p>
            <p className="text-slate-400">[PING] Frame rate recalibration broadcast finished.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
