import React, { useState } from 'react';

const AboutUs = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div id="about-us" className="w-full px-6 lg:px-[9%] py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
                {/* Left Column - Heading and Description */}
                <div className="space-y-8 md:space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            About us
                        </h1>

                    </div>

                    <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed text-justify">
                            Karmasila Enterprises supplies high-quality complete crusher machines, used crusher machines, spare parts, and heavy equipment spares, along with import and export services for industrial goods. We serve mining, construction, and aggregate businesses across Nepal with a strong reputation for reliability, efficiency, and customer satisfaction.
                        </p>
                      
                        <a href="/about-us"   title="Fill out the form to consult with us" >
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              Learn more
            </button>
            </a>
                    </div>
                </div>

                {/* Right Column - Mission, Vision, and Value Cards */}
                <div className="space-y-6">
                    {/* Mission Dropdown */}
                    <div
                        className="bg-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-lg"
                        onMouseEnter={() => toggleSection('mission')}
                        onMouseLeave={() => toggleSection(null)}
                    >
                        <button className="w-full p-6 md:p-8 text-left flex justify-between items-center focus:outline-none">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Our Mission</h2>
                            <svg
                                className={`w-6 h-6 transform transition-transform duration-500 text-yellow-600 ${openSection === 'mission' ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openSection === 'mission' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 md:px-8 pb-6 md:pb-8">
                                <p className="text-gray-700 leading-relaxed">
                                    To provide complete new and used crusher machines, high-quality spare parts, and comprehensive import-export services for industrial goods. We are committed to delivering reliable, high-caliber products and exceptional service that enable our clients to maximize operational efficiency and productivity. Quality, timely delivery, and customer satisfaction guide every transaction.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Vision Dropdown */}
                    <div
                        className="bg-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-lg"
                        onMouseEnter={() => toggleSection('vision')}
                        onMouseLeave={() => toggleSection(null)}
                    >
                        <button className="w-full p-6 md:p-8 text-left flex justify-between items-center focus:outline-none">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Our Vision</h2>
                            <svg
                                className={`w-6 h-6 transform transition-transform duration-500 text-yellow-600 ${openSection === 'vision' ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openSection === 'vision' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 md:px-8 pb-6 md:pb-8">
                                <p className="text-gray-700 leading-relaxed">
                                    To become Nepal's most trusted partner in crusher parts and heavy equipment solutions, recognized for our technical expertise, innovative approach, and commitment to helping clients achieve their operational goals with minimal downtime.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Values Dropdown */}
                    <div
                        className="bg-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-lg"
                        onMouseEnter={() => toggleSection('value')}
                        onMouseLeave={() => toggleSection(null)}
                    >
                        <button className="w-full p-6 md:p-8 text-left flex justify-between items-center focus:outline-none">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Our Values</h2>
                            <svg
                                className={`w-6 h-6 transform transition-transform duration-500 text-yellow-600 ${openSection === 'value' ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openSection === 'value' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 md:px-8 pb-6 md:pb-8">
                                <p className="text-gray-700 leading-relaxed">
                                     We are dedicated to quality, reliability, and innovation; delivering precision-engineered parts with speed, integrity, and a customer-first mindset to forge lasting partnerships and drive operational success.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;