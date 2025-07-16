import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets.js';

import SearchBar from './Home_sub/SearchBar.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPartsOpen, setIsPartsOpen] = useState(false);
  const [parts, setParts] = useState([]);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isPartsActive = location.pathname.startsWith("/parts/");

  useEffect(() => {
    fetch("https://karmasila.com.np/karmashila/parts/get_nav_parts.php")
    // fetch("http://localhost/karmashila/parts/get_nav_parts.php")
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

  const activeParts = parts.filter((part) => parseInt(part.status) === 1);

  const handleScrollOrNavigate = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollToId: id } });
    }
  };

  return (
    <nav className="2xl:container mx-auto">
  <div className="mx-auto px-4">
    <div className="flex justify-between h-24 items-center"> {/* Reduced height for better proportions */}
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" title="Home page">
          <img
            src={assets.Karmasila_logo}
            alt="Karmasila logo"
            title="Karmasila logo"
            className="logo h-20 lg:h-28"
          />
        </Link>
      </div>

      {/* Hamburger - Mobile Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menu - Desktop & Mobile */}
      <div
        className={`${isOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row absolute lg:static top-20 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-20 border-t lg:border-none shadow-lg lg:shadow-none`}
      >
        <div className="flex flex-col lg:flex-row w-full lg:items-center lg:space-x-4 xl:space-x-6"> {/* Responsive spacing */}
          {/* Search Bar - Adjusted for better alignment */}
          <div className="px-4 lg:px-0 py-2 lg:py-0 lg:mr-4">
            <SearchBar navParts={activeParts} />
          </div>

          {/* Navigation Links with responsive padding */}
          <Link
            to="/"
            className={`px-4 py-3 lg:py-2 lg:px-2 transition-colors hover:bg-gray-100 ${isActive("/") ? "text-black bg-gray-300 rounded-sm" : "text-black"}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/about-us"
            title="About us"
            className={`px-4 py-3 lg:py-2 lg:px-2 transition-colors hover:bg-gray-100 ${isActive("/about-us") ? "text-black bg-gray-300 rounded-sm" : "text-black"}`}
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>

          <button
            onClick={() => {
              handleScrollOrNavigate("services");
              setIsOpen(false);
            }}
            className="px-4 py-3 lg:py-2 lg:px-2 text-black hover:bg-gray-100 transition-colors text-left w-full lg:w-auto"
          >
            Our Services
          </button>

          {/* Parts Dropdown with better responsive styling */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsPartsOpen(!isPartsOpen)}
              className={`flex items-center px-4 py-3 lg:py-2 lg:px-2 transition-colors hover:bg-gray-100 w-full lg:w-auto ${isPartsActive ? "text-black bg-gray-300 rounded-sm" : "text-black"}`}
            >
              Parts
              <svg
                className={`ml-1 h-4 w-4 transform transition-transform ${isPartsOpen ? "rotate-180" : ""}`}
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
              <div className="absolute left-0 lg:left-auto lg:right-0 mt-0 lg:mt-2 bg-white border rounded-md shadow-lg z-30 min-w-[12rem] max-w-md p-2">
                {activeParts.length > 0 ? (
                  <div className="max-h-[80vh] overflow-y-auto">
                    {activeParts.map((part) => (
                      <Link
                        key={part.id}
                        to={`/parts/${part.id}`}
                        className="block px-4 py-2 text-black text-sm hover:bg-gray-100 whitespace-normal break-words"
                        onClick={() => {
                          setIsPartsOpen(false);
                          setIsOpen(false);
                        }}
                      >
                        {part.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-2 text-gray-500">No parts available</div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              handleScrollOrNavigate("import-export");
              setIsOpen(false);
            }}
            className="px-4 py-3 lg:py-2 lg:px-2 text-black hover:bg-gray-100 transition-colors text-left w-full lg:w-auto"
          >
            Import & Export
          </button>

          <Link
            to="/blog"
            title="Visit our blog"
            className={`px-4 py-3 lg:py-2 lg:px-2 transition-colors hover:bg-gray-100 ${isActive("/blog") ? "text-black bg-gray-300 rounded-sm" : "text-black"}`}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>

          <Link
            to="/contact"
            title="Contact us"
            className={`px-4 py-3 lg:py-2 lg:px-2 transition-colors hover:bg-gray-100 ${isActive("/contact") ? "text-black bg-gray-300 rounded-sm" : "text-black"}`}
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
