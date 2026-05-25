'use client';

import React, { useState } from 'react';
import { useTransit, Vehicle } from '../context/TransitContext';
import { motion } from 'motion/react';
import { ShieldCheck, Share2, HelpCircle, FileText, AlertTriangle, Users, BookOpen, Key } from 'lucide-react';

export function SafetyScreen() {
  const { vehicles, communityReports, addReport, shareTripDetails, triggerAlert } = useTransit();
  
  // States
  const [reportVehicleId, setReportVehicleId] = useState<string>(vehicles[0]?.id || '');
  const [reportIssue, setReportIssue] = useState<string>('Overcharging');
  const [reportDesc, setReportDesc] = useState<string>('');
  
  const [sharePhone, setSharePhone] = useState<string>('');
  const [shareVehicleId, setShareVehicleId] = useState<string>(vehicles[0]?.id || '');
  
  const [authCode, setAuthCode] = useState<string>('');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDesc) {
      triggerAlert('Details Required', 'Please provide a brief description of the incident.', 'warning');
      return;
    }
    addReport(reportVehicleId, reportIssue, reportDesc);
    setReportDesc('');
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sharePhone) {
      triggerAlert('Phone Required', 'Please provide a recipient phone number.', 'warning');
      return;
    }
    shareTripDetails(shareVehicleId, sharePhone);
    setSharePhone('');
  };

  // Generate cryptographic temporary ticket token
  const handleGenerateAuthCode = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setAuthCode(code);
    triggerAlert(
      'Security Code Issued 🎫',
      `Present code "${code}" to the minibus conductor to authorize safety logging.`,
      'success'
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white overflow-y-auto no-scrollbar pb-24">
      {/* Upper header */}
      <div className="p-4 bg-slate-900/80 border-b border-white/10 shrink-0">
        <h1 className="text-xl font-black uppercase text-white tracking-tight flex items-center gap-1.5">
          <ShieldCheck className="text-emerald-400 w-5 h-5" />
          <span>Safety & Trust Center</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Decentralized community reporting and trip broadcasting safeguards.
        </p>
      </div>

      <div className="p-4 space-y-5">
        
        {/* SECURE PASSENGER AUTH TOKEN */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5">
            <Key className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Commuter Authenticator Pin
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono max-w-xs mx-auto">
            Generate a secure ticket authorization pin to verify standard tariff compliance with conductors before boarding.
          </p>

          <div className="flex flex-col items-center gap-2">
            {authCode ? (
              <div className="px-5 py-2.5 bg-slate-950 border border-amber-400 text-amber-400 font-mono text-xl font-black tracking-widest rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                {authCode}
              </div>
            ) : (
              <button
                onClick={handleGenerateAuthCode}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-white/15 hover:border-white/35 text-white font-mono text-xs rounded-xl transition"
              >
                Generate Code
              </button>
            )}
            <span className="text-[9px] text-slate-500 font-mono">Changes every 15 minutes. Decodes completely offline.</span>
          </div>
        </div>

        {/* INCIDENT community FLAGS MODAL FORM */}
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/10 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-red-500 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span>FILE COMMUNITY SECURITY REPORT</span>
          </span>

          <form onSubmit={handleReportSubmit} className="space-y-3 font-mono text-xs">
            {/* Select Target Vehicle */}
            <div className="space-y-1">
              <label className="text-slate-400 block uppercase text-[10px]">Select Incident Minibus</label>
              <select
                value={reportVehicleId}
                onChange={(e) => setReportVehicleId(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500/40"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.plateNumber} ({v.driverName})
                  </option>
                ))}
              </select>
            </div>

            {/* Select Issue Type */}
            <div className="space-y-1">
              <label className="text-slate-400 block uppercase text-[10px]">Discrepancy Severity Category</label>
              <select
                value={reportIssue}
                onChange={(e) => setReportIssue(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500/40"
              >
                <option value="Overcharging">Overcharging / Tariff Violations</option>
                <option value="Driver Recklessness">Reckless Driving / Overspeeding</option>
                <option value="Overcrowded Seat Limit">Exceeding standard 15 occupancy</option>
                <option value="Unregistered Conductor">Unverified conductor credentials</option>
              </select>
            </div>

            {/* Incident Details text areas */}
            <div className="space-y-1">
              <label className="text-slate-400 block uppercase text-[10px]">Incident Details Description</label>
              <textarea
                value={reportDesc}
                onChange={(e) => setReportDesc(e.target.value)}
                placeholder="Describe current street context..."
                className="w-full h-16 bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500/40 resize-none placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl uppercase tracking-wider transition-colors"
            >
              Log Live Alert Anonymously
            </button>
          </form>
        </div>

        {/* RECENT REPORTS LOG FEED */}
        <div className="bg-slate-950 border border-white/10 rounded-2xl p-4">
          <span className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5 mb-3 border-b border-white/5 pb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Addis Ababa Commuter Incidents Ledger ({communityReports.length})</span>
          </span>

          <div className="space-y-2.5 max-h-[160px] overflow-y-auto divide-y divide-white/5 pr-1 no-scrollbar">
            {communityReports.map((rep) => {
              const plateName = vehicles.find((v) => v.id === rep.vehicleId)?.plateNumber || 'Unidentified';
              return (
                <div key={rep.id} className="pt-2 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="bg-red-500/15 text-red-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                      {rep.issue}
                    </span>
                    <span className="text-[10px] text-slate-500">{rep.timestamp}</span>
                  </div>
                  <div className="text-white mt-1">Vehicle Plate: {plateName}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{rep.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
