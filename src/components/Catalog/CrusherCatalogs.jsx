import React, { useState } from 'react';
import { assets } from '../../assets/assets.js'; 
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Quotebtn from './Quotebtn.jsx';

const CrusherCatalogs = () => {
  const [showAllItems, setShowAllItems] = useState(false);
  const navigate = useNavigate();

  const crusherItems = [
    {
      id: 1,
      title: "Jaw Crusher Plates",
      image: assets.jaw_crusher_plate,
    },
    {
      id: 2,
      title: "Cone Crusher Mantles",
      image: assets.cone_crusher,
    },
    {
      id: 3,
      title: "Impact Crusher Blow Bars",
      image: assets.blow_bars,
    },
    {
      id: 4,
      title: "Single toggle jaw Crushers",
      image: assets.jaw_crusher_toggle,
    },
    {
      id: 5,
      title: "Vibrating Screen Meshes",
      image: assets.Vibrating_screen_mesh,
    },
    {
      id: 6,
      title: "Double toggle jaw Crushers",
      image: assets.jaw_crusher_double,
    }
  ];

  // Get items to display based on state
  const displayedItems = showAllItems ? crusherItems : crusherItems.slice(0, 3);

  // const handleRequestQuote = (itemId) => {
  //    navigate("/request-quote", { state: { itemId } });
  //   console.log(`Requesting quote for item ${itemId}`);
  // };

  const toggleShowAll = () => {
    setShowAllItems(!showAllItems);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Crusher Parts Catalog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our selection of high-quality crusher parts and components
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image container */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col justify-between h-36">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  {/* <p className="text-gray-600 text-sm mb-4">
                    {item.description || 'High-quality crusher component.'}
                  </p> */}
                </div>

                
                <Quotebtn />
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <button 
            onClick={toggleShowAll}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-8 rounded-md text-md transition-colors duration-300"
          >
            {showAllItems ? 'Show Less' : 'Show more'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrusherCatalogs;