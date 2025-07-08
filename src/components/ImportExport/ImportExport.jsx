import React from 'react';
import { assets } from '../../assets/assets.js';
import { Link } from 'react-router-dom';

const ImportExport = () => {
  return (
    <div  className="w-full px-6 lg:px-[9%] py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Column - Heading and Description */}
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4">
            <h1 className="text-fxl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Import and Export
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
             Karmasila Enterprises Pvt. Ltd. provides reliable import and export services for a wide range of products, including crusher parts, heavy machinery components, and various industrial goods. We source products globally and export locally made products, managing the entire process, from documentation to delivery, with complete compliance and efficient logistics. Wherever your business needs to go, we're here to help it move forward.
            </p>
            <a href="/consult"   title="Fill out the form to consult with us" >
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              Consult Now
            </button>
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
              {/* Image */}
          <div className="overflow-hidden ">
            <img
              src={assets.Karmasila_importEXPORT} 
              alt="Import and Export"
              className="w-full h-full object-cover"
              title='Import and Export'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExport;
