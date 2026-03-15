import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaSeedling, FaHome, FaPlane, FaCalendarCheck, FaArrowRight, FaTimes, FaShieldAlt, FaLock, FaUserShield, FaCookie, FaEnvelope } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData3 from '../assets/Man.json';
import animationData2 from '../assets/Traveler.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaFileContract, FaChild, FaGlobe, FaBan } from 'react-icons/fa';
gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activePolicy, setActivePolicy] = useState(null);

  const operations = [
    {
      icon: <FaCalendarCheck size={36} />,
      title: "Booking Process",
      color: "from-orange-500 to-orange-600",
      border: "border-orange-500/30",
      glow: "shadow-orange-500/20",
      description: "Customers browse our curated packages, fill a detailed manifest form, and receive instant email confirmation with full breakdown of their expedition. Every booking is secured and confirmed within minutes.",
      steps: ["Browse Packages", "Fill Manifest Form", "Execute Payment", "Receive Confirmation", "Email Dispatch", "Trip Activation"]
    },
    {
      icon: <FaUsers size={36} />,
      title: "Local Guides",
      color: "from-blue-500 to-blue-600",
      border: "border-blue-500/30",
      glow: "shadow-blue-500/20",
      description: "We partner with certified local guides who know every trail, temple and hidden gem. 25% of every booking goes directly to guide fees, ensuring fair compensation and motivation.",
      steps: ["Guide Verification", "Route Planning", "Safety Briefing", "On-Ground Support", "Cultural Training", "Post-Trip Feedback"]
    },
    {
      icon: <FaSeedling size={36} />,
      title: "Farmers & Food",
      color: "from-green-500 to-green-600",
      border: "border-green-500/30",
      glow: "shadow-green-500/20",
      description: "20% of every booking supports local farmers who provide fresh, organic meals during expeditions — keeping the entire economy local and sustainable for future generations.",
      steps: ["Farm Partnership", "Organic Sourcing", "Meal Preparation", "Zero Waste Policy", "Seasonal Menus", "Direct Payment"]
    },
    {
      icon: <FaHome size={36} />,
      title: "Homestays",
      color: "from-purple-500 to-purple-600",
      border: "border-purple-500/30",
      glow: "shadow-purple-500/20",
      description: "40% of every booking funds verified homestays — real village homes converted into cozy stays that give travelers an authentic cultural experience unlike any hotel.",
      steps: ["Homestay Inspection", "Family Onboarding", "Quality Standards", "Guest Experience", "Safety Audit", "Review Collection"]
    },
    {
      icon: <FaPlane size={36} />,
      title: "Flight & Travel",
      color: "from-cyan-500 to-cyan-600",
      border: "border-cyan-500/30",
      glow: "shadow-cyan-500/20",
      description: "Optional aerial transit and private fleet services are available as add-ons during booking — making us a one-stop travel solution for both domestic and international travelers.",
      steps: ["Flight Booking", "Airport Pickup", "Private Fleet", "Luggage Support", "Travel Insurance", "Return Drop"]
    },
    {
      icon: <FaMapMarkerAlt size={36} />,
      title: "On-Ground Ops",
      color: "from-red-500 to-red-600",
      border: "border-red-500/30",
      glow: "shadow-red-500/20",
      description: "Our operations team coordinates every aspect of the trip in real time — from route changes to emergency support — ensuring zero stress and maximum safety for all travelers.",
      steps: ["Real-time Tracking", "Emergency Support", "Route Optimization", "Post-Trip Review", "Medical Backup", "24/7 Helpline"]
    }
  ];

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1585504198199-20277593b94f?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1502786129293-79981df4e689?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800"},
    { url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800"}
  ];

  const stats = [
    { number: "10,000+", label: "Happy Explorers" },
    { number: "50+", label: "Destinations" },
    { number: "200+", label: "Local Partners" },
    { number: "₹2Cr+", label: "Community Impact" },
  ];

  const policies = [
    {
      icon: <FaUserShield size={28} />,
      title: "Data Collection",
      color: "from-orange-500 to-orange-600",
      content: "We collect only the information necessary to process your bookings — including your name, email, phone number, age, city, state and pincode. This data is used exclusively for booking confirmation, email receipts and trip coordination. We never sell your personal data to third parties."
    },
    {
      icon: <FaLock size={28} />,
      title: "Data Security",
      color: "from-blue-500 to-blue-600",
      content: "All booking data is encrypted and stored securely in MongoDB Atlas with industry-standard security protocols. Your Clerk authentication credentials are managed by Clerk.dev — a trusted identity platform. We use HTTPS across all our services to ensure your data is always protected in transit."
    },
    {
      icon: <FaShieldAlt size={28} />,
      title: "Your Rights",
      color: "from-green-500 to-green-600",
      content: "You have the right to access, modify or delete your personal data at any time. You can contact us at support@bharattrails.com to request data deletion. We respect your right to privacy and will process all requests within 7 business days."
    },
    {
      icon: <FaCookie size={28} />,
      title: "Cookies & Storage",
      color: "from-purple-500 to-purple-600",
      content: "We use localStorage to store your active booking manifest and expedition history for a seamless experience across sessions. No third-party tracking cookies are used. Our authentication provider Clerk may use essential cookies for session management only."
    },
    {
      icon: <FaEnvelope size={28} />,
      title: "Communications",
      color: "from-cyan-500 to-cyan-600",
      content: "By making a booking, you consent to receive booking confirmation emails and trip-related communications via Resend. You may also receive support responses via WhatsApp or Telegram if you initiate contact through those channels. You can opt out of non-essential communications at any time."
    },
    {
      icon: <FaMapMarkerAlt size={28} />,
      title: "Third Party Services",
      color: "from-red-500 to-red-600",
      content: "We integrate with Clerk (authentication), Resend (email), MongoDB Atlas (database), Unsplash (destination images), Wikipedia (destination info), and Telegram (AI support bot). Each of these services operates under their own privacy policies. We only share the minimum data required for each service to function."
    },
    {
        icon: <FaFileContract size={28} />,
        title: "Terms of Service",
        color: "from-yellow-500 to-yellow-600",
        content: "By using Bharat Trails, you agree to our terms of service. You must be 18 or older to make a booking. All bookings are subject to availability and confirmation. Cancellations must be made at least 7 days before the travel date for a full refund. Bharat Trails reserves the right to modify or cancel trips due to unforeseen circumstances."
      },
      {
        icon: <FaChild size={28} />,
        title: "Minor Policy",
        color: "from-pink-500 to-pink-600",
        content: "Travelers under the age of 18 must be accompanied by a parent or legal guardian. For group bookings involving minors, a signed consent form is required at the time of booking. We take child safety seriously and all our local guides are background verified."
      },
      {
        icon: <FaGlobe size={28} />,
        title: "International Travelers",
        color: "from-indigo-500 to-indigo-600",
        content: "International travelers are responsible for obtaining valid visas, travel insurance and any required documentation before arrival. Bharat Trails is not liable for denied entry or visa rejections. We recommend purchasing comprehensive travel insurance that covers medical emergencies, trip cancellations and lost luggage."
      },
      {
        icon: <FaBan size={28} />,
        title: "Prohibited Activities",
        color: "from-rose-500 to-rose-600",
        content: "Users are strictly prohibited from sharing false information during booking, misusing our platform for fraudulent transactions, or engaging in any activity that harms our local partners, guides or homestay families. Any violation will result in immediate account termination and legal action if necessary. We reserve the right to refuse service to anyone who violates these guidelines."
      }
  ];

  useGSAP(() => {
    gsap.utils.toArray('.timeline-card').forEach((card, i) => {
      gsap.from(card, {
        xPercent: i % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        }
      });
    });

    gsap.to('.timeline-line-fill', {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    gsap.utils.toArray('.policy-card').forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans px-[5%] py-8 pt-0">

      {/* HERO */}
      <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600"
            className="object-cover w-full h-full opacity-30" alt="hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617]"></div>
        </div>
        <div className="relative z-10 text-center px-[5%] space-y-8 py-20">
          <div className="flex justify-center gap-3 mb-6">
            {["A","B","O","U","T","U","S"].map((letter, i) => (
              <span key={i} className={`flex items-center justify-center w-14 h-14 text-2xl font-black rounded-2xl shadow-lg transition-all hover:-translate-y-2
                ${i % 2 === 0 ? 'bg-orange-600 text-white shadow-orange-500/30' : 'bg-white/10 text-white border border-white/20'}`}>
                {letter}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-bold tracking-[0.3em] text-orange-400 uppercase">How We Operate</h2>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-300">
            Behind every expedition is a carefully orchestrated system of local guides, farmers, homestays and technology — all working together to create unforgettable journeys.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="px-[5%] py-8 pt-0">
        <div className="grid max-w-5xl grid-cols-2 gap-6 mx-auto md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="group text-center p-8 rounded-[2rem] border border-white/10 bg-white/5 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10">
              <p className="text-5xl font-black text-orange-500 transition-transform group-hover:scale-110">{stat.number}</p>
              <p className="mt-2 text-lg font-bold tracking-widest text-gray-400 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS - TIMELINE */}
      <div className="px-[5%] py-20">
        <div className="mb-20 space-y-4 text-center">
          <p className="text-6xl font-black tracking-[0.1em] text-orange-500 uppercase">Our System</p>
          <h2 className="text-6xl font-black tracking-tighter text-white">How It <span className="text-orange-500">Works</span></h2>
          <p className="max-w-2xl mx-auto text-3xl text-gray-400">Every rupee you spend is distributed transparently across our local ecosystem</p>
        </div>

        <div className="flex items-start gap-6 max-w-[1500px] mx-auto">

          

          {/* TIMELINE */}
          <div className="relative flex-1 timeline-container">
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
              <div className="w-full h-full origin-top scale-y-0 timeline-line-fill bg-gradient-to-b from-orange-500 via-blue-500 via-green-500 via-purple-500 to-red-500"></div>
            </div>

            <div className="space-y-16">
              {operations.map((op, i) => (
                <div key={i} className={`timeline-card flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>

                  {/* CARD */}
                  <div className={`flex-1 group relative p-10 rounded-[2.5rem] border ${op.border} bg-white/5 hover:bg-white/[0.08] hover:shadow-2xl ${op.glow} transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${op.color} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                    <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${op.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full`}></div>

                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${op.color} text-white shadow-lg mb-8`}>
                      {op.icon}
                    </div>

                    <h3 className="mb-4 text-4xl font-black text-white">{op.title}</h3>
                    <p className="mb-8 text-2xl leading-relaxed text-gray-400">{op.description}</p>

                    <div className="grid grid-cols-2 gap-3">
                      {op.steps.map((step, j) => (
                        <div key={j} className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10`}>
                          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${op.color} flex items-center justify-center text-xs font-black text-white flex-shrink-0`}>{j+1}</div>
                          <span className="text-base text-xl font-bold text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CENTER DOT */}
                  <div className="relative z-10 flex flex-col items-center flex-shrink-0 gap-2">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${op.color} shadow-xl border-4 border-[#020617] flex items-center justify-center text-white font-black text-2xl`}>{i+1}</div>
                  </div>

                  {/* EMPTY SIDE */}
                  <div className="flex-1"></div>

                </div>
              ))}
            </div>
          </div>

          

        </div>
      </div>

      {/* MONEY FLOW */}
<div className="px-[5%] py-20 bg-white/[0.02] border-y border-white/5">
  <div className="mb-16 space-y-4 text-center">
    <p className="text-6xl font-black tracking-[0.1em] text-orange-500 uppercase">Transparency</p>
    <h2 className="text-6xl font-black tracking-tighter text-white">Where Your <span className="text-orange-500">Money Goes</span></h2>
  </div>

  <div className="grid w-full gap-8 md:grid-cols-2 xl:grid-cols-4">
    {[
      { pct: "40%", label: "Homestay Support", color: "bg-orange-500", border: "border-orange-500/30", glow: "hover:shadow-orange-500/20", desc: "Village families receive the largest share to maintain and improve their homes for guests. This directly funds better beds, cleaner facilities and warmer hospitality." },
      { pct: "25%", label: "Local Guides", color: "bg-blue-500", border: "border-blue-500/30", glow: "hover:shadow-blue-500/20", desc: "Expert local navigators who know every trail, temple and hidden cultural gem. Fair wages ensure the best guides stay with us long term." },
      { pct: "20%", label: "Farmers & Food", color: "bg-green-500", border: "border-green-500/30", glow: "hover:shadow-green-500/20", desc: "Fresh organic produce sourced directly from local farms for every expedition. Supporting agriculture keeps village economies alive and thriving." },
      { pct: "15%", label: "Platform Fee", color: "bg-purple-500", border: "border-purple-500/30", glow: "hover:shadow-purple-500/20", desc: "Covers technology, operations, customer support and platform maintenance. This keeps Bharat Trails running smoothly for every explorer." },
    ].map((item, i) => (
      <div key={i} className={`group relative text-center space-y-6 p-10 rounded-[2.5rem] border ${item.border} bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${item.glow} overflow-hidden`}>
        
        {/* Ambient glow */}
        <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 ${item.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full`}></div>

        {/* Big percentage circle */}
        <div className={`w-36 h-36 ${item.color} rounded-full flex items-center justify-center mx-auto text-5xl font-black text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
          {item.pct}
        </div>

        <div className="space-y-3">
          <p className="text-4xl font-black text-white">{item.label}</p>
          <div className={`w-12 h-1 ${item.color} rounded-full mx-auto`}></div>
          <p className="text-2xl leading-relaxed text-gray-400">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* PHOTO GALLERY */}
      <div className="px-[5%] py-20">
        <div className="mb-16 space-y-4 text-center">
          <p className="text-6xl font-black tracking-[0.1em] text-orange-500 uppercase">Visual Stories</p>
          <h2 className="text-6xl font-black tracking-tighter text-white">From Our <span className="text-orange-500">Expeditions</span></h2>
          <p className="max-w-2xl mx-auto text-2xl text-gray-400">Real moments captured across our destinations — click any image to view full screen</p>
        </div>

        <div className="flex items-start gap-8 max-w-[1500px] mx-auto">

          {/* LEFT LOTTIE */}
<div className="sticky flex-col items-center self-start flex-shrink-0 hidden gap-4 xl:flex w-96 top-32">
  <div className="flex flex-col items-center w-full p-6  rounded-3xl bg-[#020617]">
    <Lottie animationData={animationData2} loop={true} style={{ width: '300px', height: '300px' }} />
  </div>
</div>

          {/* GRID */}
          <div className="grid flex-1 grid-cols-2 gap-3 mx-auto md:grid-cols-5">
  {galleryImages.map((img, i) => (
    <div key={i}
      onClick={() => setSelectedImage(img)}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${i === 0 || i === 5 || i === 10 ? 'md:col-span-2' : ''}`}>
                <img src={img.url} alt={img.caption}
                  className="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-end p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:opacity-100">
                  <div>
                    <p className="text-base font-black text-white">{img.caption}</p>
                    <p className="text-xs font-bold tracking-widest text-orange-400 uppercase">View Full</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT LOTTIE */}
<div className="sticky flex-col items-center self-start flex-shrink-0 hidden gap-4 xl:flex w-96 top-32">
  <div className="flex flex-col items-center w-full p-6 rounded-3xl bg-[#020617]">
    <Lottie animationData={animationData3} loop={true} style={{ width: '300px', height: '300px' }} />
    
  </div>
</div>

        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90" onClick={() => setSelectedImage(null)}>
          <button className="absolute text-white transition-colors top-8 right-8 hover:text-orange-500">
            <FaTimes size={32} />
          </button>
          <img src={selectedImage.url} alt={selectedImage.caption}
            className="max-w-4xl max-h-[80vh] w-full object-contain rounded-3xl shadow-2xl" />
          <p className="absolute text-2xl font-black text-white bottom-10">{selectedImage.caption}</p>
        </div>
      )}

      {/* PRIVACY POLICY */}
      <div className="px-[5%] py-20 bg-white/[0.02] border-t border-white/5">
        <div className="mb-16 space-y-4 text-center">
          <p className="text-6xl font-black tracking-[0.1em] text-orange-500 uppercase">Legal</p>
          <h2 className="text-6xl font-black tracking-tighter text-white">Privacy <span className="text-orange-500">Policy</span></h2>
          <p className="max-w-2xl mx-auto text-2xl text-gray-400">Last updated: March 2026 — We are committed to protecting your privacy and being transparent about how we use your data.</p>
        </div>

        <div className="flex items-start gap-8 max-w-[1400px] mx-auto">

          

          {/* POLICY CARDS */}
          {/* POLICY CARDS */}
<div className="grid flex-1 gap-6 md:grid-cols-2">
  {policies.map((policy, i) => (
    <div key={i} className={`policy-card group relative p-10 rounded-[2.5rem] border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all duration-300 overflow-hidden hover:-translate-y-2`}>

      {/* Top accent */}
      <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${policy.color} opacity-40 group-hover:opacity-100 transition-opacity`}></div>

      {/* Ambient glow */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${policy.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full`}></div>

      {/* Header */}
      <div className="flex items-center gap-5 mb-6">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${policy.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
          {policy.icon}
        </div>
        <h3 className="text-3xl font-black text-white">{policy.title}</h3>
      </div>

      {/* Divider */}
      <div className={`w-full h-px bg-gradient-to-r ${policy.color} opacity-20 mb-6`}></div>

      {/* Content — always visible */}
      <p className="text-2xl leading-relaxed text-gray-400">{policy.content}</p>

      {/* Bottom tag */}
      <div className="flex items-center gap-2 mt-6">
        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${policy.color}`}></div>
        <p className="text-xl font-black tracking-widest text-gray-600 uppercase">Bharat Trails Policy</p>
      </div>
    </div>
  ))}
</div>
</div>{/* closes flex items-start */}

        {/* Contact for privacy */}
        <div className="max-w-2xl mx-auto mt-16 text-center p-10 rounded-[2rem] border border-white/10 bg-white/5">
          <FaEnvelope className="mx-auto mb-4 text-orange-500" size={48} />
          <h3 className="mb-2 text-4xl font-black text-white">Privacy Concerns?</h3>
          <p className="mb-6 text-2xl text-gray-400">Contact our data protection team directly at</p>
          <a href="mailto:support@bharattrails.com" className="text-2xl font-black text-orange-500 hover:underline">support@bharattrails.com</a>
        </div>
      </div>

      {/* CTA */}
      <div className="px-[5%] py-20 text-center space-y-8">
        <h2 className="text-6xl font-black tracking-tighter">Ready to <span className="text-orange-500">Explore?</span></h2>
        <p className="max-w-xl mx-auto text-2xl text-gray-400">Join thousands of explorers who have already discovered the magic of Bharat Trails.</p>
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => navigate('/book')}
            className="inline-flex items-center gap-4 px-16 py-8 text-2xl font-black text-white transition-all duration-300 bg-orange-600 shadow-2xl group rounded-2xl hover:bg-white hover:text-orange-600 shadow-orange-500/30 active:scale-95">
            Start Your Expedition
            <FaArrowRight className="transition-transform group-hover:translate-x-2" />
          </button>
          <button onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-4 px-16 py-8 text-2xl font-black text-white transition-all duration-300 border-2 border-white/20 rounded-2xl hover:border-orange-500 hover:text-orange-500 active:scale-95">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;