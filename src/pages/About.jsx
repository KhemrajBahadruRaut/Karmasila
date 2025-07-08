import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';

const About = () => {
  return (
    <>
      <div className="bg-white">
        <Navbar />
      </div>

      <section className="bg-white text-black py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-6 border-b-4 border-yellow-300 text-center pb-2">
            About Us
          </h1>

          <p className="text-lg leading-7 text-gray-700 mb-6">
            <strong>Karmasila Enterprises Pvt. Ltd.</strong> is a trusted name in Nepal's industrial supply sector, known for delivering high-quality crusher solutions, machinery components, and import-export services. With a commitment to excellence and reliability, we serve the mining, construction, and manufacturing industries, both in Nepal and internationally.
          </p>

          <p className="text-lg leading-7 text-gray-700 mb-6">
            We specialize in a comprehensive range of crusher products, including complete crushers, used crushers, and spare parts such as jaw plates, cone mantles, liners, side plates, bearings, and more. Every component we offer is built to meet demanding operational requirements and is backed by our rigorous quality control standards.
          </p>

          <p className="text-lg leading-7 text-gray-700 mb-6">
            In addition to domestic supply, we provide import and export services for industrial goods, assisting businesses in sourcing high-quality materials from global suppliers and delivering Nepalese-made products to international markets. From compliance and logistics to custom fabrication and fast delivery, our team manages every aspect of the trade process with precision.
          </p>

          <p className="text-lg leading-7 text-gray-700">
            With extensive industry expertise and a customer-centric approach, <strong>Karmasila Enterprises Pvt. Ltd.</strong> is committed to reducing downtime, enhancing value, and fostering industrial advancement both locally and internationally.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
