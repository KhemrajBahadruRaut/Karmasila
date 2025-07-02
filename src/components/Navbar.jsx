import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [isPartsOpen, setIsPartsOpen] = useState(false);
  const [parts, setParts] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
  fetch("https://karmasila.com.np/karmashila/parts/get_nav_parts.php")
    .then((res) => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json();
    })
    .then((data) => setParts(data))
    .catch((err) => console.error("Failed to load parts:", err));
}, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPartsOpen(false);
      }
    };

    if (isPartsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPartsOpen]);

  // Filter active parts only
  const activeParts = parts.filter((part) => parseInt(part.status) === 1);

  // this is for parts
  


  return (
    <nav className=" 2xl:container mx-auto">
      <div className=" mx-auto px-4">
        <div className="flex justify-between h-24 items-center">
          {/* Logo - stays on the left */}
          <div className="flex items-center h-24 w-xlg">
            <Link to='/'>
              <button>
                <img src={assets.Full_logo} alt="Karmasila logo" className="logo bg-white" />
              </button>
            </Link>
          </div>

          {/* Desktop Menu - centered */}
          <div className="hidden lg:flex flex-grow  justify-end items-center">
            <div className="flex space-x-2 items-center">
              <Link
                to="/"
                className="px-4 py-2 rounded-md text-base text-black font-semibold hover:bg-gray-100 transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById('about-us');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-md text-base text-black font-semibold hover:bg-gray-100 transition-colors in-line"
              >
                About Us
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-md text-base text-black font-semibold hover:bg-gray-100 transition-colors"
              >
                Our Services
              </button>

              <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsPartsOpen(!isPartsOpen)}
              className="px-4 py-2 rounded-md text-base text-black font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              Parts
              <svg
                className={`ml-1 h-4 w-4 text-gray-600 transform transition-transform ${
                  isPartsOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isPartsOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
                {activeParts.length > 0 ? (
                  activeParts.map((part) => (
                    <Link
                      key={part.id}
                      to={`/parts/${part.id}`} // 👈 Use ID directly
                      className="block px-4 py-2 text-black text-sm hover:bg-gray-100"
                      onClick={() => setIsPartsOpen(false)}
                    >
                      {part.name}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No parts available
                  </div>
                )}
              </div>
            )}
          </div>


              <button
                onClick={() => {
                  const el = document.getElementById('import-export');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-md text-base text-black font-semibold hover:bg-gray-100 transition-colors"
              >
                Import & Export
              </button>

           
              
              <Link
                to="/blog"
                className="px-4 py-2 rounded-md text-base font-semibold text-black hover:bg-gray-100 transition-colors"
              >
                Blog
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-md text-base text-black font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </button>

            </div>
          </div>



          {/* Mobile menu button */}
          <div className="lg:hidden  items-center  ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600  hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className=" bg-white text-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mb-4">
              {/* <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => {
                  // Handle search functionality
                  console.log('Searching for:', searchQuery);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            */}
            </div> 
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById('about-us');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            >
              About Us
            </button>
             <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsPartsOpen(!isPartsOpen)}
                  className="px-4 py-2 rounded-md text-base text-black font-semibold hover:bg-gray-100 transition-colors flex items-center"
                >
                  Parts
                  <svg
                    className={`ml-1 h-4 w-4 text-gray-600 transform transition-transform ${isPartsOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isPartsOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                    <Link
                      to="/"
                      className="block px-4 py-2 text-black text-sm hover:bg-gray-100"
                      onClick={() => setIsPartsOpen(false)}
                    >
                      Jaw Crusher Spare Parts
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-black text-sm hover:bg-gray-100"
                      onClick={() => setIsPartsOpen(false)}
                    >
                      Cone Crusher Spare Parts
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-black text-sm hover:bg-gray-100"
                      onClick={() => setIsPartsOpen(false)}
                    >
                      Impact Crusher Spare Parts
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-black text-sm hover:bg-gray-100"
                      onClick={() => setIsPartsOpen(false)}
                    >
                      Wear Liner Plates For Chutes
                    </Link>

                    <Link
                      to="/"
                      className="block px-4 py-2 text-black text-sm hover:bg-gray-100"
                      onClick={() => setIsPartsOpen(false)}
                    >
                      Rubber Liners
                    </Link>

                    <Link
                      to="/"
                      className="block px-4 py-2 text-black text-sm hover:bg-gray-100"
                      onClick={() => setIsPartsOpen(false)}
                    >
                      Bolts and Nuts
                    </Link>
                  </div>
                )}
              </div>
            <Link
              to="/Import&Export"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Import & Export
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-sm hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;