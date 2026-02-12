import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilter, FaSearch, FaMapMarkerAlt, FaStar, FaGlobeAmericas, FaPlane } from "react-icons/fa";

const UNSPLASH_KEY = "3YqgeNBUUUQ2wMEY4zQUcwN-zyjxwxiv7HyOWcPXV48";

const Booking = ({ onOpenBookForm }) => {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPrice, setFilterPrice] = useState(300000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  // 1. COMPREHENSIVE DATASET: All Indian States + 20 Global Countries
  const defaultDestinations = [
    // --- SWADESHI (1 Place from Every State/UT) ---
    { name: "Leh", price: 15000, rating: 5, category: "Swadeshi" },
    { name: "Srinagar", price: 12000, rating: 5, category: "Swadeshi" },
    { name: "Manali", price: 8000, rating: 4, category: "Swadeshi" },
    { name: "Rishikesh", price: 3200, rating: 5, category: "Swadeshi" },
    { name: "Amritsar", price: 4500, rating: 5, category: "Swadeshi" },
    { name: "Jaipur", price: 6500, rating: 4, category: "Swadeshi" },
    { name: "Varanasi", price: 3500, rating: 5, category: "Swadeshi" },
    { name: "Patna", price: 2500, rating: 3, category: "Swadeshi" },
    { name: "Gangtok", price: 9500, rating: 5, category: "Swadeshi" },
    { name: "Tawang", price: 11000, rating: 5, category: "Swadeshi" },
    { name: "Shillong", price: 8500, rating: 4, category: "Swadeshi" },
    { name: "Kohima", price: 7500, rating: 4, category: "Swadeshi" },
    { name: "Imphal", price: 7000, rating: 4, category: "Swadeshi" },
    { name: "Aizawl", price: 6800, rating: 4, category: "Swadeshi" },
    { name: "Agartala", price: 6000, rating: 3, category: "Swadeshi" },
    { name: "Kolkata", price: 5000, rating: 4, category: "Swadeshi" },
    { name: "Bhubaneswar", price: 4800, rating: 4, category: "Swadeshi" },
    { name: "Raipur", price: 4200, rating: 3, category: "Swadeshi" },
    { name: "Ranchi", price: 4000, rating: 3, category: "Swadeshi" },
    { name: "Bhopal", price: 4500, rating: 4, category: "Swadeshi" },
    { name: "Ahmedabad", price: 5500, rating: 4, category: "Swadeshi" },
    { name: "Mumbai", price: 9000, rating: 5, category: "Swadeshi" },
    { name: "Panaji", price: 12000, rating: 5, category: "Swadeshi" },
    { name: "Hyderabad", price: 7000, rating: 4, category: "Swadeshi" },
    { name: "Bengaluru", price: 8000, rating: 4, category: "Swadeshi" },
    { name: "Chennai", price: 6500, rating: 4, category: "Swadeshi" },
    { name: "Kochi", price: 10000, rating: 5, category: "Swadeshi" },
    { name: "Amaravati", price: 5800, rating: 3, category: "Swadeshi" },
    { name: "Port Blair", price: 18000, rating: 5, category: "Swadeshi" },
    { name: "Puducherry", price: 7000, rating: 4, category: "Swadeshi" },

    // --- INTERNATIONAL (20 Foreign Countries) ---
    { name: "Paris", price: 185000, rating: 5, category: "International" },
    { name: "Bangkok", price: 45000, rating: 4, category: "International" },
    { name: "Tokyo", price: 210000, rating: 5, category: "International" },
    { name: "Dubai", price: 65000, rating: 5, category: "International" },
    { name: "Singapore", price: 75000, rating: 4, category: "International" },
    { name: "Bali", price: 55000, rating: 5, category: "International" },
    { name: "London", price: 195000, rating: 5, category: "International" },
    { name: "New York City", price: 250000, rating: 5, category: "International" },
    { name: "Sydney", price: 180000, rating: 4, category: "International" },
    { name: "Rome", price: 165000, rating: 5, category: "International" },
    { name: "Amsterdam", price: 175000, rating: 4, category: "International" },
    { name: "Barcelona", price: 160000, rating: 4, category: "International" },
    { name: "Phuket", price: 42000, rating: 4, category: "International" },
    { name: "Cape Town", price: 140000, rating: 4, category: "International" },
    { name: "Moscow", price: 120000, rating: 4, category: "International" },
    { name: "Istanbul", price: 95000, rating: 4, category: "International" },
    { name: "Athens", price: 155000, rating: 4, category: "International" },
    { name: "Male", price: 85000, rating: 5, category: "International" },
    { name: "Cairo", price: 110000, rating: 3, category: "International" },
    { name: "Seoul", price: 135000, rating: 5, category: "International" }
  ];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    // Fetch only a subset or all depending on performance; here we do all
    const results = await Promise.all(
      defaultDestinations.map(async (dest) => {
        const img = await fetchImage(dest.name);
        const desc = await fetchWikiSummary(dest.name);
        return { ...dest, image: img, description: desc.extract };
      })
    );
    setLocations(results);
    setLoading(false);
  };

  const fetchImage = async (query) => {
    try {
      const res = await axios.get(`https://api.unsplash.com/search/photos?query=${query}+tourism&client_id=${UNSPLASH_KEY}&per_page=1`);
      return res.data.results[0]?.urls?.regular;
    } catch (err) { return "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1000"; }
  };

  const fetchWikiSummary = async (city) => {
    try {
      const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`);
      return {
        extract: res.data.extract || `Discover the culture of ${city}.`,
        fullText: res.data.extract ? res.data.extract.toLowerCase() : ""
      };
    } catch (err) { return { extract: "Explore this destination with Bharat Trails.", fullText: "" }; }
  };

  const handleDynamicSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    const existing = locations.find(l => l.name.toLowerCase() === query.toLowerCase());
    if (existing) return;

    setLoading(true);
    try {
      const img = await fetchImage(query);
      const wiki = await fetchWikiSummary(query);
      const isInternational = !wiki.fullText.includes("india");
      
      const finalPrice = isInternational 
        ? Math.floor(Math.random() * (250000 - 85000 + 1)) + 85000  
        : Math.floor(Math.random() * (20000 - 4000 + 1)) + 4000;    

      const newDest = {
        id: Date.now(),
        name: query.charAt(0).toUpperCase() + query.slice(1),
        price: finalPrice,
        rating: 4 + Math.floor(Math.random() * 2),
        image: img,
        description: wiki.extract,
        category: isInternational ? "International" : "Swadeshi"
      };

      setLocations([newDest, ...locations]);
    } catch (error) { console.error("Search error:", error); }
    setLoading(false);
  };

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    loc.price <= filterPrice &&
    (selectedRating === 0 || loc.rating >= selectedRating) &&
    (selectedCategory === "All" || loc.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-36 px-[5%] pb-20 font-sans">
      <div className="max-w-[1500px] mx-auto">
        
        <div className="flex flex-col items-center gap-8 mb-16 text-center">
          <div className="space-y-2">
            <h1 className="text-6xl font-black tracking-tight text-slate-800">Explore <span className="text-orange-600">Bharat</span></h1>
            <p className="text-xl italic font-medium text-slate-500">The Ultimate Hub for Swadeshi & Global Exploration</p>
          </div>
          
          <form onSubmit={handleDynamicSearch} className="relative w-full max-w-2xl group">
            <input 
              type="text" 
              placeholder="Enter any city (e.g. Goa, Paris, Tokyo)..." 
              className="w-full p-6 pl-16 text-xl lowercase transition-all border-none shadow-2xl outline-none rounded-3xl focus:ring-4 focus:ring-orange-500/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute text-2xl text-orange-600 transition-transform -translate-y-1/2 left-6 top-1/2" />
            <button type="submit" className="absolute px-6 py-2 font-bold text-white transition-colors -translate-y-1/2 bg-orange-600 right-4 top-1/2 rounded-2xl hover:bg-slate-900">
              Find
            </button>
          </form>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-12">
          
          <aside className="bg-white p-10 rounded-[2.5rem] shadow-md border border-slate-100 h-fit sticky top-32">
            <div className="flex items-center gap-3 mb-10 text-orange-600">
              <FaFilter size={20} />
              <h2 className="text-2xl font-bold tracking-widest uppercase text-slate-800">Filters</h2>
            </div>
            
            <div className="space-y-12">
              <div>
                <label className="block mb-6 text-sm font-black uppercase text-slate-400">Trip Category</label>
                <div className="space-y-4">
                  {["All", "Swadeshi", "International"].map((cat) => (
                    <label key={cat} className="flex items-center gap-4 cursor-pointer group">
                      <input 
                        type="radio" name="category" checked={selectedCategory === cat}
                        className="w-5 h-5 accent-orange-600"
                        onChange={() => setSelectedCategory(cat)} 
                      />
                      <span className={`text-base font-bold ${selectedCategory === cat ? 'text-orange-600' : 'text-slate-600'}`}>
                        {cat === "All" ? "All Trips" : cat === "Swadeshi" ? "🇮🇳 Swadeshi" : "🌎 Global"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-6 text-sm font-black uppercase text-slate-400">Max Budget: <span className="text-lg text-orange-600">₹{filterPrice.toLocaleString('en-IN')}</span></label>
                <input 
                  type="range" min="2000" max="300000" step="5000" value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-slate-100 accent-orange-600"
                />
              </div>

              <div>
                <label className="block mb-6 text-sm font-black uppercase text-slate-400">Min Rating</label>
                <div className="space-y-4">
                  {[5, 4, 3].map(star => (
                    <label key={star} className="flex items-center gap-4 cursor-pointer group">
                      <input type="radio" name="rating" className="w-5 h-5 accent-orange-600" onChange={() => setSelectedRating(star)} />
                      <span className="flex gap-1 text-orange-400">
                        {[...Array(star)].map((_, i) => <FaStar key={i} size={16} />)}
                        <span className="ml-1 text-sm font-bold text-slate-600">& Up</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="grid gap-10 md:grid-cols-2">
            {loading && <div className="col-span-2 text-2xl font-bold text-center text-orange-600 animate-pulse">Syncing Swadeshi & Global data...</div>}
            
            {!loading && filteredLocations.map((loc, index) => (
              <div key={index} className="bg-white rounded-[3rem] overflow-hidden border border-slate-50 shadow-sm hover:shadow-2xl transition-all duration-500 group relative">
                <div className="relative overflow-hidden h-72">
                  <img src={loc.image} alt={loc.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute top-6 right-6 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${loc.category === 'International' ? 'bg-blue-600' : 'bg-orange-600'}`}>
                    {loc.category === 'International' ? <FaGlobeAmericas className="inline mr-1"/> : <FaPlane className="inline mr-1"/>}
                    {loc.category}
                  </div>
                  <div className="absolute flex items-center gap-2 px-5 py-3 font-bold text-orange-600 shadow-lg top-8 left-8 bg-white/95 backdrop-blur-md rounded-2xl">
                    <FaMapMarkerAlt /> {loc.name}
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-black capitalize text-slate-800">{loc.name}</h3>
                      <div className="flex gap-1 mt-2">
                        {[...Array(loc.rating)].map((_, i) => <FaStar key={i} size={14} className="text-orange-400" />)}
                      </div>
                    </div>
                    <div className="font-black text-right">
                      <span className="block mb-1 text-xs tracking-widest uppercase text-slate-400">Full Trip</span>
                      <span className="text-3xl text-orange-600">₹{loc.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="mb-10 text-lg italic font-medium leading-relaxed lowercase text-slate-500 line-clamp-3">
                    {loc.description}
                  </p>

                  <button onClick={() => onOpenBookForm(loc)} className="w-full py-5 text-xl font-bold text-white transition-all bg-orange-600 shadow-lg rounded-2xl shadow-orange-600/20 hover:bg-orange-700 active:scale-95">
                     Book Now
                  </button>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Booking;