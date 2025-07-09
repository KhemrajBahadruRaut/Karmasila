import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaViber } from 'react-icons/fa';
import { SiGmail } from "react-icons/si";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollOrNavigate = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate("/", { state: { scrollToId: id } });
    }
  };

  return (
    <footer className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32">
          
          {/* Karmasila Logo and Contact Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-yellow-400 pb-2">
              Karmasila Enterprises
            </h3>
            <ul className="space-y-2 flex flex-col items-center text-center">
              <li>
                <p className="mb-2 text-gray-600">karmasilaenterprises@gmail.com</p>
              </li>
              <li>
                <div className="flex space-x-4 mt-2">
                  <a href="https://www.facebook.com/karmasilaenterprises" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-gray-600 hover:text-yellow-600 transition-colors">
                    <FaFacebook size={20} />
                  </a>
                  <a href="https://www.instagram.com/karmasila_enterprises/" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-gray-600 hover:text-yellow-600 transition-colors">
                    <FaInstagram size={20} />
                  </a>
                  <a href="mailto:karmasilaenterprises@gmail.com" title="Email" className="text-gray-600 hover:text-yellow-600 transition-colors">
                    <SiGmail size={20} />
                  </a>
                  <a href="viber://chat?number=+9779851352013" title="Viber" className="text-gray-600 hover:text-yellow-600 transition-colors">
                    <FaViber size={20} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-yellow-400 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-center">
              <li>
                <button onClick={() => handleScrollOrNavigate('home')} className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollOrNavigate('services')} className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollOrNavigate('catalog')} className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Catalog
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Powered By & Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-300 text-center">
          <h3 className="text-md text-gray-600 mb-2">Powered By</h3>
          <a
            href="https://gr8nepal.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-2"
            title="Visit GR8 Nepal"
          >

            <img src={assets.GR8NEPAL} alt="GR8 Nepal Logo" title="Visit GR8 Nepal" className="w-10 h-10 object-contain mx-auto" />


          </a>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Karmasila Enterprises Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
