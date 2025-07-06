import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets.js';
import AboutUs from '../components/Home_sub/AboutUs.jsx';
import OurServices from '../components/Home_sub/OurServices.jsx';
import ImportExport from '../components/ImportExport/ImportExport.jsx';
import Footer from '../components/Footer/Footer.jsx';
import CrusherCatalogs from '../components/Catalog/CrusherCatalogs.jsx';
import Contact from '../components/Contact us/Contact.jsx';
import WhatsAppBtn from '../components/Home_sub/WhatsappBtn.jsx';

const Home = () => {
    const catalogRef = useRef(null);

    const scrollToCatalog = () => {
        if (catalogRef.current) {
            catalogRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


   useEffect(() => {
  const id = localStorage.getItem("scrollToId");
  if (id) {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
    localStorage.removeItem("scrollToId");
  }
}, []);


    return (
        <>
            <div className="bg-white">
                <Navbar />
            </div>
            
        <div className="min-h-screen flex flex-col mx-auto" id='home'>
            {/* Hero Section */}
            <div className="relative w-full">
                <img
                    src={assets.Front}
                    alt="front page image"
                    className="w-full h-full object-fill object-center"
                />

                {/* Responsive Text Content */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white container mx-auto px-4 w-full">
                    <div className="text-left px-4 sm:px-6 lg:px-8">
                        <h1 className="text-[15px] sm:text-5xl md:text-6xl font-bold mb-[-0.5rem] sm:mb-[-0.6rem]">
                            Get Crusher Parts
                        </h1>
                        <h1 className="text-[25px] sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-[-0.8rem] sm:mb-[-1rem] md:mb-[-1.2rem]">
                            In
                        </h1>
                        <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-yellow-400 mb-4 sm:mb-6 md:mb-8">
                            Nepal
                        </h1>
                    </div>

                    {/* Responsive Button */}
                    <div className="text-left mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={scrollToCatalog}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg text-lg sm:text-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                            New Catalog
                        </button>
                    </div>
                </div>
            </div>
            
            <WhatsAppBtn />
            <div id="about-us">
                <AboutUs />
            </div>
            <div id="services">
                <OurServices />
            </div>
            <div id="import-export">
                <ImportExport />
            </div>
            <div ref={catalogRef} id="catalog">
                <CrusherCatalogs />
            </div>
            <div id="contact">
                <Contact />
            </div>
            <Footer />
        </div>
                </>

    );
};

export default Home;