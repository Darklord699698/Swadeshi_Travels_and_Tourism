import { useState, useEffect } from "react";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";


function Travel() {
  

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




<section className="contact">
    <h1 className="space-x-2 font-bold heading">
        <span>C</span>
        <span>O</span>
        <span>N</span>
        <span>T</span>
        <span>A</span>
        <span>C</span>
        <span>T</span>
    </h1>
    <div className="row">
        <div className="image">
            <img src={assets.img1} alt=""/>
        </div>
        <form action="">
            <div className="inputBox">
                <input type="text" placeholder="name"/>
                <input type="email" placeholder="email"/>
            </div>
            <div className="inputBox">
                <input type="number" placeholder="number"/>
                <input type="text" placeholder="subject"/>
            </div>
            <textarea placeholder="message" name="" id="" cols="30" rows="10"></textarea>
            <input type="submit" className="btn" value="send message"/>
        </form>
    </div>
</section>

<section className="brand-container">
    <div className="swiper-container brand-slider">
        <div className="swiper-wrapper">
            <div className="swiper-slide"><img src={assets.night} alt=""/></div>
        </div>
    </div>
</section>


<section className="footer">
    <div className="box-container">
        <div className="box">
            <h3>about us</h3>
            <p>We are just a bunch of web designers who are trying to create a website for the people to help them in travelling
                amazing spots in the Uttarakhand state of India in affordable and with quality based services.
            </p>
        </div>
        <div className="box">
            <h3>branch locations</h3>
            <a href="#">India</a>
            <a href="#">Japan</a>
            <a href="#">Usa</a>
            <a href="#">Russia</a>
        </div>
        <div className="box">
            <h3>quick links</h3>
            <a href="#">home</a>
            <a href="#">book</a>
            <a href="#">packages</a>
            <a href="#">services</a>
            <a href="#">gallery</a>
            <a href="#">review</a>
            <a href="#">contact</a>
        </div>
        <div className="box">
            <h3>follow us</h3>
            <a href="#">facebook</a>
            <a href="#">instagram</a>
            <a href="#">twitter</a>
            <a href="#">linkedin</a>
        </div>
    </div>
    <h1 className="credit">created by Mr web designer <span>| All rights reserved! |</span> </h1>
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
