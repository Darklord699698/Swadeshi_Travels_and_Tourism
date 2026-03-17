import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { FaDownload, FaUserFriends, FaMapMarkerAlt, FaCheckCircle, FaTicketAlt, FaChevronDown } from 'react-icons/fa';
import { addReview, getReviewsForPackage } from '../utils/reviewsStore';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const YourTrip = () => {
  const [trip, setTrip] = useState(null);
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const { user } = useUser();
  const userId = user?.id || 'guest';
  const navigate = useNavigate();
const [reviewingTrip, setReviewingTrip] = useState(null);
const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
const [hover, setHover] = useState(0);
const [reviewSubmitted, setReviewSubmitted] = useState({});
const [showCancelModal, setShowCancelModal] = useState(false);
const [cancelling, setCancelling] = useState(false);
const [cancelSuccess, setCancelSuccess] = useState(false);

  useEffect(() => {
    // 1. Get current active trip
    const savedTrip = localStorage.getItem(`activeManifest_${userId}`);
    if (savedTrip) {
      setTrip(JSON.parse(savedTrip));
    }

    // 2. Load expedition history
    const savedHistory = localStorage.getItem(`expeditionHistory_${userId}`);
    const activeTripData = savedTrip ? JSON.parse(savedTrip) : null;

    if (savedHistory) {
      const allHistory = JSON.parse(savedHistory);
      const filtered = activeTripData
        ? allHistory.filter(h => h.orderId !== activeTripData.orderId)
        : allHistory;
      setHistory(filtered);
    }
  }, [userId]);

  const toggleHistory = (orderId) => {
    setExpandedId(expandedId === orderId ? null : orderId);
  };
  const handleReviewSubmit = (tripName) => {
    if (reviewForm.rating === 0) return alert("Please select a rating!");
    
    addReview({
      id: Date.now(),
      userId: userId,
      name: user?.fullName || user?.username || "Explorer",
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      packageName: tripName,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });
  
    setReviewSubmitted(prev => ({ ...prev, [tripName]: true }));
    setReviewingTrip(null);
    setReviewForm({ rating: 0, comment: '' });
  };

  const handleCancelTrip = async () => {
    setCancelling(true);
    try {
      await fetch('https://swadeshi-travels-backend.onrender.com/api/cancel-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: trip.orderId,
          tripName: trip.tripName,
          fullName: trip.fullName,
          email: trip.userEmail,
          total: trip.total,
          travelDate: trip.travelDate,
          bookedDate: trip.bookedDate,
        }),
      });
  
      localStorage.removeItem(`activeManifest_${userId}`);

// Remove from expedition history too
const existingHistory = JSON.parse(localStorage.getItem(`expeditionHistory_${userId}`) || '[]');
const updatedHistory = existingHistory.filter(h => h.orderId !== trip.orderId);
localStorage.setItem(`expeditionHistory_${userId}`, JSON.stringify(updatedHistory));

// Remove from trip history too
const existingTripHistory = JSON.parse(localStorage.getItem(`tripHistory_${userId}`) || '[]');
const updatedTripHistory = existingTripHistory.filter(h => h.orderId !== trip.orderId);
localStorage.setItem(`tripHistory_${userId}`, JSON.stringify(updatedTripHistory));

setTrip(null);
setHistory(updatedHistory);
      setCancelling(false);
      setShowCancelModal(false);
      setCancelSuccess(true);
      setTimeout(() => setCancelSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      setCancelling(false);
    }
  };
  
  return (
    <>
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
{/* Additional Explorers */}
{/* Additional Explorers - Lead Style Replication (Active Manifest) */}
{trip.additionalTravelers?.length > 0 && (
  <div className="pt-10 mt-10 space-y-12 border-t border-white/5">
    <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.3em] flex items-center gap-2">
      <FaUserFriends /> Expedition Team
    </p>
    
    <div className="space-y-12">
      {trip.additionalTravelers.map((member, idx) => (
        <div key={idx} className="duration-700 animate-in fade-in slide-in-from-bottom">
          
          {/* 1. Name Heading - Large & Italicized to match Lead */}
          <h4 className="text-3xl italic font-black text-white break-words">
            {idx + 2}. {member.fullName || member.name || "Explorer"}
          </h4>

          {/* 2. Identity Chips - No width restrictions, they will wrap automatically */}
          <div className="flex flex-wrap gap-2 mt-4">
            
            {/* Age Chip */}
            <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/5 rounded-full border border-white/10 text-slate-400">
              AGE: {member.age || "N/A"}
            </span>
            
            {/* Phone Chip */}
            <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/5 rounded-full border border-white/10 text-slate-400">
              📞 {member.phone || "No Number"}
            </span>

            {/* Email Chip - break-all ensures long emails don't push the chip off-screen */}
            {(member.userEmail || member.email) && (
              <span className="px-4 py-1.5 text-[10px] font-black lowercase tracking-wider bg-white/5 rounded-full border border-white/10 text-slate-400 break-all">
                ✉️ {member.userEmail || member.email}
              </span>
            )}
          </div>

          <p className="mt-4 text-[11px] font-medium text-slate-500 italic opacity-60">
            Co-explorer registered for this expedition.
          </p>
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

<button onClick={() => setShowCancelModal(true)}
  className="w-full mt-3 flex items-center justify-center gap-3 py-5 bg-red-600/10 text-red-400 border border-red-500/20 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
  ✕ Cancel This Trip
</button>
                      {/* ADD THIS BELOW */}
{reviewSubmitted[trip.tripName] ? (
  <div className="w-full mt-3 py-4 text-center text-green-400 text-[11px] font-black uppercase tracking-widest border border-green-500/20 rounded-2xl bg-green-500/10">
    ✓ Review Submitted!
  </div>
) : reviewingTrip === trip.tripName ? (
  <div className="p-6 mt-3 space-y-4 border bg-white/5 rounded-2xl border-white/10">
    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Rate {trip.tripName}</p>
    <div className="flex gap-2">
      {[1,2,3,4,5].map(star => (
        <button key={star} type="button"
          onClick={() => setReviewForm({...reviewForm, rating: star})}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}>
          <Star size={28}
            fill={(hover || reviewForm.rating) >= star ? "#ea580c" : "none"}
            color={(hover || reviewForm.rating) >= star ? "#ea580c" : "#475569"} />
        </button>
      ))}
    </div>
    <textarea
      rows="6"
      value={reviewForm.comment}
      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value.toLowerCase()})}
      placeholder="share your experience..."
      className="w-full p-4 text-2xl text-white lowercase border outline-none resize-none bg-white/5 border-white/10 rounded-xl placeholder-slate-500"
    />
    <div className="flex gap-3">
      <button onClick={() => handleReviewSubmit(trip.tripName)}
        className="flex-1 py-3 bg-orange-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-700 transition-all">
        Submit Review
      </button>
      <button onClick={() => setReviewingTrip(null)}
        className="py-3 px-5 bg-white/10 text-white text-[11px] font-black uppercase rounded-xl hover:bg-white/20 transition-all">
        Cancel
      </button>
    </div>
  </div>
) : (
  <button onClick={() => setReviewingTrip(trip.tripName)}
    className="w-full mt-3 py-4 border border-orange-500/30 text-orange-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">
    ★ Review This Trip
  </button>
)}
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
    <div className="overflow-visible border divide-y bg-white/5 rounded-2xl border-white/10 divide-white/5">
      {h.additionalTravelers.map((member, mIdx) => (
        <div key={mIdx} className="p-5 transition-colors hover:bg-white/[0.02]">
          <div className="flex flex-col space-y-3">

            {/* Full Name */}
            <div className="w-full">
              <span className="block text-sm font-bold leading-snug break-words text-slate-100">
                {mIdx + 2}. {member.name || "N/A"}
              </span>
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap gap-4">
              {/* Age */}
              <div className="flex flex-col min-w-[60px]">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Age</span>
                <span className="text-[11px] font-bold text-slate-300">{member.age || "N/A"} YRS</span>
              </div>

              {/* Phone */}
              <div className="flex flex-col min-w-[120px] border-l border-white/10 pl-2 break-all">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Phone</span>
                <span className="text-[11px] font-mono text-slate-300">{member.phone || "N/A"}</span>
              </div>

              {/* Email */}
              <div className="flex-1 flex flex-col min-w-[150px] border-l border-white/10 pl-2 break-words">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Email</span>
                <span className="text-[11px] text-slate-400 italic break-words">{member.email || "N/A"}</span>
              </div>
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
            {/* ADD THIS BELOW */}
{reviewSubmitted[h.tripName] ? (
  <div className="w-full mt-3 py-3 text-center text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/20 rounded-2xl bg-green-500/10">
    ✓ Review Submitted!
  </div>
) : reviewingTrip === h.orderId ? (
  <div className="p-6 mt-3 space-y-4 border bg-white/5 rounded-2xl border-white/10">
    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Rate {h.tripName}</p>
    <div className="flex gap-2">
      {[1,2,3,4,5].map(star => (
        <button key={star} type="button"
          onClick={() => setReviewForm({...reviewForm, rating: star})}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}>
          <Star size={24}
            fill={(hover || reviewForm.rating) >= star ? "#ea580c" : "none"}
            color={(hover || reviewForm.rating) >= star ? "#ea580c" : "#475569"} />
        </button>
      ))}
    </div>
    <textarea
      rows="6"
      value={reviewForm.comment}
      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value.toLowerCase()})}
      placeholder="share your experience..."
      className="w-full p-4 text-2xl text-white lowercase border outline-none resize-none bg-white/5 border-white/10 rounded-xl placeholder-slate-500"
    />
    <div className="flex gap-3">
      <button onClick={() => handleReviewSubmit(h.tripName)}
        className="flex-1 py-3 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-700 transition-all">
        Submit Review
      </button>
      <button onClick={() => setReviewingTrip(null)}
        className="py-3 px-5 bg-white/10 text-white text-[10px] font-black uppercase rounded-xl hover:bg-white/20 transition-all">
        Cancel
      </button>
    </div>
  </div>
) : (
  <button onClick={() => setReviewingTrip(h.orderId)}
    className="w-full mt-3 py-3 border border-orange-500/30 text-orange-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">
    ★ Review This Trip
  </button>
)}
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

{/* CANCEL CONFIRMATION MODAL */}
{showCancelModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
    <div className="w-full max-w-2xl bg-[#121212] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
      style={{ animation: 'bounceIn 0.4s ease-out forwards' }}>
      <div className="p-12 text-center border-b bg-red-600/20 border-red-500/20">
        <div className="flex items-center justify-center h-16 mx-auto mb-4 rounded-full w-160 bg-red-600/20">
          <span className="text-3xl">⚠️</span>
        </div>
        <h3 className="text-3xl font-black tracking-widest text-white uppercase">Cancel Trip?</h3>
        <p className="mt-2 text-2xl text-slate-400">This action cannot be undone</p>
      </div>
      <div className="p-12 space-y-6">
      <div className="p-8 space-y-4 border rounded-2xl bg-white/5 border-white/10">
          <p className="text-[20px] font-black text-orange-500 uppercase tracking-widest">Trip Details</p>
          <p className="text-2xl font-black text-white">{trip?.tripName}</p>
          <p className="text-2xl text-slate-400">Order: {trip?.orderId}</p>
          <p className="text-2xl text-slate-400">Travel Date: {trip?.travelDate}</p>
          <p className="text-2xl font-black text-red-400">₹{Number(trip?.total).toLocaleString()}</p>
        </div>
        <p className="text-2xl text-center text-slate-500">
          A cancellation confirmation will be sent to our team. Refund processing may take 5-7 business days.
        </p>
        <div className="flex gap-4 pt-4">
        <button onClick={() => setShowCancelModal(false)}
  className="flex-1 py-6 bg-white/10 text-white text-[13px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all">
  Keep Trip
</button>
<button onClick={handleCancelTrip} disabled={cancelling}
  className="flex-1 py-6 bg-red-600 text-white text-[13px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all disabled:opacity-50">
  {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
</button>
        </div>
      </div>
    </div>
  </div>
)}

{/* CANCEL SUCCESS TOAST */}
{cancelSuccess && (
  <div className="fixed z-50 flex items-center gap-4 px-8 py-5 text-white bg-red-600 shadow-2xl top-8 right-8 rounded-2xl shadow-red-500/30"
    style={{ animation: 'slideInRight 0.3s ease-out' }}>
    <div className="flex items-center justify-center w-10 h-10 text-xl font-black rounded-full bg-white/20">✕</div>
    <div>
      <p className="text-xl font-black">Trip Cancelled!</p>
      <p className="text-sm opacity-80">Cancellation email sent to our team</p>
    </div>
  </div>
)}

</>
);
};

export default YourTrip;