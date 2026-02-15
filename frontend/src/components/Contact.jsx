import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData1 from "../assets/Feedback.json";

const Contact = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- CONTROLLED STATES TO FORCE LOWERCASE ---
  const [formData, setFormData] = useState({
    name: '',
    type: 'General Inquiry',
    email: '',
    message: ''
  });

  const handleClose = () => navigate('/');

  // Handles input changes and forces lowercase where needed
  const handleChange = (e) => {
    const { name, value } = e.target;
    // We only force lowercase for email and message
    const processedValue = (name === 'email' || name === 'message') ? value.toLowerCase() : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };
  // Use environment variable if it exists, otherwise fallback to localhost
  // Use environment variable if it exists, otherwise fallback to localhost
  // Ensure this is outside or at the top of your function
  // 1. You defined it as API_URL here
  const API_URL = import.meta.env.DEV 
  ? 'http://localhost:5000' 
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // FIX: Changed VITE_API_URL to API_URL to match your definition above
      const response = await fetch(`${API_URL}/api/enquiry`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Server error. Check your Render logs (likely Gemini API or Email error).");
      }
    } catch (err) {
      console.error("Connection Error:", err);
      // FIX: Changed VITE_API_URL to API_URL here as well
      alert(`Failed to connect to backend at ${API_URL}`); 
    } finally {
      setLoading(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none invert" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/topography.png")` }}></div>

      <main className="relative z-10 px-[8%] py-12 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
          
          <div className="space-y-12">
            {!submitted ? (
              <div className="bg-white/[0.03] border border-white/10 p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                <div className="mb-10">
                  <h2 className="mb-3 text-5xl font-bold tracking-tight text-white">Send a Message</h2>
                  <div className="flex items-center gap-3 text-xl font-semibold text-orange-500">
                    <span className="relative flex w-4 h-4">
                      <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
                      <span className="relative inline-flex w-4 h-4 bg-orange-500 rounded-full"></span>
                    </span>
                    Real-time Support Active
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid gap-10 md:grid-cols-2">
                    <div className="space-y-4">
                      <label className="text-lg font-bold tracking-widest text-gray-400 uppercase">Full Name</label>
                      <input 
                        name="name"
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        autoCapitalize="none" 
                        placeholder="Enter your full name..." 
                        className="w-full p-6 text-2xl transition-all border outline-none bg-white/5 border-white/10 rounded-xl focus:border-orange-500 placeholder:text-gray-700" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-lg font-bold tracking-widest text-gray-400 uppercase">Enquiry Type</label>
                      <select 
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-6 text-2xl text-gray-400 transition-all border outline-none appearance-none bg-white/5 border-white/10 rounded-xl focus:border-orange-500"
                      >
                        <option value="General Inquiry" className="bg-[#020617]">General Inquiry</option>
                        <option value="Custom Package" className="bg-[#020617]">Custom Package</option>
                        <option value="Booking Issue" className="bg-[#020617]">Booking Issue</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-lg font-bold tracking-widest text-gray-400 uppercase">Email Address</label>
                    <input 
                      name="email"
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      autoCapitalize="none" 
                      autoCorrect="off"
                      placeholder="user@example.com" 
                      className="w-full p-6 text-2xl transition-all border outline-none bg-white/5 border-white/10 rounded-xl focus:border-orange-500 placeholder:text-gray-700" 
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-lg font-bold tracking-widest text-gray-400 uppercase">Your Message</label>
                    <textarea 
                      name="message"
                      rows="5" 
                      required 
                      value={formData.message}
                      onChange={handleChange}
                      autoCapitalize="none" 
                      placeholder="tell us about your plans..." 
                      className="w-full p-6 text-2xl transition-all border outline-none resize-none bg-white/5 border-white/10 rounded-xl focus:border-orange-500 placeholder:text-gray-700"
                    ></textarea>
                  </div>
                  
                  <button 
                    disabled={loading}
                    className={`w-full py-8 ${loading ? 'bg-gray-600' : 'bg-orange-600 hover:bg-orange-700'} text-white font-bold text-3xl rounded-2xl transition-all shadow-[0_15px_40px_rgba(234,88,12,0.4)] active:scale-[0.98]`}
                  >
                    {loading ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-20 bg-orange-600/5 border border-orange-500/20 rounded-[3rem] text-center space-y-8">
                <div className="flex items-center justify-center mx-auto mb-4 bg-orange-500 rounded-full shadow-lg w-28 h-28 shadow-orange-500/20">
                  <i className="text-6xl fas fa-check"></i>
                </div>
                <h2 className="text-5xl font-bold">Inquiry Sent!</h2>
                <p className="max-w-md mx-auto text-2xl leading-relaxed text-gray-300">Check your inbox. We've sent a notification to darklord8527789390@gmail.com.</p>
                <button onClick={() => setSubmitted(false)} className="text-xl font-bold text-orange-500 hover:underline underline-offset-4">Send another message</button>
              </div>
            )}

            {/* BRAND MOSAIC SECTION */}
            <div className="grid md:grid-cols-2 gap-6 h-[500px]">
              <div className="relative overflow-hidden group rounded-[2.5rem] border border-white/10 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop" className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110" alt="Himalayas" />
                <div className="absolute inset-0 flex items-end p-10 bg-gradient-to-t from-black/90 via-transparent to-transparent">
                  <div className="space-y-2">
                    <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">Headquarters</p>
                    <p className="text-4xl font-bold">Dehradun, UK</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-rows-2 gap-6">
                <div className="bg-orange-600 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-xl hover:-rotate-1 transition-transform">
                  <i className="mb-4 text-5xl fas fa-users"></i>
                  <p className="text-5xl italic font-black">10k+</p>
                  <p className="text-lg font-bold tracking-widest uppercase opacity-90">Explorers Joined</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center backdrop-blur-md hover:rotate-1 transition-transform">
                  <div className="flex mb-6 -space-x-5">
                    {[1,2,3,4].map(i => (
                      <img key={i} className="w-16 h-16 rounded-full border-4 border-[#020617] shadow-lg" src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    ))}
                    <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-sm font-black border-4 border-[#020617] shadow-lg">+2k</div>
                  </div>
                  <p className="text-2xl font-bold">Community Trust</p>
                  <p className="text-lg font-medium text-gray-500">Verified Local Guides</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12 lg:sticky lg:top-32">
            <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-14 flex flex-col items-center justify-center text-center shadow-2xl">
              <div className="w-full max-w-[380px] mb-10 drop-shadow-[0_0_50px_rgba(234,88,12,0.15)]">
                <Lottie options={defaultOptions} height={380} width={380} />
              </div>
              
              <div className="space-y-8">
                <h3 className="text-4xl font-bold tracking-tight">Direct Support</h3>
                <p className="max-w-xs mx-auto text-xl leading-relaxed text-gray-400">Click below to chat with us directly on your preferred platform.</p>
                <div className="flex justify-center gap-8 pt-6">
                  <a href="https://www.instagram.com/targaryen_starks/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-16 h-16 transition-all border shadow-2xl rounded-2xl bg-white/5 border-white/10 hover:bg-[#E1306C] group">
                    <i className="text-3xl transition-transform fab fa-instagram group-hover:scale-110"></i>
                  </a>
                  <a href="https://t.me/SwadeshiTravelbot" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-16 h-16 transition-all border shadow-2xl rounded-2xl bg-white/5 border-white/10 hover:bg-[#0088cc] group">
                    <i className="text-3xl transition-transform fab fa-telegram-plane group-hover:scale-110"></i>
                  </a>
                  <a href="https://wa.me/918851114020" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-16 h-16 transition-all border shadow-2xl rounded-2xl bg-white/5 border-white/10 hover:bg-[#25D366] group">
                    <i className="text-3xl transition-transform fab fa-whatsapp group-hover:scale-110"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex items-center gap-8 group hover:border-orange-500/40 transition-all shadow-2xl">
                <div className="flex items-center justify-center w-20 h-20 text-orange-500 transition-all bg-orange-500/10 rounded-2xl group-hover:bg-orange-500 group-hover:text-white">
                  <i className="text-3xl fas fa-phone-alt"></i>
                </div>
                <div>
                  <p className="text-sm uppercase font-black text-gray-600 tracking-[0.3em] mb-1">Phone</p>
                  <p className="text-3xl font-bold tracking-tight text-white">+91 88511 14020</p>
                </div>
              </div>
              <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[2.5rem] flex items-center gap-8 group hover:border-orange-500/40 transition-all shadow-2xl">
                <div className="flex items-center justify-center w-20 h-20 text-orange-500 transition-all bg-orange-500/10 rounded-2xl group-hover:bg-orange-500 group-hover:text-white">
                  <i className="text-3xl fas fa-envelope"></i>
                </div>
                <div>
                  <p className="text-sm uppercase font-black text-gray-600 tracking-[0.3em] mb-1">Email</p>
                  <p className="text-3xl font-bold tracking-tight text-white">support@bharattrails.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;