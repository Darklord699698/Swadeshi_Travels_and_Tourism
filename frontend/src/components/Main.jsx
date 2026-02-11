import { useState, useEffect,useRef } from "react";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData1 from "../assets/animationData1.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Travel() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData1,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    // 1. Inside your Travel component, before the return statement:
const videoRefs = useRef([]);

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true
};

  const [videoSrc, setVideoSrc] = useState(assets.video1);

  // Handle scroll reset (window.onscroll)
  useEffect(() => {
    const handleScroll = () => {
      setMenuActive(false);
      setSearchActive(false);
      setLoginActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const videos = [
  assets.video1,
  assets.video2,
  assets.video3,
  assets.video4,
  assets.video5,
  assets.video6,
];



  return (
    <>
     
    
      {/* HOME */}
      <section className="home" id="home">
        <div className="content">
          <h3>adventure is worthwhile</h3>
          <p>discover new places with us, adventure awaits</p>
          <a href="#" className="btn">discover more</a>
        </div>

        <div className="controls">
          {videos.map((video, index) => (
            <span
              key={index}
              className={`vid-btn ${videoSrc === video ? "active" : ""}`}
              onClick={() => setVideoSrc(video)}
            ></span>
          ))}
        </div>

        <div className="video-container">
          <video
            src={videoSrc}
            id="video-slider"
            loop
            autoPlay
            
          ></video>
        </div>
      </section>
      
    <section className="packages" id="packages">
        <h1 className="space-x-2 font-bold heading">
            <span>P</span>
            <span>A</span>
            <span>C</span>
            <span>K</span>
            <span>A</span>
            <span>G</span>
            <span>E</span>
            <span>S</span>
        </h1>
        <div className="flex flex-wrap items-stretch justify-center gap-6 box-container">
    <div className="box flex flex-col flex-1 basis-[30rem] rounded-lg overflow-hidden shadow-md bg-white">
        <img src={assets.Dehradun} alt="" className="object-cover w-full h-64" />
        <div className="flex flex-col flex-grow p-6 content">
            <h3 className="text-3xl font-bold text-gray-800"><i className="mr-2 text-orange-500 fas fa-map-marker-alt"></i>Dehradun</h3>
            <p className="flex-grow py-4 text-xl leading-relaxed text-gray-600">
                Also known as the 'Adobe of Drona', Dehradun has always been an important center for Garhwal rulers which was captured by the British.
                The headquarters of many National Institutes and Organizations like ONGC, Survey Of India, Forest Research Institute, Indian Institute of Petroleum etc are located in the city.
            </p>
            <div className="py-2 text-xl text-orange-500 stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
            </div>
            <div className="py-2 text-2xl font-bold text-gray-800 price">Rs 999.00 <span className="ml-2 text-lg font-normal text-gray-400 line-through">Rs 1299.00</span></div>
            <a href="#" className="inline-block mt-4 text-center btn"> book now </a>
        </div>
    </div>

    <div className="box flex flex-col flex-1 basis-[30rem] rounded-lg overflow-hidden shadow-md bg-white">
        <img src={assets.Rudraprayag} alt="" className="object-cover w-full h-64" />
        <div className="flex flex-col flex-grow p-6 content">
            <h3 className="text-3xl font-bold text-gray-800"><i className="mr-2 text-orange-500 fas fa-map-marker-alt"></i>Rudraprayag</h3>
            <p className="flex-grow py-4 text-xl leading-relaxed text-gray-600">
                While the town is known for revered temples and pristine natural beauty, the presence of two separate routes for Badrinath (around 150 km away) and Kedarnath Dham (around 50 km away)
                from Rudraprayag make it an important destination for religious tourism, attracting tourists and devotees throughout the year.
            </p>
            <div className="py-2 text-xl text-orange-500 stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
            </div>
            <div className="py-2 text-2xl font-bold text-gray-800 price">Rs 2999.00 <span className="ml-2 text-lg font-normal text-gray-400 line-through">Rs 4999.00</span></div>
            <a href="#" className="inline-block mt-4 text-center btn"> book now </a>
        </div>
    </div>

    <div className="box flex flex-col flex-1 basis-[30rem] rounded-lg overflow-hidden shadow-md bg-white">
        <img src={assets.Badrinath} alt="" className="object-cover w-full h-64" />
        <div className="flex flex-col flex-grow p-6 content">
            <h3 className="text-3xl font-bold text-gray-800"><i className="mr-2 text-orange-500 fas fa-map-marker-alt"></i>Badrinath Temple</h3>
            <p className="flex-grow py-4 text-xl leading-relaxed text-gray-600">
                Badarinath or Badarinarayana Temple is a Hindu temple dedicated to Vishnu. It is situated in the town of Badrinath in Uttarakhand, India. The temple is also one of the 108 Divya Desams dedicated to Vishnu.
            </p>
            <div className="py-2 text-xl text-orange-500 stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
            </div>
            <div className="py-2 text-2xl font-bold text-gray-800 price">Rs 4999.00 <span className="ml-2 text-lg font-normal text-gray-400 line-through">Rs 7999.00</span></div>
            <a href="#" className="inline-block mt-4 text-center btn"> book now </a>
        </div>
    </div>

    <div className="box flex flex-col flex-1 basis-[30rem] rounded-lg overflow-hidden shadow-md bg-white">
        <img src={assets.Uttarkashi} alt="" className="object-cover w-full h-64" />
        <div className="flex flex-col flex-grow p-6 content">
            <h3 className="text-3xl font-bold text-gray-800"><i className="mr-2 text-orange-500 fas fa-map-marker-alt"></i>Gangotri</h3>
            <p className="flex-grow py-4 text-xl leading-relaxed text-gray-600">
                It is a Hindu pilgrim town on the banks of the river Bhagirathi – the origin of the river Ganges. The town is located on the Greater Himalayan Range, at a height of 3,100 metres (10,200 ft).
            </p>
            <div className="py-2 text-xl text-orange-500 stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
            </div>
            <div className="py-2 text-2xl font-bold text-gray-800 price">Rs 1999.00 <span className="ml-2 text-lg font-normal text-gray-400 line-through">Rs 3999.00</span></div>
            <a href="#" className="inline-block mt-4 text-center btn"> book now </a>
        </div>
    </div>

    <div className="box flex flex-col flex-1 basis-[30rem] rounded-lg overflow-hidden shadow-md bg-white">
        <img src={assets.Yamunotri} alt="" className="object-cover w-full h-64" />
        <div className="flex flex-col flex-grow p-6 content">
            <h3 className="text-3xl font-bold text-gray-800"><i className="mr-2 text-orange-500 fas fa-map-marker-alt"></i>Yamunotri</h3>
            <p className="flex-grow py-4 text-xl leading-relaxed text-gray-600">
                Yamunotri, also Jamnotri, is the source of the Yamuna River and the seat of the Goddess Yamuna in Hinduism. It is situated at an altitude of 3,293 metres.
            </p>
            <div className="py-2 text-xl text-orange-500 stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
            </div>
            <div className="py-2 text-2xl font-bold text-gray-800 price">Rs 1499.00 <span className="ml-2 text-lg font-normal text-gray-400 line-through">Rs 2599.00</span></div>
            <a href="#" className="inline-block mt-4 text-center btn"> book now </a>
        </div>
    </div>

    <div className="box flex flex-col flex-1 basis-[30rem] rounded-lg overflow-hidden shadow-md bg-white">
        <img src={assets.kedarnath} alt="" className="object-cover w-full h-64" />
        <div className="flex flex-col flex-grow p-6 content">
            <h3 className="text-3xl font-bold text-gray-800"><i className="mr-2 text-orange-500 fas fa-map-marker-alt"></i>Kedarnath</h3>
            <p className="flex-grow py-4 text-xl leading-relaxed text-gray-600">
                Kedarnath is the most remote of the four Chota Char Dham pilgrimage sites. It is located in the Himalayas, about 3,583 m (11,755 ft) above sea level near the Chorabari Glacier.
            </p>
            <div className="py-2 text-xl text-orange-500 stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
            </div>
            <div className="py-2 text-2xl font-bold text-gray-800 price">Rs 7999.00 <span className="ml-2 text-lg font-normal text-gray-400 line-through">Rs 9999.00</span></div>
            <a href="#" className="inline-block mt-4 text-center btn"> book now </a>
        </div>
    </div>
</div>
    </section>

<section className="services" id="services">
    <h1 className="space-x-2 font-bold heading">
        <span>S</span>
        <span>E</span>
        <span>R</span>
        <span>V</span>
        <span>I</span>
        <span>C</span>
        <span>E</span>
        <span>S</span>
    </h1>
    <div className="box-container">
        <div className="box">
            <i className="fas fa-hotel"></i>
            <h3>affordable hotels</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum illo sapiente nostrum fugit at quia est,
                 dicta nemo facere alias dignissimos quasi quam nulla tenetur? Voluptatem consequuntur recusandae voluptates deserunt?
            </p>
        </div>
        <div className="box">
            <i className="fas fa-utensils"></i>
            <h3>food and drinks</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum illo sapiente nostrum fugit at quia est,
                 dicta nemo facere alias dignissimos quasi quam nulla tenetur? Voluptatem consequuntur recusandae voluptates deserunt?
            </p>
        </div>
        <div className="box">
            <i className="fas fa-plane"></i>
            <h3>safety guides</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum illo sapiente nostrum fugit at quia est,
                 dicta nemo facere alias dignissimos quasi quam nulla tenetur? Voluptatem consequuntur recusandae voluptates deserunt?
            </p>
        </div>
        <div className="box">
            <i className="fas fa-bullhorn"></i>
            <h3>safety guides</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum illo sapiente nostrum fugit at quia est,
                 dicta nemo facere alias dignissimos quasi quam nulla tenetur? Voluptatem consequuntur recusandae voluptates deserunt?
            </p>
        </div>
        <div className="box">
            <i className="fas fa-globe-asia"></i>
            <h3>around the world</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum illo sapiente nostrum fugit at quia est,
                 dicta nemo facere alias dignissimos quasi quam nulla tenetur? Voluptatem consequuntur recusandae voluptates deserunt?
            </p>
        </div>
        <div className="box">
            <i className="fas fa-hiking"></i>
            <h3>adventures</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum illo sapiente nostrum fugit at quia est,
                 dicta nemo facere alias dignissimos quasi quam nulla tenetur? Voluptatem consequuntur recusandae voluptates deserunt?
            </p>
        </div>
    </div>
</section>


<section className="gallery" id="gallery">
    <h1 className="space-x-2 font-bold heading">
        <span>G</span>
        <span>A</span>
        <span>L</span>
        <span>L</span>
        <span>E</span>
        <span>R</span>
        <span>Y</span>
    </h1>
    <div className="flex flex-wrap gap-6 box-container">
    {[
        { img: assets.nainital, title: "Nainital And Ranikhet", desc: "Located by the famous Naini Lake in the valley, surrounded by mountains on all sides." },
        { img: assets.Rishikesh, title: "Rishikesh And Haridwar", desc: "Haridwar and Rishikesh is a place where tourists get enchanted by spiritual energy." },
        { img: assets.Almora, title: "Almora", desc: "Almora is one of the best off beat places to visit in Uttarakhand, especially in summer." },
        { img: assets.ResortChakrata, title: "Chakrata", desc: "The small and secluded hill town of Chakrata is an ideal place for those looking for silence." },
        { img: assets.Chopta, title: "Chopta", desc: "Chopta is one of the least explored hamlets and among the best sightseeing places." },
        { img: assets.ValleyOfFlowers, title: "Hemkund Sahib", desc: "The valley of flowers near Hemkund Sahib is a paradise for nature lovers." },
        { img: assets.KedarnathTemple, title: "Chardham", desc: "Explore the diverse spiritual essence of Yamunotri, Gangotri, Badrinath and Kedarnath." },
        { img: assets.Dhanaulti, title: "Dhanaulti", desc: "Nestled amid lofty Himalayan peaks, Dhanaulti is just 60 km from Mussoorie." },
        { img: assets.MukteshwarTemple, title: "Mukteshwar", desc: "A small hill town famous for awesome views of Himalayan ranges and adventure sports." }
    ].map((item, index) => (
        /* Box: 'group' is key here to trigger the hover effect on children */
        <div key={index} className="group relative overflow-hidden shadow-lg rounded-lg border-[1rem] border-white flex-1 basis-[30rem] h-[25rem]">
            
            <img src={item.img} alt={item.title} className="object-cover w-full h-full" />
            
            {/* Content: slides from top-[-100%] to top-0 on group-hover */}
            <div className="absolute top-[-100%] left-0 h-full w-full bg-black/70 flex flex-col items-center justify-center text-center p-8 transition-all duration-200 ease-linear group-hover:top-0">
                <h3 className="mb-2 text-4xl font-bold text-orange-400">
                    {item.title}
                </h3>
                <p className="mb-4 text-xl leading-relaxed text-gray-200">
                    {item.desc}
                </p>
                <a href="#" className="inline-block px-6 py-2 text-xl text-white bg-orange-500 rounded btn hover:bg-orange-600">
                    See More
                </a>
            </div>
        </div>
    ))}
</div>

</section>





<section className="review" id="review">
    <h1 className="space-x-2 font-bold heading">
        <span>R</span>
        <span>E</span>
        <span>V</span>
        <span>I</span>
        <span>E</span>
        <span>W</span>
    </h1>
    <div className="swiper-container review-slider">

        <div className="swiper-wrapper">

            <div className="swiper-slide">
                <div className="box">
                    <img src={assets.luffy1} alt=""/>
                    <h3>Rohit Sharma</h3>
                    <p>Nice Offers and Good to see such cheap prices with so much stuff and activities to do</p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="swiper-container review-slider">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div className="box">
                    <img src={assets.luffy1} alt=""/>
                    <h3>John Lawrence</h3>
                    <p>Good services and the best thing is guide is very well prepared and knows literally the best spots </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="swiper-container review-slider">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div className="box">
                    <img src={assets.luffy1} alt=""/>
                    <h3>Carey Anderson</h3>
                    <p>Food quality is better and the amount of food served is also quite good </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="swiper-container review-slider">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div className="box">
                    <img src={assets.luffy1} alt=""/>
                    <h3>Emily Clarke</h3>
                    <p>Love the customer care support beacause they have contacts with the locals of the area and have a good connection</p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>



</section>




<section className="py-20 contact bg-gray-50" id="contact">
  {/* Centered Heading with Letter Gaps */}
  <h1 className="flex justify-center mb-16 space-x-3 font-bold heading">
    <span className="px-4 py-2 text-orange-600 bg-orange-100 rounded-lg">C</span>
    <span className="px-4 py-2 text-orange-600 bg-orange-100 rounded-lg">O</span>
    <span className="px-4 py-2 text-orange-600 bg-orange-100 rounded-lg">N</span>
    <span className="px-4 py-2 text-orange-600 bg-orange-100 rounded-lg">T</span>
    <span className="px-4 py-2 text-orange-600 bg-orange-100 rounded-lg">A</span>
    <span className="px-4 py-2 text-orange-600 bg-orange-100 rounded-lg">C</span>
    <span className="px-4 py-2 text-orange-600 bg-orange-100 rounded-lg">T</span>
  </h1>

  {/* Main Container */}
  <div className="container mx-auto px-[9%]">
    <div className="flex flex-wrap items-center justify-center gap-12 row">
      
      {/* Lottie Animation Side */}
      <div className="flex-1 min-w-[350px] max-w-[700px] transform hover:scale-105 transition-transform duration-500">
        <Lottie 
          options={defaultOptions} 
          height="100%" 
          width="100%" 
          isClickToPauseDisabled={true}
        />
      </div>

      {/* Modern Redesigned Form */}
      <form className="flex-1 min-w-[320px] max-w-[650px] p-10 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl space-y-6">
        
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold text-gray-800">Get in Touch</h2>
          <p className="text-xl text-gray-500">We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-4 text-xl transition-all duration-300 border border-transparent outline-none bg-gray-50 rounded-xl focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-4 text-xl transition-all duration-300 border border-transparent outline-none bg-gray-50 rounded-xl focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <input 
              type="number" 
              placeholder="Phone Number" 
              className="w-full p-4 text-xl transition-all duration-300 border border-transparent outline-none bg-gray-50 rounded-xl focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <input 
              type="text" 
              placeholder="Subject" 
              className="w-full p-4 text-xl transition-all duration-300 border border-transparent outline-none bg-gray-50 rounded-xl focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>

        <textarea 
          placeholder="Your Message" 
          rows="5"
          className="w-full p-4 text-xl transition-all duration-300 border border-transparent outline-none resize-none bg-gray-50 rounded-xl focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
        ></textarea>

        <button 
          type="submit" 
          className="w-full py-5 text-2xl font-bold tracking-widest text-white uppercase transition-all duration-300 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:scale-95"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</section>
{/*// 2. In your JSX (Below the Contact section):*/}
{/* Section with a refined background: added a faint grid and soft radial glows */}
{/* Section: Changed bg-white to bg-[#0a0a0a] (Deep Charcoal Black) */}
{/* Section: Gradient from Deep Navy to Black */}
<section className="relative flex flex-col items-center justify-center pt-10 pb-20 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#020617]" id="highlights">
  
  {/* TOPOGRAPHICAL TEXTURE */}
  {/* This adds subtle wavy lines that look like mountain elevations */}
  <div className="absolute inset-0 opacity-[0.08] pointer-events-none invert" 
       style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/topography.png")` }}>
  </div>
  
  {/* AMBIENT LIGHTING */}
  {/* A soft "Moonlight" glow from the top left */}
  <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

  <div className="relative z-10 w-full max-w-[90%] px-4">
    
    {/* Heading: Frosted Glass Style for the letters */}
    <h1 className="flex justify-center mb-6 space-x-3 font-bold heading">
      {['V','I','S','U','A','L','S'].map((letter, i) => (
        <span key={i} className="px-5 py-3 text-white transition-colors duration-300 border shadow-xl bg-white/10 backdrop-blur-md border-white/20 rounded-xl hover:border-orange-400">
          {letter}
        </span>
      ))}
    </h1>

    {/* Slider Wrapper: Elevated "Floating" Container */}
    <div className="p-2 mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem]">
      <div className="bg-[#020617] rounded-[1.8rem] p-2">
        <Slider {...sliderSettings} className="w-full slick-custom">
          {/* Slide 1 */}
          <div className="px-1 outline-none">
            <video 
              ref={el => videoRefs.current[0] = el} 
              controls 
              className="w-full h-[450px] object-cover rounded-2xl" 
              autoPlay 
              loop 
              muted
            >
              <source src={assets.video1} type="video/mp4" />
            </video>
          </div>
          
          {/* Slide 2 */}
          <div className="px-1 outline-none">
            <video 
              ref={el => videoRefs.current[1] = el} 
              controls 
              className="w-full h-[450px] object-cover rounded-2xl" 
              autoPlay 
              loop 
              muted
            >
              <source src={assets.video2} type="video/mp4" />
            </video>
          </div>

          {/* Slide 3 */}
          <div className="px-1 outline-none">
            <video 
              ref={el => videoRefs.current[2] = el} 
              controls 
              className="w-full h-[450px] object-cover rounded-2xl" 
              autoPlay 
              loop 
              muted
            >
              <source src={assets.video3} type="video/mp4" />
            </video>
          </div>
        </Slider>
      </div>
    </div>
  </div>
</section>


<section className="relative pt-24 pb-12 overflow-hidden bg-[#020617] text-white">
  {/* Top Accent Line */}
  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40"></div>
  
  {/* px-[4%] and w-full ensures it stretches across the screen */}
  <div className="w-full px-[4%]">
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6 box-container">
      
      {/* 1. Brand & Newsletter - Given 2 columns to prevent squishing others */}
      <div className="space-y-8 lg:col-span-2">
  <h3 className="flex gap-1 text-6xl font-black tracking-tighter uppercase">
    {/* Saffron (Saffron/Orange) */}
    <span className="text-[#FF9933]">BHA</span>
    
    {/* White (with a subtle glow to pop on dark bg) */}
    <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">RAT</span>
    
    {/* Green (India Green) */}
    <span className="text-[#138808]">TRAILS</span>
  </h3>
  
  <p className="max-w-xl text-2xl leading-relaxed text-gray-300">
    Your premier gateway to the mystical lands of Uttarakhand. We craft journeys that stay in your heart forever. Join thousands of adventurers today.
  </p>
        <div className="pt-4 space-y-5">
          <p className="text-xl font-bold tracking-widest text-gray-200 uppercase">Join the Community</p>
          <div className="flex h-20 max-w-xl overflow-hidden transition-all border-2 rounded-2xl bg-white/5 border-white/10 focus-within:border-orange-500">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="w-full px-8 text-2xl text-white bg-transparent outline-none placeholder:text-gray-500"
            />
            <button className="px-10 text-3xl transition-colors bg-orange-500 hover:bg-orange-600">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Trending Destinations */}
      <div className="space-y-6 lg:col-span-1">
        <h3 className="inline-block pb-3 text-2xl font-bold tracking-widest text-white uppercase border-b-2 border-orange-500/50">Trending</h3>
        <ul className="space-y-5 text-xl text-gray-400">
          {['Kedarnath Trek', 'Auli Skiing', 'Rishikesh Rafting', 'Valley of Flowers', 'Mussoorie Hills'].map((item) => (
            <li key={item} className="flex items-center gap-3 transition-all cursor-pointer hover:text-orange-400 hover:translate-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>{item}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Experience Hub */}
      <div className="space-y-6 lg:col-span-1">
        <h3 className="inline-block pb-3 text-2xl font-bold tracking-widest text-white uppercase border-b-2 border-orange-500/50">Experience</h3>
        <nav className="flex flex-col space-y-5 text-xl font-medium">
          <a href="#book" className="text-gray-400 transition-all duration-300 hover:text-orange-500 hover:translate-x-2">
            <i className="mr-3 text-orange-500 fas fa-campground"></i> Camping Sites
          </a>
          <a href="#packages" className="text-gray-400 transition-all duration-300 hover:text-orange-500 hover:translate-x-2">
            <i className="mr-3 text-orange-500 fas fa-mountain"></i> Mountain Treks
          </a>
          <a href="#services" className="text-gray-400 transition-all duration-300 hover:text-orange-500 hover:translate-x-2">
            <i className="mr-3 text-orange-500 fas fa-om"></i> Spiritual Tours
          </a>
          <a href="#gallery" className="text-gray-400 transition-all duration-300 hover:text-orange-500 hover:translate-x-2">
            <i className="mr-3 text-orange-500 fas fa-camera-retro"></i> Photo Expeditions
          </a>
        </nav>
      </div>

      {/* 4. Support */}
      <div className="space-y-6 lg:col-span-1">
        <h3 className="inline-block pb-3 text-2xl font-bold tracking-widest text-white uppercase border-b-2 border-orange-500/50">Support</h3>
        <ul className="space-y-5 text-xl font-medium text-gray-400">
          <li className="transition-colors cursor-pointer hover:text-orange-400">Help Center</li>
          <li className="transition-colors cursor-pointer hover:text-orange-400">Safety Guides</li>
          <li className="transition-colors cursor-pointer hover:text-orange-400">Privacy Policy</li>
          <li className="transition-colors cursor-pointer hover:text-orange-400">Partner with Us</li>
        </ul>
      </div>

      {/* 5. Contact Info - Now has its own stable column */}
      <div className="space-y-8 lg:col-span-1">
        <h3 className="inline-block pb-3 text-2xl font-bold tracking-widest text-white uppercase border-b-2 border-orange-500/50">Contact</h3>
        <div className="space-y-5 text-xl text-gray-300">
          <p className="flex items-center gap-4"><i className="text-2xl text-orange-500 fas fa-phone-alt"></i> +91 98765 43210</p>
          <p className="flex items-center gap-4"><i className="text-2xl text-orange-500 fas fa-envelope"></i> info@bharattrails.com</p>
          <div className="flex gap-4 pt-4">
            {['facebook-f', 'instagram', 'twitter', 'linkedin-in'].map((icon, i) => (
              <a key={i} href="#" className="flex items-center justify-center w-12 h-12 transition-all border-2 shadow-lg rounded-xl bg-white/5 border-white/10 hover:bg-orange-500 hover:scale-110">
                <i className={`fab fa-${icon} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>

    {/* Bottom Bar */}
    <div className="flex flex-wrap items-center justify-between gap-10 pt-12 mt-20 border-t-2 border-white/5">
      <div className="flex items-center gap-8 transition-opacity opacity-60 grayscale hover:opacity-100 hover:grayscale-0">
        <i className="text-6xl fab fa-cc-visa"></i>
        <i className="text-6xl fab fa-cc-mastercard"></i>
        <i className="text-6xl fab fa-cc-apple-pay"></i>
        <i className="text-6xl fab fa-cc-amazon-pay"></i>
      </div>
      
      <div className="text-2xl tracking-wide text-right text-gray-500">
        <p>Created by <span className="font-bold text-orange-500">Ujjwal Tomar</span></p>
        <p className="mt-1 text-lg">&copy; {new Date().getFullYear()} Bharat Trails Tourism. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</section>

      {/* ALL OTHER SECTIONS REMAIN SAME */}
      {/* IMPORTANT: Just make sure every class becomes className */}
      {/* And label for becomes htmlFor */}

      {/* Paste remaining sections exactly same but with:
            class → className
            for → htmlFor
      */}

    </>
  );
}

export default Travel;
