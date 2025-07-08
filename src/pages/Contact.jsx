import React from 'react';
import Navbar from '../components/Navbar';
import { IoIosCall } from 'react-icons/io';
import { IoLocation, IoTime } from 'react-icons/io5';
import Footer from '../components/Footer/Footer';

const Contact = () => {
  return (
    <>
      <div className="bg-white">
        <Navbar />
      </div>

      <div className="bg-white text-black">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-black mb-12 border-b-4 border-yellow-300 pb-2 text-center">
            Contact Us
          </h1>

          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            {/* Left Side - Contact Info */}
            <div className="flex flex-col flex-1 space-y-6">
              {/* Contact Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full">
                {/* <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">CONTACT</h2> */}
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <IoIosCall /> Phone
                    </h3>
                    <p className="text-gray-600">+977 (985) 1352013</p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <IoLocation /> Location
                    </h3>
                    <p className="text-gray-600">Sukhedhara, Kathmandu</p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <IoTime /> Working Hours
                    </h3>
                    <p className="text-gray-600">10 A.M to 6 P.M (Sun to Fri)</p>
                  </div>
                </div>
              </div>

              {/* Always Show Map */}
              <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
                <div className="h-64 bg-gray-200 rounded-md overflow-hidden">
                  <iframe
                    title="Company Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.637132472818!2d85.34384587519509!3d27.728487924559197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196796c2dde3%3A0x36a3b22f875af582!2sSukedhara%20Communication!5e0!3m2!1sen!2snp!4v1751367998251!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col justify-between">
                <form className="space-y-6">
                  <div>
                    <label className="block text-black font-medium mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-black font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-black font-medium mb-2">Message</label>
                    <textarea
                      rows="5"
                      placeholder="Your message..."
                      className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
