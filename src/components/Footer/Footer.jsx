import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaViber } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32">
          {/* Karmasila Logo and Social */}
          <div className="flex flex-col items-center">
            <div className="">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-yellow-400 pb-2">
              Karmasila Enterprises
            </h3>
            </div>
          
              <ul className="space-y-2 flex flex-col items-center text-center">
                <li> <p className="mb-2 text-gray-600 not-italic text-center md:text-left">karmasilaenterprises@gmail.com</p></li>
              
              {/* <li><a 
                href="https://wa.me/9779851352013" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex text-gray-600 items-center hover:text-green-600 transition-colors duration-200"
              >
                <IoLogoWhatsapp className="mr-2" size={18} />
                <span>

                WhatsApp Chat
                </span>
              </a></li> */}
              
              
            
            <li>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.facebook.com/karmasilaenterprises" target="_blank" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/karmasila_enterprises/" target="_blank" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" target="_blank" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <SiGmail  size={20} />
              </a>
              <a href="#" target="_blank" className="text-gray-600 hover:text-yellow-600 transition-colors">
                <FaViber  size={20} />
              </a>
            </div>
            </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center ">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-yellow-400 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-center">
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('home');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  Home
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('about-us');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  About Us
                </button>
              </li> */}
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  Catalog
                </button>
              </li>
              {/* <li>
                <Link to="/" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Blog
                </Link>
              </li> */}
              <li>
                <Link to="/" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-300">
          
            {/* Powered By */}
          <div className="flex flex-col items-center">
            <h3 className="text-md text-gray-600">
              Powered By
            </h3>
            <div className="flex items-center space-x-3">
              
              <div>
                <a
                  href="https://gr8nepal.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-yellow-600 transition-colors font-medium"
                >
                  <img
                src={assets.GR8NEPAL}
                alt="GR8 Logo"
                className="w-10 h-10 object-contain"
              />
                </a>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Karmasila Enterprises Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;