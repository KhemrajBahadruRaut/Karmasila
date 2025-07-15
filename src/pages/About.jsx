import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import WhatsAppBtn from '../components/Home_sub/WhatsappBtn.jsx';

const About = () => {
  return (
    <>
      <div className="bg-white">
        <Navbar />
      </div>
      <div><WhatsAppBtn /></div>

      <section className="bg-white text-black py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-6 border-b-4 border-yellow-300 text-center pb-2">
            About Us
          </h1>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Karmasila Enterprises Pvt. Ltd.
          </h2>

          <p className="text-lg leading-7 text-gray-700 mb-6">
            Karmasila Enterprises Pvt. Ltd. is a trusted name in Nepal's industrial supply sector,  known for delivering complete crusher machines, used crusher machines, high-quality spare parts, and comprehensive import-export services for industrial goods. We proudly serve the mining, construction, and manufacturing industries both domestically and internationally.
          </p>

          <p className="text-lg leading-7 text-gray-700 mb-6">
            Our extensive product range includes complete crushers, used crushers, and essential spare parts such as jaw plates, cone mantles, liners, side plates, bearings, and more; each engineered to meet the most demanding operational requirements and is backed by rigorous quality control standards.

          </p>

          <p className="text-lg leading-7 text-gray-700 mb-6">
            In addition to domestic supply, we provide import and export services for industrial goods, assisting businesses in sourcing high-quality materials from global suppliers and delivering Nepalese-made industrial products to international markets. Our dedicated team expertly handles compliance, logistics, custom fabrication, and timely delivery to ensure smooth trade operations.

          </p>

          <p className="text-lg leading-7 text-gray-700">
            With extensive industry expertise and a customer-centric approach, Karmasila Enterprises is committed to reducing downtime, enhancing operational value, and fostering industrial growth both locally and internationally.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
