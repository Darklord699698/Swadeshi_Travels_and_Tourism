import React, { useState, useEffect } from 'react';
import { FaDownload, FaUserFriends, FaMapMarkerAlt, FaCheckCircle, FaTicketAlt, FaChevronDown } from 'react-icons/fa';

const YourTrip = () => {
  const [trip, setTrip] = useState(null);
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // 1. Get current active trip
    const savedTrip = localStorage.getItem('activeManifest');
    if (savedTrip) {
      setTrip(JSON.parse(savedTrip));
    }

    // 2. Load expedition history
    const savedHistory = localStorage.getItem('expeditionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const toggleHistory = (orderId) => {
    setExpandedId(expandedId === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-20 px-[10%] font-sans">
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-16 text-6xl font-black tracking-tighter uppercase text-slate-800">Expedition Timeline</h2>
        
        <div className="relative pl-12">
          
          {/* THE PROGRESS BAR (Flipkart Style) */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-slate-200">
  {/* Dynamic Fill Logic */}
  <div 
    className="w-full transition-all duration-1000 ease-in-out bg-green-500" 
    style={{ 
      height: trip 
        ? (history.length > 0 ? '100%' : '50%') 
        : '0%' 
    }}
  ></div>
</div>

          <div className="space-y-24">
            
            {/* 1. PAYMENT & STATUS NODE */}
            <div className="relative">
              <div className={`absolute -left-[43px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-md transition-all duration-700 ${trip ? 'bg-green-500 scale-110' : 'bg-slate-200'}`}></div>
              
              <div className="duration-700 animate-in fade-in slide-in-from-left">
                <p className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${trip ? 'text-green-600' : 'text-slate-400'}`}>
                   Current Status: {trip ? trip.tripName : 'Idle'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xl font-bold text-slate-800">
                    {trip ? (
                      <span className="flex items-center gap-2">Payment Completed <FaCheckCircle className="text-green-500" /></span>
                    ) : (
                      <span className="italic text-slate-300">No active expeditions currently in field.</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. ACTIVE MANIFEST NODE */}
            <div className="relative">
              <div className={`absolute -left-[43px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-xl transition-all duration-700 ${trip ? 'bg-green-500' : 'bg-slate-300'}`}></div>
              
              <div className="duration-1000 animate-in fade-in slide-in-from-left">
                <p className={`text-[10px] font-black tracking-[0.3em] uppercase ${trip ? 'text-green-600' : 'text-slate-400'}`}>
                    {trip ? 'Manifest Verified' : 'Awaiting Reservation'}
                </p>
                
                {trip ? (
                  <div className="mt-8 max-w-xl bg-[#121212] text-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
                    <div className="p-10 text-center bg-orange-600">
                      <h3 className="text-3xl font-black tracking-[0.1em] uppercase text-white">Booking Manifest</h3>
                      <p className="inline-block pt-2 mt-2 text-xs font-bold tracking-widest uppercase border-t opacity-80 border-white/20">Order ID: {trip.orderId}</p>
                    </div>

                    <div className="p-10 space-y-10 text-left">
                      <div>
                        <h4 className="text-4xl italic font-black text-white">Namaste, {trip.fullName}</h4>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/5 rounded-full border border-white/10 text-slate-400">Age: {trip.age}</span>
                            <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/5 rounded-full border border-white/10 text-slate-400"><FaMapMarkerAlt className="inline mr-1 text-orange-500"/> {trip.city}, {trip.state}</span>
                            <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/5 rounded-full border border-white/10 text-slate-400">PIN: {trip.pincode}</span>
                        </div>
                        <p className="mt-6 text-lg font-medium leading-relaxed text-slate-400">
                          Your expedition manifest for <span className="font-bold text-white underline decoration-orange-500 decoration-2 underline-offset-4">{trip.tripName}</span> has been successfully generated and confirmed.
                        </p>
                      </div>

                   
{/* Additional Explorers */}
{trip.additionalTravelers?.length > 0 && (
  <div className="space-y-4">
    <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] flex items-center gap-2">
      <FaUserFriends /> Expedition Team
    </p>
    <div className="overflow-hidden border divide-y bg-white/5 rounded-3xl border-white/10 divide-white/5">
      {trip.additionalTravelers.map((member, idx) => (
        <div key={idx} className="p-5 hover:bg-white/[0.02] transition-colors">
          {/* Main Row: Name, Age, and Number in one line */}
          <div className="flex flex-row items-center justify-between w-full gap-4">
            
            {/* 1. Name Section */}
            <div className="flex-1 min-w-[120px]">
              <span className="block text-sm font-bold truncate text-slate-200">
                {idx + 2}. {member.name}
              </span>
            </div>

            {/* 2. Age Section */}
            <div className="flex-shrink-0">
              <span className="text-[10px] font-black text-slate-500 bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">
                {member.age} YRS
              </span>
            </div>

            {/* 3. Phone Number Section */}
            <div className="flex-1 text-right">
              <span className="text-[11px] text-slate-500 font-mono tracking-tighter">
                📞 {member.phone}
              </span>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
)}

                      <div className="bg-[#1e1e1e] p-10 rounded-[2.5rem] border border-white/5 text-center shadow-inner"> 
                          
                      

                      <div className="px-4 space-y-4">
                        <div className="flex justify-between pb-2 text-xl font-bold border-b border-white/5 text-slate-400"><span>Homestay Support (40%)</span><span className="font-mono text-white">₹{Number(trip.breakdown.homestay).toLocaleString()}</span></div>
                        <div className="flex justify-between pb-2 text-xl font-bold border-b border-white/5 text-slate-400"><span>Local Guide & Expertise (25%)</span><span className="font-mono text-white">₹{Number(trip.breakdown.guide).toLocaleString()}</span></div>
                        <div className="flex justify-between pb-2 text-xl font-bold border-b border-white/5 text-slate-400"><span>Farmers & Sustenance (20%)</span><span className="font-mono text-white">₹{Number(trip.breakdown.farmers).toLocaleString()}</span></div>
                        <div className="flex justify-between pt-2 text-xl font-black tracking-widest uppercase text-slate-400"><span>Platform Fee (15%)</span><span className="font-mono text-white">₹{Number(trip.breakdown.platform).toLocaleString()}</span></div>
                      </div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2 pt-4">Grand Total</p>
                          <h2 className="text-5xl font-black text-[#ea580c] tracking-tighter">₹{Number(trip.total).toLocaleString()}</h2>
                          <div className="flex justify-center mt-6"> 
                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] border-t border-white/10 pt-4 w-full">Departure: {trip.travelDate}</p>
                          </div>
                          </div>

                      <button onClick={() => window.print()} className="w-full mt-4 flex items-center justify-center gap-3 py-5 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-lg shadow-white/5">
                        <FaDownload /> Download Verified Manifest
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-12 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-center shadow-xl">
                    <p className="text-sm italic font-bold tracking-widest uppercase text-slate-400">No active manifest found in current session memory.</p>
                  </div>
                )}
              </div>
            </div>

            {/* 3. HISTORY NODE (Full Ticket Style Manifest) */}
<div className="relative">
  <div className={`absolute -left-[43px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-md transition-all duration-700 ${history.length > 0 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
  <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">Expedition History</p>
  
  <div className="mt-8 space-y-6">
    {history.length > 0 ? history.map((h, idx) => (
      <div key={idx} className="max-w-xl overflow-hidden bg-white border shadow-sm rounded-[2.5rem] border-slate-200">
        {/* TICKET HEADER / STUB */}
        <button 
          onClick={() => toggleHistory(h.orderId)}
          className="flex items-center justify-between w-full p-8 transition-colors border-l-8 hover:bg-slate-50 border-l-orange-500"
        >
          <div className="flex items-center gap-4 text-left">
            <FaTicketAlt className="text-slate-300" />
            <div>
              <h4 className="font-bold text-slate-800">{h.tripName}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{h.travelDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-bold text-slate-600">₹{Number(h.total).toLocaleString()}</span>
            <FaChevronDown className={`text-slate-300 transition-transform duration-300 ${expandedId === h.orderId ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* FULL EXPANDED MANIFEST (Matching Active Style Exactly) */}
        {expandedId === h.orderId && (
          <div className="p-10 bg-[#121212] text-white animate-in slide-in-from-top duration-500 space-y-10">
            {/* Identity & Origin Chips */}
            <div>
              <div className="flex items-start justify-between pb-4 mb-6 border-b border-white/10">
                  <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Historical Record</p>
                  <p className="text-[9px] text-slate-500 font-mono">#{h.orderId}</p>
              </div>
              <h4 className="text-3xl italic font-black text-white">Namaste, {h.fullName}</h4>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 text-[9px] font-black uppercase bg-white/5 rounded-full border border-white/10 text-slate-400">Age: {h.age}</span>
                <span className="px-3 py-1 text-[9px] font-black uppercase bg-white/5 rounded-full border border-white/10 text-slate-400">📍 {h.city}, {h.state}</span>
                <span className="px-3 py-1 text-[9px] font-black uppercase bg-white/5 rounded-full border border-white/10 text-slate-400">PIN: {h.pincode}</span>
              </div>
            </div>

            {/* Team Members List (History Expansion) */}
{h.additionalTravelers?.length > 0 && (
  <div className="space-y-4">
    <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.3em] flex items-center gap-2">
      <FaUserFriends /> Expedition Team
    </p>
    <div className="overflow-hidden border divide-y bg-white/5 rounded-2xl border-white/10 divide-white/5">
      {h.additionalTravelers.map((member, mIdx) => (
        <div key={mIdx} className="p-4 hover:bg-white/[0.02] transition-colors">
          <div className="flex flex-row items-center justify-between w-full gap-3">
            
            {/* 1. Name */}
            <div className="flex-1">
              <span className="block text-xs font-bold truncate text-slate-200">
                {mIdx + 2}. {member.name}
              </span>
            </div>

            {/* 2. Age Badge */}
            <div className="flex-shrink-0">
              <span className="text-[9px] font-black text-slate-500 bg-white/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                {member.age} YRS
              </span>
            </div>

            {/* 3. Phone Number */}
            <div className="flex-1 text-right">
              <span className="text-[10px] text-slate-500 font-mono tracking-tighter">
                📞 {member.phone}
              </span>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
)}

            {/* Centered Total Box */}
            <div className="bg-[#1e1e1e] p-10 rounded-[2.5rem] border border-white/5 text-center shadow-inner"> 
              
            

            {/* Economic Breakdown */}
            <div className="px-2 space-y-4">
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Impact Analysis</p>
               <div className="space-y-3">
                 <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>Homestay Support</span>
                    <span className="font-mono text-white">₹{Number(h.breakdown?.homestay || 0).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-[11px] font-bold text-slate-400">
    <span>Local Guide Fee (25%)</span>
    <span className="font-mono text-white">₹{Number(h.breakdown?.guide || 0).toLocaleString()}</span>
  </div>
  <div className="flex justify-between text-[11px] font-bold text-slate-400">
    <span>Farmers & Food (20%)</span>
    <span className="font-mono text-white">₹{Number(h.breakdown?.farmers || 0).toLocaleString()}</span>
  </div>
                 <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>Platform Fee</span>
                    <span className="font-mono text-white">₹{Number(h.breakdown?.platform || 0).toLocaleString()}</span>
                 </div>
               </div>
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Final Settlement</p>
              <h2 className="text-4xl font-black text-[#ea580c] tracking-tighter">
                ₹{Number(h.total).toLocaleString()}
              </h2>
              <div className="flex justify-center mt-6"> 
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-t border-white/10 pt-4 w-full">
                  Settled on: {h.bookedDate || h.travelDate}
                </p>
              </div>
            </div>
            </div>

            <button 
              onClick={() => window.print()} 
              className="w-full py-4 bg-white/10 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Print Historical Copy
            </button>
          </div>
        )}
      </div>
    )) : (
      <p className="text-xl italic font-bold text-slate-300">No past village immersions recorded.</p>
    )}
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default YourTrip;