'use client';

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Lightbulb, MapPin, Navigation } from 'lucide-react';

interface SplashScreenProps {
  onDismiss: () => void;
}

export function SplashScreen({ onDismiss }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="absolute inset-0 bg-slate-950 flex flex-col justify-between items-center p-6 text-white overflow-hidden select-none z-50">
      {/* Background Gradients & Digital Grid Overlay */}
      <div className="absolute inset-0 opacity-15 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500 rounded-full filter blur-[80px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full ring-8 ring-white/[0.01]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/10 border-dashed rounded-full"></div>
      </div>

      {/* Top Banner indicating prototype */}
      <div className="mt-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/30 text-[10px] tracking-widest text-emerald-400 uppercase font-mono shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          Addis Ababa Mobility Incubator
        </motion.div>
      </div>

      {/* Animated Glowing Logo */}
      <div className="flex flex-col items-center justify-center flex-grow -translate-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-28 h-28 flex items-center justify-center bg-slate-900/90 rounded-3xl border border-white/15 shadow-[0_0_50px_rgba(251,191,36,0.1)] mb-6"
        >
          {/* Neon circular outlines representing outer radar mapping */}
          <div className="absolute inset-0.5 rounded-[26px] border border-dashed border-amber-400/40 animate-[spin_10s_linear_infinite]"></div>
          
          {/* Glow effects for Green, Yellow, Red (Subtle Ethiopian flag neon style) */}
          <div className="absolute -top-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-sm"></div>
          <div className="absolute top-1/2 -left-1 w-1 h-8 bg-gradient-to-b from-transparent via-amber-400 to-transparent blur-sm"></div>
          <div className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-sm"></div>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="text-white relative z-10"
          >
            {/* Custom SVG of a bold, sleek modern transport node with custom map pin */}
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
              <path d="M5 17h14M5 12h14M12 2v20" stroke="url(#logo-grad)" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="#020617" stroke="#FBBF24" strokeWidth="2" />
              <path d="M12 9a3 3 0 0 1 3 3" stroke="#EF4444" strokeWidth="2" />
            </svg>
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
          </motion.div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
        >
          TransitLink<span className="text-amber-400">.</span>
        </motion.h1>

        {/* Ethiopia Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-1.5 mt-1.5"
        >
          <span className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">Addis Ababa Smart City</span>
          <div className="flex gap-0.5 h-1.5 items-center">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-sm text-slate-400 text-center font-light mt-6 max-w-[240px] italic"
        >
          “Making Informal Transport Discoverable”
        </motion.p>
      </div>

      {/* Floating features hint footer */}
      <div className="w-full max-w-xs flex flex-col items-center gap-6 mb-8">
        {/* Loading Bar with interactive glow */}
        <div className="w-full h-[3px] bg-slate-900 rounded-full overflow-hidden relative border border-white/5">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 4, ease: "easeInOut", repeat: 0 }}
            className="absolute top-0 bottom-0 w-2/3 bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 shadow-[0_0_10px_rgba(241,191,36,0.8)]"
          />
        </div>

        {/* Concept indicators */}
        <div className="grid grid-cols-3 gap-4 w-full text-center text-[9px] text-slate-500 uppercase font-mono">
          <div className="flex flex-col items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-500/70" />
            <span>Map Discover</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500/70" />
            <span>Smart LED ID</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Navigation className="w-4 h-4 text-red-500/70" />
            <span>Crowd Index</span>
          </div>
        </div>

        {/* Prompt skip action */}
        <button
          onClick={onDismiss}
          className="text-[11px] text-slate-500 hover:text-white transition duration-200 mt-2 font-mono flex items-center gap-1 border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] px-3 py-1.5 rounded-full"
        >
          Skip Presentation Splash &rarr;
        </button>
      </div>
    </div>
  );
}
