import React, { useState } from 'react';
import { Star, Trash2, Edit3, X, Check, Quote, MapPin, Send } from 'lucide-react';

const Review = () => {
  // Mock logged-in user
  const currentUser = { id: "user_123", name: "ujjwal tomar" };

  const [reviews, setReviews] = useState([
    { id: 1, userId: "user_999", name: "Rohit Sharma", rating: 5, comment: "nice offers and good to see such cheap prices with so much stuff and activities to do", date: "10 Feb 2026" },
    { id: 2, userId: "user_123", name: "ujjwal tomar", rating: 4, comment: "good services and the best thing is guide is very well prepared and knows literally the best spots", date: "08 Feb 2026" },
    { id: 3, userId: "user_888", name: "Emily Clarke", rating: 5, comment: "love the customer care support because they have contacts with the locals and have a good connection", date: "05 Feb 2026" }
  ]);
  
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: '' });
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.rating === 0) return alert("Please select a rating!");

    const reviewToAdd = {
      id: Date.now(),
      userId: currentUser.id,
      name: currentUser.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ rating: 0, comment: '' });
  };

  const deleteReview = (id) => setReviews(reviews.filter(rev => rev.id !== id));

  const saveEdit = (id) => {
    setReviews(reviews.map(rev => 
      rev.id === id ? { ...rev, rating: editForm.rating, comment: editForm.comment } : rev
    ));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pt-32 pb-20 px-[5%] font-sans relative">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-50 to-transparent pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Stunning Header Section */}
        <div className="flex flex-col items-center mb-24 text-center">
          <div className="flex gap-3 mb-6">
            {["R","E","V","I","E","W"].map((letter, i) => (
              <span key={i} className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 text-2xl md:text-3xl font-black rounded-2xl shadow-sm transition-all hover:-translate-y-2
                ${i % 2 === 0 ? 'bg-orange-600 text-white shadow-orange-200' : 'bg-white text-orange-600 border border-orange-100'}`}>
                {letter}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold tracking-[0.3em] text-slate-400 uppercase mb-2">Bharat Trails Feedbacks</h2>
          <div className="w-24 h-1.5 bg-orange-600 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-[450px_1fr] gap-16 items-start">
          
          {/* INTERACTIVE SUBMISSION SIDEBAR */}
          <section className="sticky top-32 group">
            <div className="relative p-10 overflow-hidden bg-white border shadow-2xl border-white/40 rounded-3xl backdrop-blur-md">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center bg-orange-100 w-14 h-14 rounded-2xl">
                    <Edit3 className="text-orange-600" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Post Review</h3>
                    <p className="text-xs font-bold tracking-widest text-orange-600 uppercase">Logged in as {currentUser.name}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="p-6 border rounded-2xl bg-slate-50 border-slate-100">
                    <label className="block mb-4 text-xs font-black tracking-widest uppercase text-slate-400">Your Rating</label>
                    <div className="flex justify-between px-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                          className="transition-all hover:scale-125"
                        >
                          <Star 
                            size={36} 
                            fill={(hover || newReview.rating) >= star ? "#ea580c" : "none"} 
                            color={(hover || newReview.rating) >= star ? "#ea580c" : "#cbd5e1"} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block mb-3 text-xs font-black tracking-widest uppercase text-slate-400">Describe Experience</label>
                    <textarea 
                      required
                      rows="5"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value.toLowerCase()})}
                      className="w-full p-6 text-lg lowercase transition-all border outline-none resize-none bg-slate-50 border-slate-100 rounded-3xl focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-600"
                      placeholder="write your story here..."
                    ></textarea>
                    <div className="absolute bottom-4 right-4 text-slate-300">
                      <Quote size={32} className="rotate-180 opacity-20" />
                    </div>
                  </div>

                  <button className="flex items-center justify-center w-full gap-3 py-6 text-xl font-bold text-white transition-all bg-orange-600 shadow-2xl hover:bg-orange-700 rounded-2xl shadow-orange-200 active:scale-95">
                    <Send size={20} /> Publish Feedback
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* TESTIMONIAL GRID */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {reviews.map((rev) => (
              <div key={rev.id} className="relative flex flex-col p-8 transition-all duration-500 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-3xl group hover:-translate-y-2 shadow-sm">
                
                {/* Visual Accent */}
                <div className="absolute top-0 w-20 h-1 rounded-b-full right-10 bg-gradient-to-r from-orange-400 to-orange-600"></div>

                {/* Edit/Delete Tools */}
                {rev.userId === currentUser.id && editingId !== rev.id && (
                  <div className="absolute flex gap-2 top-8 right-8">
                    <button onClick={() => { setEditingId(rev.id); setEditForm({rating: rev.rating, comment: rev.comment}); }} 
                      className="p-3 transition-all rounded-xl text-slate-400 hover:bg-orange-50 hover:text-orange-600 bg-slate-50">
                      <Edit3 size={18}/>
                    </button>
                    <button onClick={() => deleteReview(rev.id)} 
                      className="p-3 transition-all rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 bg-slate-50">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                )}

                {editingId === rev.id ? (
                  <div className="flex flex-col h-full space-y-4">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={22} onClick={() => setEditForm({...editForm, rating: s})}
                          fill={editForm.rating >= s ? "#ea580c" : "none"} color={editForm.rating >= s ? "#ea580c" : "#e2e8f0"} className="cursor-pointer" />
                      ))}
                    </div>
                    <textarea 
                      className="flex-grow p-4 text-lg lowercase border outline-none rounded-2xl bg-slate-50 border-slate-100 focus:border-orange-600"
                      value={editForm.comment}
                      onChange={(e) => setEditForm({...editForm, comment: e.target.value.toLowerCase()})}
                    />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(rev.id)} className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-all bg-green-600 shadow-lg rounded-xl hover:bg-green-700 shadow-green-100"><Check size={18}/> Save</button>
                      <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-6 py-3 font-bold transition-all rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"><X size={18}/> Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-5 mb-8">
                      <div className="relative">
                        <div className="flex items-center justify-center w-20 h-20 text-3xl font-black text-white rounded-[2rem] bg-orange-600 shadow-xl shadow-orange-100 rotate-3">
                          {rev.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute w-8 h-8 bg-green-500 border-4 border-white rounded-full -bottom-1 -right-1"></div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tight capitalize text-slate-800">{rev.name}</h3>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill={i < rev.rating ? "#ea580c" : "none"} color={i < rev.rating ? "#ea580c" : "#e2e8f0"} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative flex-grow mb-10">
                      <Quote className="absolute -top-4 -left-2 opacity-[0.05] text-slate-900" size={60} />
                      <p className="relative z-10 pt-2 text-xl italic font-medium leading-relaxed lowercase text-slate-600">
                        {rev.comment}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin size={16} />
                        <span className="text-xs font-bold tracking-tighter uppercase">Verified Explorer</span>
                      </div>
                      <p className="text-[11px] font-black tracking-[0.2em] text-orange-600/40 uppercase">
                        {rev.date}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Review;