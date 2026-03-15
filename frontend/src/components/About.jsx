import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { 
  FaUniversity, FaMapMarkerAlt, FaShieldAlt, FaLeaf, FaCompass, FaArrowRight 
} from 'react-icons/fa';

const About = () => {

  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id || 'guest';
  const [activeTrip, setActiveTrip] = useState(null);
  const [district, setDistrict] = useState("District");
  const [nearbyDistricts, setNearbyDistricts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const generateTxn = () =>
    "TXN" + Math.floor(100000 + Math.random() * 900000);

  const destinationMap = {
    Rishikesh: { district: "Dehradun", nearby: ["Tehri Garhwal", "Haridwar"] },
    Srinagar: { district: "Srinagar", nearby: ["Baramulla", "Anantnag"] },
    Manali: { district: "Kullu", nearby: ["Mandi", "Lahaul and Spiti"] },
    Jaipur: { district: "Jaipur", nearby: ["Ajmer", "Alwar"] },
    Varanasi: { district: "Varanasi", nearby: ["Mirzapur", "Jaunpur"] },
    Khajuraho: { district: "Chhatarpur", nearby: ["Panna", "Satna"] },
    Mumbai: { district: "Mumbai", nearby: ["Thane", "Raigad"] },
    Panaji: { district: "North Goa", nearby: ["South Goa", "Sindhudurg"] },
    Ahmedabad: { district: "Ahmedabad", nearby: ["Gandhinagar", "Kheda"] },
    Hampi: { district: "Vijayanagara", nearby: ["Ballari", "Koppal"] },
    Kochi: { district: "Ernakulam", nearby: ["Alappuzha", "Thrissur"] },
    Ooty: { district: "Nilgiris", nearby: ["Coimbatore", "Erode"] },
    Hyderabad: { district: "Hyderabad", nearby: ["Ranga Reddy", "Medchal"] },
    Tirupati: { district: "Chittoor", nearby: ["Kadapa", "Nellore"] },
    Kolkata: { district: "Kolkata", nearby: ["Howrah", "North 24 Parganas"] },
    Puri: { district: "Puri", nearby: ["Khordha", "Jagatsinghpur"] },
    Guwahati: { district: "Kamrup Metropolitan", nearby: ["Kamrup Rural", "Nalbari"] },
    Shillong: { district: "East Khasi Hills", nearby: ["Ri-Bhoi", "West Khasi Hills"] },
    Gangtok: { district: "East Sikkim", nearby: ["South Sikkim", "West Sikkim"] }
  };

  useEffect(() => {

    const savedTrip = localStorage.getItem(`activeManifest_${userId}`);
    const allTrips = JSON.parse(localStorage.getItem(`tripHistory_${userId}`) || '[]');
  
    if (savedTrip) {
      const tripData = JSON.parse(savedTrip);
      setActiveTrip(tripData);
  
      const destination = tripData.tripName || tripData.destination || "Rishikesh";
      const locationData = destinationMap[destination];
  
      if (locationData) {
        setDistrict(locationData.district);
        setNearbyDistricts([
          locationData.district,
          locationData.nearby[0],
          locationData.nearby[1]
        ]);
      }
    }
  
    // Build transactions from ALL trips in history
    const allTransactions = allTrips.flatMap((trip) => {
      const dest = trip.tripName || trip.destination || "Rishikesh";
      const locData = destinationMap[dest];
      if (!locData) return [];
  
      const districts = [
        locData.district,
        locData.nearby[0],
        locData.nearby[1]
      ];
  
      const b = trip.breakdown || { homestay: 0, guide: 0, farmers: 0 };
  
      return [
        { id: generateTxn(), trip: dest, recipient: `${districts[0]} Homestays`, amount: b.homestay, status: "Completed" },
        { id: generateTxn(), trip: dest, recipient: `${districts[1]} Farmers`, amount: b.farmers, status: "Completed" },
        { id: generateTxn(), trip: dest, recipient: `${districts[2]} Guides`, amount: b.guide, status: "Completed" },
      ];
    });
  
    setTransactions(allTransactions);
  
  }, [userId]);

  const breakdown =
    activeTrip?.breakdown || { homestay: 0, guide: 0, farmers: 0, platform: 0 };

  return (

    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pt-20">

      <header className="sticky z-50 flex items-center justify-between px-12 py-10 border-b top-24 border-white/5 bg-black/50 ">

        <div>
          <p className="text-xl font-black uppercase tracking-[0.5em] text-orange-500">
            Automated Community Ledger
          </p>
          <h1 className="text-5xl italic font-black tracking-tighter uppercase">
            Impact Dashboard
          </h1>
        </div>

        <button
          onClick={() => navigate('/')}
          className="p-5 transition-all rounded-full bg-white/5 hover:bg-orange-600"
        >
          <FaArrowRight className="text-2xl rotate-180" />
        </button>

      </header>


      <main className="p-12 mx-auto space-y-24 max-w-7xl">

        {/* DESTINATION */}
        <section className="grid items-center gap-20 lg:grid-cols-2">

          <div className="space-y-8">
            <h2 className="font-black leading-none tracking-tighter uppercase text-7xl">
              Community <br />
              <span className="text-orange-600 underline decoration-white/10 underline-offset-8">
                Disbursement.
              </span>
            </h2>
            <p className="text-2xl text-slate-400">
              Gramyatra dynamically identifies the{" "}
              <span className="font-bold text-white">{district}</span>{" "}
              node to ensure localized fund injection.
            </p>
          </div>

          <div className="bg-orange-600 p-16 rounded-[4rem] rotate-2 shadow-2xl text-center">
            <FaUniversity className="mx-auto mb-8 text-white text-9xl" />
            <h3 className="text-4xl italic font-black uppercase">
              {district} Node
            </h3>
          </div>

        </section>


        {/* COMMUNITY FUNDS */}
        <section className="bg-[#121212] p-16 rounded-[5rem] border border-orange-500/20 space-y-16">

          <div className="flex flex-col items-center gap-6 text-center">
            <div className="p-8 bg-orange-600 rounded-3xl">
              <FaMapMarkerAlt className="text-white text-7xl" />
            </div>
            <h3 className="text-6xl italic font-black uppercase">
              {district} Cluster Registry
            </h3>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
              <FaShieldAlt className="mb-4 text-4xl text-orange-500" />
              <h4 className="mb-2 text-xl italic font-black uppercase">
                {nearbyDistricts[0]} Homestays Community Fund
              </h4>
              <span className="block mb-4 text-3xl font-black">
                ₹{Number(breakdown.homestay).toLocaleString()}
              </span>
              <iframe
                width="100%"
                height="150"
                className="rounded-xl"
                src={`https://maps.google.com/maps?q=${nearbyDistricts[0]},India&z=9&output=embed`}
              ></iframe>
            </div>

            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
              <FaLeaf className="mb-4 text-4xl text-green-500" />
              <h4 className="mb-2 text-xl italic font-black uppercase">
                {nearbyDistricts[1]} Farmers Community Fund
              </h4>
              <span className="block mb-4 text-3xl font-black">
                ₹{Number(breakdown.farmers).toLocaleString()}
              </span>
              <iframe
                width="100%"
                height="150"
                className="rounded-xl"
                src={`https://maps.google.com/maps?q=${nearbyDistricts[1]},India&z=9&output=embed`}
              ></iframe>
            </div>

            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
              <FaCompass className="mb-4 text-4xl text-blue-500" />
              <h4 className="mb-2 text-xl italic font-black uppercase">
                {nearbyDistricts[2]} Guides Community Fund
              </h4>
              <span className="block mb-4 text-3xl font-black">
                ₹{Number(breakdown.guide).toLocaleString()}
              </span>
              <iframe
                width="100%"
                height="150"
                className="rounded-xl"
                src={`https://maps.google.com/maps?q=${nearbyDistricts[2]},India&z=9&output=embed`}
              ></iframe>
            </div>

          </div>

        </section>


        {/* IMPACT RECEIPT */}
        <section className="bg-[#111] p-20 rounded-[4rem] border border-white/10 shadow-2xl">

          <h3 className="mb-16 text-6xl font-black tracking-tight text-center uppercase">
            Community Impact Receipt
          </h3>

          <div className="p-12 mx-auto border rounded-[3rem] bg-black/40 border-white/10 backdrop-blur">

            <div className="grid grid-cols-2 gap-10 pb-10 mb-10 border-b border-white/10">
              <div>
                <p className="text-4xl font-black">
                  <span className="mr-2 text-5xl text-slate-400">Destination:</span>
                  {activeTrip?.tripName}
                </p>
              </div>
            </div>

            <div className="space-y-8">

              <div className="flex items-center justify-between pb-4 text-3xl border-b border-white/10">
                <span className="text-slate-400">{nearbyDistricts[0]} Homestays</span>
                <span className="font-black text-orange-400">
                  ₹{Number(breakdown.homestay).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between pb-4 text-3xl border-b border-white/10">
                <span className="text-slate-400">{nearbyDistricts[1]} Farmers</span>
                <span className="font-black text-green-400">
                  ₹{Number(breakdown.farmers).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between pb-4 text-3xl border-b border-white/10">
                <span className="text-slate-400">{nearbyDistricts[2]} Guides</span>
                <span className="font-black text-blue-400">
                  ₹{Number(breakdown.guide).toLocaleString()}
                </span>
              </div>

            </div>

            <div className="flex items-center justify-between pt-10 mt-10">

              <div className="flex items-center gap-4">
                <span className="text-2xl text-slate-400">Status:</span>
                <span className="px-6 py-2 text-xl font-bold text-green-400 border border-green-400 rounded-full">
                  Paid
                </span>
              </div>

              <div className="text-right">
                <p className="text-3xl text-slate-400">Timestamp</p>
                <p className="text-2xl font-semibold">{new Date().toLocaleString()}</p>
              </div>

            </div>

          </div>

        </section>


        {/* TRANSACTION LEDGER — shows ALL trips */}
        <section className="bg-[#111] p-16 rounded-[4rem] border border-white/10">

          <h3 className="mb-10 text-5xl font-black text-center uppercase">
            Community Fund Ledger
          </h3>

          <table className="w-full text-left">
            <thead>
              <tr className="text-orange-500 border-b border-white/10">
                <th className="py-3 text-3xl">Transaction ID</th>
                <th className="text-3xl">Trip</th>
                <th className="text-3xl">Recipient</th>
                <th className="text-3xl">Amount</th>
                <th className="text-3xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-3 text-2xl">{txn.id}</td>
                  <td className="text-2xl text-orange-300">{txn.trip}</td>
                  <td className="text-2xl">{txn.recipient}</td>
                  <td className="text-2xl">₹{Number(txn.amount).toLocaleString()}</td>
                  <td className="text-2xl text-green-400">{txn.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </section>

      </main>

    </div>

  );

};

export default About;