import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import animationData1 from "../assets/Onboarding_Animation.json";
import { FaPlane, FaCar, FaCheckCircle, FaCalendarAlt, FaChevronLeft, FaUserFriends, FaPassport, FaMapMarkerAlt, FaGlobeAmericas } from 'react-icons/fa';
import { FaClock } from "react-icons/fa";

const BookingPage = ({ packageData }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const isInternational = packageData?.category === "International";

  const [formData, setFormData] = useState({
    fullName: '', email: '', city: '', phone: '', travelDate: '',
    specialRequests: '', needsFlight: false, needsCar: false,
    arrivalTime: '12:00', travelers: 1, nights: 1,
    additionalTravelers: [],
    passportNumber: '', visaStatus: 'Not Applied'
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

  const calculateTotal = () => {
    if (!packageData) return 0;
    const base = packageData.price * formData.travelers;
    const stayAddon = (packageData.price * 0.2) * (formData.nights - 1);
    const addons = (formData.needsFlight ? 12000 * formData.travelers : 0) + (formData.needsCar ? 3500 * formData.nights : 0);
    const intlTax = isInternational ? (base * 0.15) : 0;
    return base + stayAddon + addons + intlTax;
  };

  // LOGIC: Ensure only one addon can be selected
  const handleAddonToggle = (type) => {
    if (type === 'flight') {
      setFormData({ ...formData, needsFlight: !formData.needsFlight, needsCar: false });
    } else {
      setFormData({ ...formData, needsCar: !formData.needsCar, needsFlight: false });
    }
  };

  const handleAdditionalChange = (index, field, value) => {
    const updated = [...formData.additionalTravelers];
    updated[index][field] = value;
    setFormData({ ...formData, additionalTravelers: updated });
  };
  // REPLACING ALERT LOGIC WITH FULL RECEIPT HANDLER
  const handleExecutePayment = async () => {
    const totalAmount = calculateTotal();
    const existingTrip = localStorage.getItem('activeManifest');
if (existingTrip) {
  const history = JSON.parse(localStorage.getItem('expeditionHistory') || '[]');
  history.unshift(JSON.parse(existingTrip)); // Add old trip to the top
  localStorage.setItem('expeditionHistory', JSON.stringify(history));
}
    const receiptData = {
      orderId: `#SYT-${Math.floor(Math.random() * 10000)}`,
      tripName: packageData?.name,
      status: 'In Progress',
      total: totalAmount,
      bookedDate: new Date().toLocaleDateString(),
      travelDate: formData.travelDate,
      
      
      // Dynamic Emails
      adminEmail: 'darklord8527789390@gmail.com', 
      userEmail: formData.email,                  
      fullName: formData.fullName,
      phone: formData.phone,
      age: formData.age,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      additionalTravelers: formData.additionalTravelers,
      breakdown: {
        homestay: totalAmount * 0.40,
        guide: totalAmount * 0.25,
        farmers: totalAmount * 0.20,
        platform: totalAmount * 0.15
      }
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/send-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receiptData),
      });
  
      if (response.ok) {
        // PERMANENT STORAGE: Save manifest to browser memory
        localStorage.setItem('activeManifest', JSON.stringify(receiptData));
        
        alert(`Success! Booking manifest dispatched to ${formData.email}. Admin has also been notified.`);
        
        // Navigate to the timeline page
        navigate('/yourtrip'); 
      } else {
        throw new Error("Dispatch failed");
      }
    } catch (error) {
      console.error("Execution Error:", error);
      
      // Save locally even on network error so the user doesn't lose their receipt
      localStorage.setItem('activeManifest', JSON.stringify(receiptData));
      
      alert("Payment Successful! Redirecting to timeline...");
      navigate('/yourtrip');
    }
  };

  if (step === 2) {
    const total = calculateTotal();
    return (
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
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Arrival Time</p>
                  <p className="text-xl font-bold text-slate-800">{formData.arrivalTime} {formData.timeMode}</p>
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
<button 
  onClick={handleExecutePayment} 
  className="flex-[2] py-8 bg-orange-600 text-white font-black text-3xl rounded-3xl shadow-2xl hover:bg-slate-900 transition-all uppercase tracking-widest flex items-center justify-center gap-4"
>
  <FaCheckCircle/> Execute Payment
</button>
          </div>
        </div>
      </div>
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
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="max-w-6xl mx-auto space-y-20">
            
            <div className="space-y-10">
              <h3 className="flex items-center gap-4 text-3xl font-black tracking-tight uppercase text-slate-800">
                <div className="w-12 h-1.5 bg-orange-600 rounded-full"></div> Lead Explorer Information
              </h3>
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
                {/* Fixed small text: Added text-xl and font-bold to inputs */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Identity Name</label>
                  <input required type="text" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="Full Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Age</label>
                  <input required type="number" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="Age" onChange={(e) => setFormData({...formData, age: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Electronic Mail</label>
                  <input required type="email" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="user12345@gmail.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Current State</label>
                  <input required type="text" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="Ex. Uttar Pradesh" onChange={(e) => setFormData({...formData, state: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Current City</label>
                  <input required type="text" className="w-full p-6 text-3xl font-bold transition-all border-none outline-none bg-slate-50 rounded-3xl focus:ring-4 focus:ring-orange-100 text-slate-700" placeholder="Ex. Lucknow" onChange={(e) => setFormData({...formData, city: e.target.value})} />
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
      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
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
    Arrival Time
  </label>

  <div className="flex items-center gap-4 px-5 py-4 transition shadow-sm bg-slate-50 rounded-3xl focus-within:ring-2 focus-within:ring-orange-400">
    
    {/* Orange Clock Icon */}
    <FaClock className="text-2xl text-orange-500" />

    {/* Single Time Input */}
    <input
      type="text"
      placeholder="e.g. 10:30 AM"
      className="w-full text-3xl font-bold bg-transparent outline-none"
      value={formData.arrivalTime}
      onChange={(e) =>
        setFormData({ ...formData, arrivalTime: e.target.value })
      }
    />
  </div>
</div>
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest ml-1">Traveler Count</label>
                <input type="number" min="1" max="10" value={formData.travelers} className="w-full p-6 text-3xl font-black text-orange-600 border-none outline-none bg-slate-50 rounded-3xl" onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})} />
              </div>
            </div>

            {formData.additionalTravelers.length > 0 && (
              <div className="space-y-10 duration-700 animate-in slide-in-from-left">
                <h3 className="text-2xl font-black tracking-tight uppercase text-slate-800">Additional Explorer Data</h3>
                <div className="grid gap-10">
                  {formData.additionalTravelers.map((traveler, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                       <input required type="text" placeholder={`Explorer ${idx + 2} Name`} className="p-5 text-3xl font-bold bg-white border-none outline-none rounded-2xl" onChange={(e) => handleAdditionalChange(idx, 'name', e.target.value)} />
                       <input required type="number" placeholder="Age" className="p-5 text-3xl font-bold bg-white border-none outline-none rounded-2xl" onChange={(e) => handleAdditionalChange(idx, 'age', e.target.value)} />
                       <input required type="email" placeholder="Email" className="p-5 text-3xl font-bold bg-white border-none outline-none rounded-2xl" onChange={(e) => handleAdditionalChange(idx, 'email', e.target.value)} />
                       <input required type="tel" placeholder="Phone" className="p-5 text-3xl font-bold bg-white border-none outline-none rounded-2xl" onChange={(e) => handleAdditionalChange(idx, 'phone', e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            <button type="submit" className="w-full py-10 bg-orange-600 text-white text-4xl font-black rounded-[4rem] shadow-[0_25px_50px_rgba(234,88,12,0.3)] hover:bg-slate-900 transition-all uppercase tracking-[0.1em] active:scale-95">Next: Finalize Manifest</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;