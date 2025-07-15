import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Quotebtn from './Quotebtn.jsx';

const CrusherCatalogs = () => {
  const [crusherItems, setCrusherItems] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);
  // const BASE_URL = "http://localhost/karmashila/crusher_catalogs"; 
  const BASE_URL = "https://karmasila.com.np/karmashila/crusher_catalogs"; 
  useEffect(() => {
    const fetchCrusherItems = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/get_all.php`);
        setCrusherItems(res.data);
      } catch (error) {
        console.error("Failed to fetch crusher items:", error);
      }
    };

    fetchCrusherItems();
  }, []);

  const displayedItems = showAllItems ? crusherItems : crusherItems.slice(0, 4);

  const toggleShowAll = () => setShowAllItems(!showAllItems);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Crusher Parts Catalog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our selection of high-quality crusher parts and components
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={`${BASE_URL}/uploads/${item.image}`}
                  alt={item.alt}
                  title={item.title}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex flex-col justify-between h-36">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <Quotebtn />
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        {crusherItems.length > 4 && (
          <div className="mt-8 text-center">
            <button 
              onClick={toggleShowAll}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-8 rounded-md text-md transition-colors duration-300"
            >
              {showAllItems ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrusherCatalogs;
