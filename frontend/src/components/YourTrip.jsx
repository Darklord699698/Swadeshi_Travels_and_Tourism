import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';

const YourTrip = () => {
  // Initialize state to hold the trip data
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    // 1. Check LocalStorage for a saved booking on component mount
    const savedTrip = localStorage.getItem('activeManifest');
    
    if (savedTrip) {
      setTrip(JSON.parse(savedTrip));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-20 px-[10%]">
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-16 text-6xl font-black tracking-tighter uppercase text-slate-800">Expedition Timeline</h2>
        
        <div className="relative pl-12 space-y-20 border-l-4 border-dashed border-slate-200">
          
          {/* Ongoing Status */}
          <div className="relative">
            <div className="absolute -left-[54px] top-0 w-10 h-10 rounded-full bg-slate-200 border-8 border-white shadow-md"></div>
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">Current Status: Idle</p>
            <p className="text-xl font-bold text-slate-300">No active expeditions currently in field.</p>
          </div>

          {/* Persistent Manifest Section */}
          <div className="relative">
            <div className="absolute -left-[54px] top-0 w-10 h-10 rounded-full bg-orange-600 border-8 border-white shadow-xl animate-pulse"></div>
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-orange-600">Active Reservation</p>
            
            {trip ? (
              <div className="mt-8 max-w-xl bg-[#121212] text-white rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 animate-in slide-in-from-bottom duration-700">
                {/* Header Section matching your receipt image */}
                <div className="bg-[#ea580c] p-10 text-center">
                  <h3 className="text-3xl font-black tracking-[0.1em] uppercase text-white">Booking Manifest</h3>
                  <p className="mt-2 text-sm font-bold tracking-widest uppercase opacity-80">Order ID: {trip.orderId}</p>
                </div>

                {/* Content Section */}
                <div className="p-10 space-y-8 text-left">
                  <div>
                    <h4 className="text-3xl italic font-black">Namaste, {trip.fullName}</h4>
                    <p className="mt-4 font-medium leading-relaxed text-slate-400">
                      Your expedition manifest for <span className="font-bold text-white">{trip.tripName}</span> has been successfully generated.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#1e1e1e] p-8 rounded-[2rem] border border-white/5">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Departure Date: {trip.travelDate}</p>
                    <h2 className="mt-2 text-4xl font-black text-[#ea580c]">
                      Grand Total: ₹{Number(trip.total).toLocaleString()}
                    </h2>
                  </div>

                  {/* Breakdown Section with Economic Impact percentages */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Economic Impact Breakdown</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between pb-2 text-sm font-bold border-b border-white/5 text-slate-300">
                        <span>Homestay Support (40%)</span>
                        <span className="font-mono">₹{Number(trip.breakdown.homestay).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pb-2 text-sm font-bold border-b border-white/5 text-slate-300">
                        <span>Local Guide Fee (25%)</span>
                        <span className="font-mono">₹{Number(trip.breakdown.guide).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pb-2 text-sm font-bold border-b border-white/5 text-slate-300">
                        <span>Farmers & Food (20%)</span>
                        <span className="font-mono">₹{Number(trip.breakdown.farmers).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-[#ea580c] pt-2">
                        <span>Platform Fee (15%)</span>
                        <span className="font-mono">₹{Number(trip.breakdown.platform).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Email Confirmation Note */}
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-xs italic font-bold tracking-widest text-center uppercase text-slate-500">
                      Details logged for {trip.userEmail}
                    </p>
                  </div>

                  <button 
                    onClick={() => window.print()} 
                    className="w-full mt-4 flex items-center justify-center gap-3 py-4 border-2 border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    <FaDownload /> Download Manifest
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-12 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-center shadow-xl">
                <p className="text-sm font-bold tracking-widest uppercase text-slate-400">No active manifest data in current session memory.</p>
              </div>
            )}
          </div>

          {/* Expedition History */}
          <div className="relative">
            <div className="absolute -left-[54px] top-0 w-10 h-10 rounded-full bg-slate-200 border-8 border-white shadow-md"></div>
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">Expedition History</p>
            <p className="text-xl italic font-bold text-slate-300">No past village immersions recorded.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default YourTrip;