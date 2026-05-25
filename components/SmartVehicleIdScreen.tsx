'use client';

import React, { useState } from 'react';
import { useTransit, Vehicle } from '../context/TransitContext';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, ScanFace, Smartphone, Lightbulb, BadgeCheck, Camera, ShieldAlert, Cpu, Check, HelpCircle } from 'lucide-react';

export function SmartVehicleIdScreen() {
  const { vehicles, routes, scannedVehicle, setScannedVehicle, triggerAlert } = useTransit();
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [activeChipTab, setActiveChipTab] = useState<'qr' | 'led' | 'nfc'>('qr');

  // Launch a realistic simulated hardware scan
  const startSimulationScan = (vId: string) => {
    setIsScanning(true);
    setScannedVehicle(null);
    setTimeout(() => {
      const match = vehicles.find((v) => v.id === vId) || vehicles[0];
      setScannedVehicle(match);
      setIsScanning(false);
      triggerAlert(
        'VHF/NFC Signature Verified ✔',
        `Cryptographic badge parsed. Minibus ${match.plateNumber} corresponds with active route coordinates.`,
        'success'
      );
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white overflow-y-auto no-scrollbar pb-24">
      {/* Upper informational bar */}
      <div className="p-4 bg-slate-900/80 border-b border-white/10 shrink-0">
        <h1 className="text-xl font-black uppercase text-white tracking-tight flex items-center gap-1.5">
          <Cpu className="text-emerald-400 w-5 h-5" />
          <span>Smart Vehicle ID System</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Deciphering informal transport through modular hardware.
        </p>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* HARWARE INNOVATION CATEGORIES */}
        <div className="grid grid-cols-3 gap-2 bg-slate-900 p-1.5 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveChipTab('qr')}
            className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition flex flex-col items-center gap-1 ${
              activeChipTab === 'qr' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>QR Sticker</span>
          </button>
          <button
            onClick={() => setActiveChipTab('led')}
            className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition flex flex-col items-center gap-1 ${
              activeChipTab === 'led' ? 'bg-[#10B981] text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Smart LED</span>
          </button>
          <button
            onClick={() => setActiveChipTab('nfc')}
            className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition flex flex-col items-center gap-1 ${
              activeChipTab === 'nfc' ? 'bg-indigo-505 bg-indigo-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>NFC Tap</span>
          </button>
        </div>

        {/* DETAILS OF INNOVATION SCHEME */}
        <div className="bg-slate-900/40 p-3.5 rounded-2xl border border-white/10 text-xs">
          {activeChipTab === 'qr' && (
            <div className="space-y-1.5 font-mono">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">★ Dual-Sided QR Tech stickers</span>
              <p className="text-slate-300">
                Large, weatherproof qr stickers pasted on front windows allow commuters to point and scan the bus license from up to 15 meters away even in crowded, dense terminals.
              </p>
            </div>
          )}
          {activeChipTab === 'led' && (
            <div className="space-y-1.5 font-mono">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">★ High Intensity Color-Code LEDs</span>
              <p className="text-slate-300">
                Under government-approved smart-city frameworks, color codes identify destination zones (Bole = Green, Piazza = Yellow, Lideta = Red) allowing instant distinction at night.
              </p>
            </div>
          )}
          {activeChipTab === 'nfc' && (
            <div className="space-y-1.5 font-mono">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">★ Offline NFC Tag Antennas</span>
              <p className="text-slate-300">
                A simple phone tap on the conductor’s windshield tag loads real-time route verifications, pricing guidelines, and safety certificates securely without using internet data.
              </p>
            </div>
          )}
        </div>

        {/* THE MAIN ACTIVE SCANNER WINDOW EMULATOR */}
        <div className="relative aspect-video rounded-2xl border-2 border-dashed border-white/20 bg-slate-950 flex flex-col items-center justify-center overflow-hidden p-4 shadow-[0_0_20px_rgba(255,255,255,0.01)] group">
          {/* Diagnostic status target lines */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400" />

          {/* Glowing laser sweeps on scanner active */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                exit={{ top: '0%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="absolute left-0 right-0 h-1.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10"
              />
            )}
          </AnimatePresence>

          {isScanning ? (
            <div className="text-center space-y-2 z-10">
              <ScanFace className="w-10 h-10 text-emerald-400 animate-bounce mx-auto" />
              <p className="text-xs font-mono uppercase tracking-widest text-[#B4E5AF] animate-pulse">
                DECODING LED SPECTRUM...
              </p>
              <p className="text-[10px] text-slate-500 font-mono">Reading license identifier AA 3-A2345...</p>
            </div>
          ) : scannedVehicle ? (
            <div className="text-center space-y-2 z-10">
              <BadgeCheck className="w-12 h-12 text-emerald-400 mx-auto drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
              <h3 className="text-sm font-bold tracking-tight text-white font-mono uppercase">
                CRYPTO ID LOCK MATCHED
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Verified Plate: <span className="text-white font-bold">{scannedVehicle.plateNumber}</span>
              </p>
              <button
                onClick={() => setScannedVehicle(null)}
                className="text-[10px] text-slate-400 hover:text-white underline font-mono block mx-auto"
              >
                Scan Another Vehicle
              </button>
            </div>
          ) : (
            <div className="text-center space-y-3 z-10">
              <div className="flex gap-2 justify-center">
                <QrCode className="w-8 h-8 text-amber-400" />
                <Camera className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-xs font-mono text-slate-300">
                Point at vehicle or select a model below to emulate scanning.
              </p>

              {/* Quick simulator selection nodes */}
              <div className="flex flex-wrap gap-1.5 justify-center mt-2 max-w-xs">
                {vehicles.map((vh) => (
                  <button
                    key={vh.id}
                    onClick={() => startSimulationScan(vh.id)}
                    className="text-[9px] font-mono bg-slate-900 border border-white/10 hover:border-emerald-500/30 text-white px-2 py-1 rounded-md transition"
                  >
                    🚀 Run: {vh.plateNumber}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DECIPHERED METRICS DETAIL CARDS */}
        {scannedVehicle && (
          <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-lg animate-fade-in">
            {/* Background design flag */}
            <div className="absolute right-0 top-0 text-[60px] leading-none opacity-5 select-none font-bold">
              ETH
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block uppercase">Corridor Verified</span>
                <span className="text-base font-black text-white">
                  {routes.find((r) => r.id === scannedVehicle.routeId)?.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 font-bold font-mono tracking-widest bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full block uppercase">
                  Safe Badge
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="space-y-0.5 bg-slate-950 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block text-[9px] uppercase">Official Owner</span>
                <span className="text-white font-bold">{scannedVehicle.driverName}</span>
              </div>

              <div className="space-y-0.5 bg-slate-950 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block text-[9px] uppercase">Registered Seats</span>
                <span className="text-white font-bold">{scannedVehicle.seatCount} Capacity</span>
              </div>

              <div className="space-y-0.5 bg-slate-950 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block text-[9px] uppercase">Direction Index</span>
                <span className="text-amber-400 font-bold">Kazanchis Highroad</span>
              </div>

              <div className="space-y-0.5 bg-slate-950 p-2.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block text-[9px] uppercase">Security Rating</span>
                <span className="text-emerald-400 font-bold">{scannedVehicle.trustScore}% Verified</span>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex gap-2">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-[11px] font-mono text-slate-300">
                <strong className="text-white">Active Conformance:</strong> This vehicle complies with standard safety tariffs. Ride safe!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
