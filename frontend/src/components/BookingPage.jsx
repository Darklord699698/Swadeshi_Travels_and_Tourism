import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from "lottie-react";
import animationData1 from "../assets/Onboarding_Animation.json";
import { FaPlane, FaCar, FaCheckCircle, FaCalendarAlt, FaChevronLeft, FaUserFriends, FaPassport, FaMapMarkerAlt, FaGlobeAmericas } from 'react-icons/fa';
import { FaClock } from "react-icons/fa";
import { useUser } from '@clerk/clerk-react';
import lightningAnimation from '../assets/Online.json';
const BookingPage = ({ packageData: propPackage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const packageData = propPackage || location.state?.package;
  const [step, setStep] = useState(1);
  const isInternational = packageData?.category === "International";
  const { user } = useUser();
  const userId = user?.id || 'guest';
  const [paymentSuccess, setPaymentSuccess] = useState(false);
const [toast, setToast] = useState(false);
const [showLightning, setShowLightning] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', 
    email: '', 
    city: '', 
    phone: '', 
    travelDate: '',
    age: '',     // Added
    state: '',   // Added
    pincode: '', // Added
    specialRequests: '', 
    needsFlight: false, 
    needsCar: false,
    arrivalTime: '12:00', 
    travelers: 1, 
    nights: 1,
    additionalTravelers: [],
    passportNumber: '', 
    visaStatus: 'Not Applied'
  });

  useEffect(() => {
    if (!packageData) navigate('/book');
  }, [packageData, navigate]);

  useEffect(() => {
    const currentCount = formData.travelers - 1;
    if (currentCount > 0) {
      const newTravelers = Array.from({ length: currentCount }, (_, i) => 
        formData.additionalTravelers[i] || { name: '', age: '', email: '', phone: '' }
      );
      setFormData(prev => ({ ...prev, additionalTravelers: newTravelers }));
    } else {
      setFormData(prev => ({ ...prev, additionalTravelers: [] }));
    }
  }, [formData.travelers]);

  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); 
    return date.toISOString().split('T')[0];
  };

  // 1. Improved Calculation with Number Safety
const calculateTotal = () => {
  if (!packageData) return 0;
  
  // Force travelers and nights to be treated as numbers
  const travelers = Number(formData.travelers) || 1;
  const nights = Number(formData.nights) || 1;
  const basePrice = Number(packageData.price) || 0;

  const base = basePrice * travelers;
  const stayAddon = (basePrice * 0.2) * (nights - 1);
  const addons = (formData.needsFlight ? 12000 * travelers : 0) + (formData.needsCar ? 3500 * nights : 0);
  const intlTax = isInternational ? (base * 0.15) : 0;
  
  return base + stayAddon + addons + intlTax;
};
const handleAddonToggle = (type) => {
  setFormData((prev) => {
    if (type === 'flight') {
      return {
        ...prev,
        needsFlight: !prev.needsFlight, // Correctly toggles the boolean
        needsCar: false,               // Mutually exclusive: turns off car if flight is on
      };
    } else {
      return {
        ...prev,
        needsCar: !prev.needsCar,      // Correctly toggles the boolean
        needsFlight: false,            // Mutually exclusive: turns off flight if car is on
      };
    }
  });
};
const handleAdditionalChange = (idx, field, value) => {
  const updated = [...formData.additionalTravelers];
  updated[idx] = { ...updated[idx], [field]: value };
  setFormData(prev => ({ ...prev, additionalTravelers: updated }));
};
// 2. Robust Payment Handler
const handleExecutePayment = async () => {
  const calculated = calculateTotal();
  // Ensure we send a real number, never NaN
  const totalAmount = isNaN(calculated) ? 0 : Number(calculated); 

  const receiptData = {
    orderId: `#SYT-${Math.floor(1000 + Math.random() * 9000)}`,
    clerkUserId: userId,  // ADD THIS
    tripName: packageData?.name || "Unknown Trip",
    status: 'In Progress',
    total: totalAmount,
    bookedDate: new Date().toLocaleDateString(),
    travelDate: formData.travelDate,
    userEmail: formData.email,                  
    fullName: formData.fullName,
    phone: formData.phone,
    age: formData.age || "N/A",      
    state: formData.state || "N/A",  
    city: formData.city || "N/A",    
    pincode: formData.pincode || "N/A", 
    additionalTravelers: formData.additionalTravelers,
    breakdown: {
      homestay: (totalAmount * 0.40).toFixed(2),
      guide: (totalAmount * 0.25).toFixed(2),
      farmers: (totalAmount * 0.20).toFixed(2),
      platform: (totalAmount * 0.15).toFixed(2)
    }
  };

  console.log("🚀 Dispatching Manifest Data:", receiptData);

  try {
    const response = await fetch('https://swadeshi-travels-backend.onrender.com/api/send-receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(receiptData),
    });

    if (response.ok) {
      localStorage.setItem(`activeManifest_${userId}`, JSON.stringify(receiptData));
    
      
      // END DEMO CODE
    
      const tripHist = JSON.parse(localStorage.getItem(`tripHistory_${userId}`) || '[]');
tripHist.unshift(receiptData);
localStorage.setItem(`tripHistory_${userId}`, JSON.stringify(tripHist));
      

    setPaymentSuccess(true);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    setTimeout(() => { setPaymentSuccess(false); navigate('/yourtrip'); }, 3000);
    } else {
      const errorText = await response.text();
      console.error("Backend Error:", errorText);
      throw new Error("Dispatch failed");
    }
  } catch (error) {
    console.error("Execution Error:", error);
    localStorage.setItem(`activeManifest_${userId}`, JSON.stringify(receiptData));
  
    const tripHist = JSON.parse(localStorage.getItem(`tripHistory_${userId}`) || '[]');
    tripHist.unshift(receiptData);
    localStorage.setItem(`tripHistory_${userId}`, JSON.stringify(tripHist));
  
    setPaymentSuccess(true);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    setTimeout(() => { setPaymentSuccess(false); navigate('/yourtrip'); }, 3000);
  }
};

if (step === 2) {
  const total = calculateTotal();
  return (
    <>
    {/* SUCCESS OVERLAY */}
    {paymentSuccess && (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617]/95 backdrop-blur-xl">
        <div className="relative flex items-center justify-center w-48 h-48 mb-10">
          <div className="absolute w-48 h-48 border-8 border-green-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute w-48 h-48 border-8 border-green-500 rounded-full"></div>
          <svg className="w-24 h-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
            style={{ animation: 'bounceIn 0.5s 0.3s ease-out forwards', opacity: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mb-4 text-5xl font-black text-white"
          style={{ animation: 'fadeInUp 0.5s 0.8s ease-out forwards', opacity: 0 }}>
          Payment Successful!
        </h2>
        <p className="text-2xl text-gray-400"
          style={{ animation: 'fadeInUp 0.5s 1s ease-out forwards', opacity: 0 }}>
          Redirecting to your expedition timeline...
        </p>
        <div className="flex gap-3 mt-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#f97316','#22c55e','#3b82f6','#a855f7','#eab308'][i],
                animation: `confetti 1s ${i * 0.15}s ease-out forwards`
              }}></div>
          ))}
        </div>
      </div>
    )}

    {/* TOAST */}
    {toast && (
      <div className="fixed z-50 flex items-center gap-4 px-8 py-5 text-white bg-green-600 shadow-2xl top-8 right-8 rounded-2xl shadow-green-500/30"
        style={{ animation: 'slideInRight 0.3s ease-out' }}>
        <div className="flex items-center justify-center w-10 h-10 text-xl font-black rounded-full bg-white/20">✓</div>
        <div>
          <p className="text-xl font-black">Booking Confirmed!</p>
          <p className="text-sm opacity-80">Receipt sent to {formData.email}</p>
        </div>
      </div>
    )}

    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-[5%]">
        <div className="max-w-6xl mx-auto bg-white rounded-[4rem] shadow-2xl p-20 border border-slate-100 animate-in zoom-in duration-500">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-6xl font-black tracking-tighter uppercase text-slate-800">Final Manifest</h2>
            <div className="text-right">
                <p className="text-xs font-black tracking-widest text-orange-600 uppercase">Order ID</p>
                <p className="font-mono text-xl font-bold text-slate-400">#SYT-{Math.floor(Math.random()*10000)}</p>
            </div>
          </div>
          
          <div className="grid gap-20 mb-16 lg:grid-cols-2">
            <div className="space-y-10">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Lead Explorer</p>
                <p className="text-3xl font-black leading-none capitalize text-slate-800">{formData.fullName}</p>
                <p className="mt-2 text-lg text-slate-500">{formData.email} • {formData.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-8 p-10 bg-slate-50 rounded-[3rem]">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Departure</p>
                  <p className="text-xl font-bold text-slate-800">{formData.travelDate}</p>
                </div>
                
              </div>
            </div>

            <div className="space-y-6">
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Economic Impact Breakdown</p>
               
               {/* NEW: Percentage-based Social Impact Table */}
               <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-tighter uppercase text-slate-500">Homestay Support (40%)</span>
                    <span className="font-mono font-black text-slate-800">₹{(total * 0.40).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-tighter uppercase text-slate-500">Local Guide Fee (25%)</span>
                    <span className="font-mono font-black text-slate-800">₹{(total * 0.25).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-tighter uppercase text-slate-500">Farmers & Food (20%)</span>
                    <span className="font-mono font-black text-slate-800">₹{(total * 0.20).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-sm font-black tracking-tighter text-orange-600 uppercase">Platform & Service (15%)</span>
                    <span className="font-mono font-black text-orange-600">₹{(total * 0.15).toLocaleString()}</span>
                  </div>
               </div>

               <div className="flex items-center justify-between pt-6 mt-4 border-t-2 border-dashed">
                  <span className="text-3xl font-black tracking-tighter uppercase text-slate-800">Grand Total</span>
                  <span className="font-mono text-6xl font-black tracking-tighter text-orange-600">₹{total.toLocaleString('en-IN')}</span>
               </div>
            </div>
          </div>

          <div className="flex gap-8">
            <button onClick={() => setStep(1)} className="flex items-center justify-center flex-1 gap-3 py-8 font-black tracking-widest uppercase transition-all bg-slate-100 text-slate-800 rounded-3xl hover:bg-slate-200"><FaChevronLeft/> Edit Manifest</button>
            {/* REPLACE the Execute Payment button inside Step 2 with this */}
            <div class="voltage-button" style={{flex: 2}}>
  <button onClick={handleExecutePayment}>
    <FaCheckCircle/> Execute Payment
  </button>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 234.6 61.3" preserveAspectRatio="none" xmlSpace="preserve">
    <filter id="glow">
      <feGaussianBlur className="blur" result="coloredBlur" stdDeviation="2"></feGaussianBlur>
      <feTurbulence type="fractalNoise" baseFrequency="0.075" numOctaves="0.3" result="turbulence"></feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="30" xChannelSelector="R" yChannelSelector="G" result="displace"></feDisplacementMap>
      <feMerge>
        <feMergeNode in="coloredBlur"></feMergeNode>
        <feMergeNode in="coloredBlur"></feMergeNode>
        <feMergeNode in="coloredBlur"></feMergeNode>
        <feMergeNode in="displace"></feMergeNode>
        <feMergeNode in="SourceGraphic"></feMergeNode>
      </feMerge>
    </filter>
    <path className="voltage line-1" d="m216.3 51.2c-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 6.8-7.3 6.8-3.7 0-3.7-4.6-7.3-4.6-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-0.9-7.3-0.9-3.7 0-3.7-2.7-7.3-2.7-3.7 0-3.7 7.8-7.3 7.8-3.7 0-3.7-4.9-7.3-4.9-3.7 0-3.7-7.8-7.3-7.8-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 3.1-7.3 3.1-3.7 0-3.7 10.9-7.3 10.9-3.7 0-3.7-12.5-7.3-12.5-3.7 0-3.7 4.6-7.3 4.6-3.7 0-3.7 4.5-7.3 4.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-10-7.3-10-3.7 0-3.7-0.4-7.3-0.4-3.7 0-3.7 2.3-7.3 2.3-3.7 0-3.7 7.1-7.3 7.1-3.7 0-3.7-11.2-7.3-11.2-3.7 0-3.7 3.5-7.3 3.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-2.9-7.3-2.9-3.7 0-3.7 8.4-7.3 8.4-3.7 0-3.7-14.6-7.3-14.6-3.7 0-3.7 5.8-7.3 5.8-2.2 0-3.8-0.4-5.5-1.5-1.8-1.1-1.8-2.9-2.9-4.8-1-1.8 1.9-2.7 1.9-4.8 0-3.4-2.1-3.4-2.1-6.8s-9.9-3.4-9.9-6.8 8-3.4 8-6.8c0-2.2 2.1-2.4 3.1-4.2 1.1-1.8 0.2-3.9 2-5 1.8-1 3.1-7.9 5.3-7.9 3.7 0 3.7 0.9 7.3 0.9 3.7 0 3.7 6.7 7.3 6.7 3.7 0 3.7-1.8 7.3-1.8 3.7 0 3.7-0.6 7.3-0.6 3.7 0 3.7-7.8 7.3-7.8h7.3c3.7 0 3.7 4.7 7.3 4.7 3.7 0 3.7-1.1 7.3-1.1 3.7 0 3.7 11.6 7.3 11.6 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-12.9 7.3-12.9 3.7 0 3.7 10.9 7.3 10.9 3.7 0 3.7 1.3 7.3 1.3 3.7 0 3.7-8.7 7.3-8.7 3.7 0 3.7 11.5 7.3 11.5 3.7 0 3.7-1.4 7.3-1.4 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-5.8 7.3-5.8 3.7 0 3.7-1.3 7.3-1.3 3.7 0 3.7 6.6 7.3 6.6s3.7-9.3 7.3-9.3c3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7 8.5 7.3 8.5 3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7-1.5 7.3-1.5 3.7 0 3.7 1.6 7.3 1.6s3.7-5.1 7.3-5.1c2.2 0 0.6 9.6 2.4 10.7s4.1-2 5.1-0.1c1 1.8 10.3 2.2 10.3 4.3 0 3.4-10.7 3.4-10.7 6.8s1.2 3.4 1.2 6.8 1.9 3.4 1.9 6.8c0 2.2 7.2 7.7 6.2 9.5-1.1 1.8-12.3-6.5-14.1-5.5-1.7 0.9-0.1 6.2-2.2 6.2z" fill="transparent" stroke="#fff"></path>
    <path className="voltage line-2" d="m216.3 52.1c-3 0-3-0.5-6-0.5s-3 3-6 3-3-2-6-2-3 1.6-6 1.6-3-0.4-6-0.4-3-1.2-6-1.2-3 3.4-6 3.4-3-2.2-6-2.2-3-3.4-6-3.4-3-0.5-6-0.5-3 1.4-6 1.4-3 4.8-6 4.8-3-5.5-6-5.5-3 2-6 2-3 2-6 2-3 1.6-6 1.6-3-4.4-6-4.4-3-0.2-6-0.2-3 1-6 1-3 3.1-6 3.1-3-4.9-6-4.9-3 1.5-6 1.5-3 1.6-6 1.6-3-1.3-6-1.3-3 3.7-6 3.7-3-6.4-6-6.4-3 2.5-6 2.5h-6c-3 0-3-0.6-6-0.6s-3-1.4-6-1.4-3 0.9-6 0.9-3 4.3-6 4.3-3-3.5-6-3.5c-2.2 0-3.4-1.3-5.2-2.3-1.8-1.1-3.6-1.5-4.6-3.3s-4.4-3.5-4.4-5.7c0-3.4 0.4-3.4 0.4-6.8s2.9-3.4 2.9-6.8-0.8-3.4-0.8-6.8c0-2.2 0.3-4.2 1.3-5.9 1.1-1.8 0.8-6.2 2.6-7.3 1.8-1 5.5-2 7.7-2 3 0 3 2 6 2s3-0.5 6-0.5 3 5.1 6 5.1 3-1.1 6-1.1 3-5.6 6-5.6 3 4.8 6 4.8 3 0.6 6 0.6 3-3.8 6-3.8 3 5.1 6 5.1 3-0.6 6-0.6 3-1.2 6-1.2 3-2.6 6-2.6 3-0.6 6-0.6 3 2.9 6 2.9 3-4.1 6-4.1 3 0.1 6 0.1 3 3.7 6 3.7 3 0.1 6 0.1 3-0.6 6-0.6 3 0.7 6 0.7 3-2.2 6-2.2 3 4.4 6 4.4 3-1.7 6-1.7 3-4 6-4 3 4.7 6 4.7 3-0.5 6-0.5 3-0.8 6-0.8 3-3.8 6-3.8 3 6.3 6 6.3 3-4.8 6-4.8 3 1.9 6 1.9 3-1.9 6-1.9 3 1.3 6 1.3c2.2 0 5-0.5 6.7 0.5 1.8 1.1 2.4 4 3.5 5.8 1 1.8 0.3 3.7 0.3 5.9 0 3.4 3.4 3.4 3.4 6.8s-3.3 3.4-3.3 6.8 4 3.4 4 6.8c0 2.2-6 2.7-7 4.4-1.1 1.8 1.1 6.7-0.7 7.7-1.6 0.8-4.7-1.1-6.8-1.1z" fill="transparent" stroke="#fff"></path>
  </svg>
  <div className="dots">
    <div className="dot dot-1"></div>
    <div className="dot dot-2"></div>
    <div className="dot dot-3"></div>
    <div className="dot dot-4"></div>
    <div className="dot dot-5"></div>
  </div>
</div>
          </div>
        </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-center min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="w-[98vw] max-w-[1700px] grid lg:grid-cols-[500px_1fr] bg-white shadow-2xl rounded-[4.5rem] overflow-hidden border border-slate-100 min-h-[85vh]">
        
        {/* LEFT ORANGE AREA */}
<div className="relative flex flex-col justify-between p-16 overflow-hidden text-white bg-orange-600">
  <div className="space-y-12">
    <div className="p-4 bg-white/20 w-fit rounded-2xl backdrop-blur-md">
        {isInternational ? <FaGlobeAmericas size={32}/> : <FaMapMarkerAlt size={32}/>}
    </div>
    <h2 className="text-6xl italic font-black leading-none tracking-tighter uppercase">Booking<br/>Manifest</h2>
    
    {/* Small Animation Container with expanded vertical space */}
    <div className="flex items-center justify-center h-[350px]">
      <div className="h-130 w-100"> {/* Small fixed dimensions */}
        <Lottie 
          animationData={animationData1} 
          loop={true} 
          className="w-full h-full"
        />
      </div>
    </div>

    <div className="pt-10 border-t border-white/20">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-200 opacity-60">Destination Hub</p>
      <p className="text-4xl font-black leading-none tracking-tight capitalize">{packageData?.name}</p>
      {/* DYNAMIC DESCRIPTION: Fills the space until Live Valuation */}
      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar pt-10">
        <p className="text-2xl italic font-medium leading-relaxed text-orange-50/80">
          {packageData?.description || `Explore the majestic beauty and cultural heritage of ${packageData?.name}. A perfect blend of tradition and modern exploration awaits your arrival.`}
        </p>
      </div>
    </div>
  </div>
  
  
  
  <div className="p-10 bg-black/10 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-xl">
    <p className="text-xs font-black uppercase text-orange-200 tracking-[0.2em] mb-2 opacity-80">Live Valuation</p>
    <p className="font-mono text-6xl font-black tracking-tighter">₹{calculateTotal().toLocaleString()}</p>
  </div>
  
</div>

        {/* RIGHT FORM AREA */}
        <div className="p-20 overflow-y-auto scroll-smooth">
        <form onSubmit={(e) => { 
  e.preventDefault();
  if (formData.phone.length !== 10) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    alert('Please enter a valid email address');
    return;
  }
  const invalidMember = formData.additionalTravelers.find(t => t.phone?.length !== 10);
  if (invalidMember) {
    alert('Please enter a valid 10-digit phone number for all travelers');
    return;
  }
  setShowLightning(true);
  setTimeout(() => {
    setShowLightning(false);
    setStep(2);
  }, 2000);
}} className="max-w-6xl mx-auto space-y-20">
            
            <div className="space-y-10">
              <h3 className="flex items-center gap-4 text-3xl font-black tracking-tight uppercase text-slate-800">
                <div className="w-12 h-1.5 bg-orange-600 rounded-full"></div> Lead Explorer Information
              </h3>
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
                {/* Fixed small text: Added text-xl and font-bold to inputs */}
                <div className="space-y-3">
  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
  <input required type="text" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="Enter Your Full Name..."
    value={formData.fullName}
    onChange={(e) => {
      const val = e.target.value;
      if (/^[a-zA-Z\s]*$/.test(val)) setFormData({...formData, fullName: val});
    }}
  />
</div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Age</label>
                  <input required type="number" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="Age" onChange={(e) => setFormData({...formData, age: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Your Mail</label>
                  <input required type="email" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="user12345@gmail.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-3">
  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Current State</label>
  <input required type="text" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="Ex. Uttar Pradesh"
    value={formData.state}
    onChange={(e) => {
      const val = e.target.value;
      if (/^[a-zA-Z\s]*$/.test(val)) setFormData({...formData, state: val});
    }}
  />
</div>
<div className="space-y-3">
  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Current City</label>
  <input required type="text" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="Ex. Lucknow"
    value={formData.city}
    onChange={(e) => {
      const val = e.target.value;
      if (/^[a-zA-Z\s]*$/.test(val)) setFormData({...formData, city: val});
    }}
  />
</div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Pincode</label>
                  <input required type="number" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="Ex. 560064 , 560035" onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                </div>
                <div className="space-y-3">
  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Contact Phone</label>
  <div className="flex gap-4 p-4 bg-slate-50 rounded-[2.5rem] focus-within:ring-4 focus-within:ring-orange-100 transition-all items-center">
    
    {/* Country Code Selector */}
    <div className="relative group">
    
    
    <select 
      className="w-[130%] pl-2 p-2 text-3xl font-black text-slate-800 bg-slate-50 border-2 border-transparent rounded-[2.5rem] outline-none appearance-none cursor-pointer focus:bg-white focus:border-orange-600 transition-all shadow-sm"
      value={formData.countryCode || '+91'}
      onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
    >
      <option value="+91">+91 (India)</option>
      <option value="+1">+1 (USA)</option>
      <option value="+44">+44 (UK)</option>
      <option value="+7">+7 (Russia)</option>
      <option value="+41">+41 (Switzerland)</option>
      <option value="+971">+971 (UAE)</option>
      <option value="+33">+33 (France)</option>
      <option value="+49">+49 (Germany)</option>
      <option value="+39">+39 (Italy)</option>
      <option value="+34">+34 (Spain)</option>
      <option value="+81">+81 (Japan)</option>
      <option value="+86">+86 (China)</option>
      <option value="+61">+61 (Australia)</option>
      <option value="+1">+1 (Canada)</option>
      <option value="+65">+65 (Singapore)</option>
      <option value="+60">+60 (Malaysia)</option>
      <option value="+66">+66 (Thailand)</option>
      <option value="+62">+62 (Indonesia)</option>
      <option value="+82">+82 (South Korea)</option>
      <option value="+31">+31 (Netherlands)</option>
      <option value="+46">+46 (Sweden)</option>
      <option value="+47">+47 (Norway)</option>
      <option value="+45">+45 (Denmark)</option>
      <option value="+351">+351 (Portugal)</option>
      <option value="+30">+30 (Greece)</option>
      <option value="+90">+90 (Turkey)</option>
      <option value="+27">+27 (South Africa)</option>
      <option value="+55">+55 (Brazil)</option>
      <option value="+52">+52 (Mexico)</option>
      <option value="+7">+7 (Kazakhstan)</option>
    </select>

  </div>
    {/* Phone Number Input */}
    <input 
  required 
  type="number" 
  className="w-[130%] pl-10 py-2 text-3xl font-black bg-transparent border-none outline-none text-slate-700 placeholder-slate-200" 
  placeholder="00000 00000" 
  value={formData.phone}
  onChange={(e) => {
    const val = e.target.value;
    if (val.length <= 10) {
      setFormData({...formData, phone: val});
    }
  }}
/>
  </div>
</div>
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase text-orange-600 tracking-widest ml-1">Departure Schedule</label>
                <div className="flex items-center gap-3 p-6 transition-all bg-slate-50 rounded-3xl focus-within:ring-4 focus-within:ring-orange-100">
                  <FaCalendarAlt className="text-orange-600" />
                  <input required type="date" min={getMinDate()} className="w-full text-3xl font-bold bg-transparent border-none outline-none" onChange={(e) => setFormData({...formData, travelDate: e.target.value})} />
                </div>
              </div>
              <div className="space-y-3">
  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">
  Traveler Count
  </label>

  <div className="flex items-center gap-4 px-5 py-0 transition shadow-sm bg-slate-50 rounded-3xl focus-within:ring-2 focus-within:ring-orange-400">
  <div className="space-y-3">
                <input type="number" min="1" max="10" value={formData.travelers} className="w-full p-6 text-3xl font-black text-orange-600 border-none outline-none bg-slate-50 rounded-3xl" onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})} />
              </div>
  </div>
</div>
              
            </div>

            {formData.additionalTravelers.map((traveler, idx) => (
  <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
    
    {/* Name - letters only */}
    <input required type="text" placeholder={`Explorer ${idx + 2} Name`} className="p-5 text-3xl font-bold bg-white border-none outline-none rounded-2xl"
      value={traveler.name || ''}
      onChange={(e) => {
        const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        handleAdditionalChange(idx, 'name', val);
      }}
    />

    {/* Age */}
    <input required type="number" placeholder="Age" className="p-5 text-3xl font-bold bg-white border-none outline-none rounded-2xl"
      value={traveler.age || ''}
      onChange={(e) => handleAdditionalChange(idx, 'age', e.target.value)}
    />

    {/* Email */}
    <input required type="email" placeholder="Email" className="p-5 text-3xl font-bold bg-white border-none outline-none rounded-2xl"
      value={traveler.email || ''}
      onChange={(e) => handleAdditionalChange(idx, 'email', e.target.value)}
    />

    {/* Phone - max 10 digits only */}
    <input required type="text" inputMode="numeric" placeholder="Phone" className="p-5 text-3xl font-bold bg-white border-none outline-none rounded-2xl"
      value={traveler.phone || ''}
      onChange={(e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
        handleAdditionalChange(idx, 'phone', val);
      }}
    />

  </div>
))}

            {isInternational && (
                <div className="p-16 space-y-10 bg-blue-50/20 border-4 border-blue-50 rounded-[4rem] animate-in zoom-in duration-1000">
                    <h3 className="flex items-center gap-4 text-3xl font-black text-blue-900 uppercase">
                        <FaPassport className="text-blue-600" /> Global Clearance Documentation
                    </h3>
                    <div className="grid gap-10 md:grid-cols-2">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-blue-400 uppercase tracking-widest ml-1">Passport Number</label>
                            <input required type="text" className="w-full p-6 text-3xl font-bold transition-all bg-white border-none outline-none rounded-3xl focus:ring-4 focus:ring-blue-100" placeholder="Z0000000" onChange={(e) => setFormData({...formData, passportNumber: e.target.value})} />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-blue-400 uppercase tracking-widest ml-1">Visa Authorization Status</label>
                            <select className="w-full p-6 text-3xl font-bold transition-all bg-white border-none outline-none cursor-pointer rounded-3xl focus:ring-4 focus:ring-blue-100" onChange={(e) => setFormData({...formData, visaStatus: e.target.value})}>
                                <option>Not Applied</option>
                                <option>In Process</option>
                                <option>Already Issued</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-8">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Special Manifest Requests</label>
                <textarea className="w-full p-10 bg-slate-50 border-none rounded-[3rem] h-48 outline-none focus:ring-4 focus:ring-orange-100 resize-none font-bold text-3xl" placeholder="Enter dietary protocols, accessibility requirements, or specific requests here..." onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}></textarea>
            </div>

            {/* LOGIC: Circular Checkboxes & Conditional Visibility */}
<div className="p-12 border-2 border-slate-100 bg-slate-50/50 rounded-[4rem] space-y-10 shadow-sm">
  <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4">Add-On Manifest Services</p>
  <div className="flex flex-col gap-16 md:flex-row">
    
    {/* Aerial Transit - Always visible */}
    <label className="flex items-center gap-6 cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input 
          type="checkbox" 
          checked={formData.needsFlight} 
          className="w-10 h-10 transition-all duration-300 border-2 border-orange-600 rounded-full appearance-none cursor-pointer peer checked:bg-orange-600 active:scale-90" 
          onChange={() => handleAddonToggle('flight')} 
        />
        {/* Animated Checkmark for Circle */}
        <FaCheckCircle className="absolute text-xl text-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100" />
      </div>
      <div className="flex flex-col">
        <span className="flex items-center gap-3 text-2xl font-black tracking-tighter uppercase transition-colors text-slate-700 group-hover:text-orange-600">
          <FaPlane className="text-blue-500" /> Aerial Transit
        </span>
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Premium round-trip flight services</span>
      </div>
    </label>

    {/* Private Fleet - Hidden for International, Exclusive selection for Swadeshi */}
    {!isInternational && (
      <label className="flex items-center gap-6 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input 
            type="checkbox" 
            checked={formData.needsCar} 
            className="w-10 h-10 transition-all duration-300 border-2 border-orange-600 rounded-full appearance-none cursor-pointer peer checked:bg-orange-600 active:scale-90" 
            onChange={() => handleAddonToggle('car')} 
          />
          <FaCheckCircle className="absolute text-xl text-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100" />
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-3 text-2xl font-black tracking-tighter uppercase transition-colors text-slate-700 group-hover:text-orange-600">
            <FaCar className="text-green-500" /> Private Fleet
          </span>
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Interested in private car rental</span>
        </div>
      </label>
    )}
  </div>
</div>

<button type="submit" className="manifest-btn">
  Next: Finalize Manifest
  <svg className="w-10 h-10" viewBox="0 0 576 512" fill="white">
    <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/>
  </svg>
</button>
          </form>
        </div>
      </div>
    {/* LIGHTNING TRANSITION */}
    {showLightning && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/10 backdrop-blur-2xl">
          <Lottie
            animationData={lightningAnimation}
            loop={true}
            style={{ width: '400px', height: '400px' }}
          />
          <h2 className="mb-4 text-5xl font-black text-slate-800"
            style={{ animation: 'fadeInUp 0.5s 0.3s ease-out forwards', opacity: 0 }}>
            Generating Your Manifest...
          </h2>
          <p className="text-2xl font-bold tracking-widest text-orange-600 uppercase"
            style={{ animation: 'fadeInUp 0.5s 0.6s ease-out forwards', opacity: 0 }}>
            {packageData?.name}
          </p>
          <div className="h-2 mt-8 overflow-hidden rounded-full w-80 bg-slate-200">
            <div className="h-full bg-orange-600 rounded-full"
              style={{ animation: 'loadingBar 2s ease-out forwards' }}>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingPage;