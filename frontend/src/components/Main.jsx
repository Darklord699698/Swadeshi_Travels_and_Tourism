import { useState, useEffect } from "react";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { assets } from "../assets/assets.js";

function Travel() {
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
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
      {/* HEADER */}
      <header>
        <div
          id="menu-bar"
          className={`fas fa-bars ${menuActive ? "fa-times" : ""}`}
          onClick={() => setMenuActive(!menuActive)}
        ></div>

        <a href="#" className="logo">
          <span>T</span>ravel
        </a>

        <nav className={`navbar ${menuActive ? "active" : ""}`}>
          <a href="#home">home</a>
          <a href="#book">book</a>
          <a href="#packages">packages</a>
          <a href="#services">services</a>
          <a href="#gallery">gallery</a>
          <a href="#review">review</a>
          <a href="#contact">contact</a>
        </nav>

        <div className="icons">
          <i
            className={`fas fa-search ${searchActive ? "fa-times" : ""}`}
            onClick={() => setSearchActive(!searchActive)}
          ></i>

          <i
            className="fas fa-user"
            onClick={() => setLoginActive(true)}
          ></i>
        </div>

        <form
          className={`search-bar-container ${
            searchActive ? "active" : ""
          }`}
        >
          <input type="search" placeholder="Search here ..." />
          <label className="fas fa-search"></label>
        </form>
      </header>

      {/* LOGIN FORM */}
      <div
        className={`login-form-container ${
          loginActive ? "active" : ""
        }`}
      >
        <i
          className="fas fa-times"
          id="form-close"
          onClick={() => setLoginActive(false)}
        ></i>

        <form>
          <h3>login</h3>
          <input type="email" className="box" placeholder="enter your email..." />
          <input type="password" className="box" placeholder="password..." />
          <input type="submit" value="login now" className="btn" />
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">remember me</label>
          <p>forget password <a href="#">click here</a></p>
          <p>dont have a account? <a href="#">register now</a></p>
        </form>
      </div>

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
      <section className="book" id="book">
        <h1 className="heading">
            <span>b</span>
            <span>o</span>
            <span>o</span>
            <span>k</span>
            <span className="space"></span>
            <span>n</span>
            <span>0</span>
            <span>w</span>
        </h1>
        <div className="row">
            <div className="image">
                <img src={assets.img2} alt=""/>
            </div>
            <form action="">
                <div className="inputBox">
                    <h3>where to</h3>
                    <input type="text" placeholder="place name"/>
                </div>
                <div className="inputBox">
                    <h3>how many</h3>
                    <input type="number" placeholder="number of guests"/>
                </div>
                <div className="inputBox">
                    <h3>arrivals</h3>
                    <input type="date"/>
                </div>
                <div className="inputBox">
                    <h3>leaving</h3>
                    <input type="date"/>
                </div>
                <input type="submit" className="btn" value="book now"/>
            </form>
        </div>

    </section>
    <section className="packages" id="packages">
        <h1 className="heading">
            <span>p</span>
            <span>a</span>
            <span>c</span>
            <span>k</span>
            <span>a</span>
            <span>g</span>
            <span>e</span>
            <span>s</span>
        </h1>
        <div className="box-container">
            <div className="box">
                <img src={assets.Dehradun} alt=""/>
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>Dehradun</h3>
                    <p>Also known as the 'Adobe of Drona', Dehradun has always been an important center for Garhwal rulers which was captured by the British.
                         The headquarters of many National Institutes and Organizations like ONGC, Survey Of India, Forest Research Institute, Indian Institute of Petroleum etc are located in the city.
                    </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">Rs 999.00 <span>Rs 1299.00</span></div>
                    <a href="#" className="btn"> book now </a>
                </div>
            </div>
            <div className="box">
                <img src={assets.Rudraprayag} alt=""/>
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>Rudraprayag</h3>
                    <p>While the town is known for revered temples and pristine natural beauty, the presence of two separate routes for Badrinath (around 150 km away) and Kedarnath Dham (around 50 km away)
                         from Rudraprayag make it an important destination for religious tourism, attracting tourists and devotees throughout the year, who make a beeline for the Shiva and Jagdamba temples here.
                    </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">Rs 2999.00 <span>Rs 4999.00</span></div>
                    <a href="#" className="btn"> book now </a>
                </div>
            </div>
            <div className="box">
                <img src={assets.Badrinath} alt=""/>
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>Badrinath Temple</h3>
                    <p>Badarinath or Badarinarayana Temple is a Hindu temple dedicated to Vishnu. It is situated in the town of Badrinath in Uttarakhand, India. The temple is also one of the 108 Divya Desams dedicated to Vishnu—holy shrines for Vaishnavas—who is worshipped as Badrinath.
                         It is open for six months every year (between the end of April and the beginning of November), because of extreme weather conditions in the Himalayan region.
                    </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">Rs 4999.00 <span>Rs 7999.00</span></div>
                    <a href="#" className="btn"> book now </a>
                </div>
            </div>
            <div className="box">
                <img src={assets.Uttarkashi} alt=""/>
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>Gangotri</h3>
                    <p>Gangotri is a town and a Nagar Panchayat (municipality) in Uttarkashi district in the state of Uttarakhand, India.
                         It is 99 km from Uttarkashi, the main district headquarter. It is a Hindu pilgrim town on the banks of the river Bhagirathi – the origin of the river Ganges. The town is located on the Greater Himalayan Range, at a height of 3,100 metres (10,200 ft). According to a popular Hindu legend, the goddess Ganga descended here when Shiva released the mighty river from the locks of his hair.
                    </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">Rs 1999.00 <span>Rs 3999.00</span></div>
                    <a href="#" className="btn"> book now </a>
                </div>
            </div>
            <div className="box">
                <img src={assets.Yamunotri} alt=""/>
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>Yamunotri</h3>
                    <p>Yamunotri, also Jamnotri, is the source of the Yamuna River and the seat of the Goddess Yamuna in Hinduism.
                        It is situated at an altitude of 3,293 metres (10,804 ft) in the Garhwal Himalayas and located approximately 150 kilometres (93 mi) North of Uttarkashi, the headquarters of the Uttarkashi district in the Garhwal Division of Uttarakhand, India.
                         It is one of the four sites in India's Chota Char Dham pilgrimage.
                    </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">Rs 1499.00 <span>Rs 2599.00</span></div>
                    <a href="#" className="btn"> book now </a>
                </div>
            </div>
            <div className="box">
                <img src={assets.kedarnath} alt=""/>
                <div className="content">
                    <h3><i className="fas fa-map-marker-alt"></i>Kedarnath</h3>
                    <p>Kedarnath is a town and Nagar Panchayat in Rudraprayag district of Uttarakhand, India, known primarily for the Kedarnath Temple. It is approximately 86 kilometres from Rudraprayag, the district headquarter. Kedarnath is the most remote of the four Chota Char Dham pilgrimage sites. It is located in the Himalayas, about 3,583 m (11,755 ft) above sea level near the Chorabari Glacier, which is the source of the Mandakini river.
                         The town is flanked by snow-capped peaks, most prominently the Kedarnath Mountain.
                    </p>
                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="price">Rs 7999.00 <span>Rs 9999.00</span></div>
                    <a href="#" className="btn"> book now </a>
                </div>
            </div>
            
        </div>
    </section>

<section className="services" id="services">
    <h1 className="heading">
        <span>s</span>
        <span>e</span>
        <span>r</span>
        <span>v</span>
        <span>i</span>
        <span>c</span>
        <span>e</span>
        <span>s</span>
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
    <h1 className="heading">
        <span>g</span>
        <span>a</span>
        <span>l</span>
        <span>l</span>
        <span>e</span>
        <span>r</span>
        <span>y</span>
    </h1>
    <div className="box-container">
        <div className="box">
            <img src={assets.nainital} alt=""/>
            <div className="content">
                <h3>Nainital And Ranikhet</h3>
                <p> Located by the famous Naini Lake in the valley, surrounded by mountains on all sides where one can enjoy majestic vistas of nature here.

                </p>
                <a href="#" className="btn">See More</a>
            </div>
        </div>
        <div className="box">
            <img src={assets.Rishikesh} alt=""/>
            <div className="content">
                <h3>Rishikesh And Haridwar</h3>
                <p>Haridwar and Rishikesh is a place where tourists get enchanted by rustic touch and spiritual energy of the place and its surroundings.
                </p>
                <a href="#" className="btn">See More</a>
            </div>
        </div>
        <div className="box">
            <img src={assets.Almora} alt=""/>
            <div className="content">
                <h3>Almora</h3>
                <p>Almora is one of the best off beat places to visit in Uttarakhand, especially in summer to escape the heat
                    and recommended to the mountain lovers.</p>
                <a href="#" className="btn">See More</a>
            </div>
        </div>
        <div className="box">
            <img src={assets.ResortChakrata} alt=""/>
            <div className="content">
                <h3>Chakrata</h3>
                <p>The small and secluded hill town of Chakrata is an ideal place for those who are looking for a place to be silent and enjoy the beauty of the hills</p>
                <a href="#" className="btn">See More</a>
            </div>
        </div>
        <div className="box">
            <img src={assets.Chopta} alt=""/>
            <div className="content">
                <h3>Chopta </h3>
                <p>Chopta is one of the least explored hamlets in the Himalayas and among the best Uttarakhand sightseeing places</p>
                <a href="#" className="btn">See More</a>
            </div>
        </div>
        <div className="box">
            <img src={assets.ValleyOfFlowers} alt=""/>
            <div className="content">
                <h3>Hemkund Sahib </h3>
                <p>One of the most beautiful places to visit in Uttarakhand is the Valley of Flowers. For those who admire the beauty of nature, the valley of flowers near Hemkund Sahib is a paradise.</p>
                <a href="#" className="btn">See More</a>
            </div>
        </div>
        <div className="box">
            <img src={assets.KedarnathTemple} alt=""/>
            <div className="content">
                <h3>Chardham</h3>
                <p>the diverse spiritual essence of India whilst exploring these
                fascinating tourist places then nothing is better
                than the visit to the Chardham- Yamunotri, Gangotri, Badrinath and Kedarnath.</p>
                <a href="#" className="btn">See More</a>
            </div>
        </div>
        <div className="box">
            <img src={assets.Dhanaulti} alt=""/>
            <div className="content">
                <h3>Dhanaulti</h3>
                <p>Nestled amid the lofty Himalayan peaks, Dhanaulti is just about 60 km from the popular hill station called Mussoorie.</p>
                <a href="#" className="btn">See More</a>
            </div>
        </div>
        <div className="box">
            <img src={assets.MukteshwarTemple} alt=""/>
            <div className="content">
                <h3>Mukteshwar</h3>
                <p>Mukteshwar is a small hill town in Uttarakhand and is located around 50km from Nainital.
                     Uttarakhand is famous for its awesome views of Himalayan ranges and fun adventure sports.</p>
                <a href="#" className="btn">See More</a>
            </div>
        </div>
    </div>

</section>





<section className="review" id="review">
    <h1 className="heading">
        <span>r</span>
        <span>e</span>
        <span>v</span>
        <span>i</span>
        <span>e</span>
        <span>w</span>
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
    <h1 className="heading">
        <span>c</span>
        <span>o</span>
        <span>n</span>
        <span>t</span>
        <span>a</span>
        <span>c</span>
        <span>t</span>
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
