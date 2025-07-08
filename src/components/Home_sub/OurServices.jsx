import React, { useState } from 'react';
import { assets } from '../../assets/assets.js';
import { IoClose } from 'react-icons/io5'; // Close icon

const OurServices = () => {
  const services = [
    {
      title: "Supply of Quality Crusher Parts",
      image: assets.Karmasila_supply,
      alt: "Quality Crusher Parts - Karmasila Enterprises",
      description:
        "Provides a comprehensive range of spare and wear parts for all major crusher brands.",
    },
    {
      title: "Installation Support and Guidance",
      image: assets.Karmasila_support,
      alt: "Installation Support and Guidance - Karmasila Enterprises",
      description:
        "Offers expert assistance and technical guidance during installation to maximize equipment performance.",
    },
    {
      title: "Maintenance and Repair Services",
      image: assets.Karmasila_maintain,
      alt: "Maintenance and Repair Services - Karmasila Enterprises",
      description:
        "Provides scheduled maintenance, repairs, and overhauls for crushers and related machinery, reducing downtime and extending equipment lifespan.",
    },
    {
      title: "On-Site Inspection and Training",
      image: assets.Karmasila_inspect,
      alt: "On-Site Inspection and Training - Karmasila Enterprises",
      description:
        "Conducts thorough assessments to identify potential issues and advise on maintenance routines.",
    },
  ];

  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="bg-gray-100">
      <div className="w-full max-w-7xl px-6 md:px-10 lg:px-12 py-16 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
          <h3 className="text-xl text-gray-600 max-w-2xl mx-auto">
            For reliable, high-caliber crusher parts and exceptional service in Nepal.
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 flex flex-col h-full border border-gray-100 relative overflow-hidden"
            >
             
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  title={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-auto text-yellow-500 hover:text-yellow-600 font-medium transition-colors duration-300 text-left hover:underline underline-offset-4 decoration-2"
                >
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50 p-8"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white max-w-md w-full rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <IoClose className="text-gray-600 text-xl" />
            </button>

            {/* Image */}
            <div className="h-64 w-full overflow-hidden bg-gray-100">
              <img
                src={selectedService.image}
                alt={selectedService.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {selectedService.title}
              </h2>
              <p className="text-gray-600">{selectedService.description}</p>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default OurServices;
