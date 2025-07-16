import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import { homeSubItems } from './homeSubItems';
// import { homeSubItems } from './Home_sub/homeSubItems';


const SearchBar = ({ items = homeSubItems, labelKey = 'name', routePrefix = '', handleScrollOrNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = searchTerm.trim()
    ? items.filter(item =>
        item[labelKey]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleClick = (item, e) => {
    setSearchTerm('');
    if (item.scrollToId && handleScrollOrNavigate) {
      e.preventDefault();
      handleScrollOrNavigate(item.scrollToId);
    }
  };

  return (
    <div className="relative w-full lg:w-64 mb-2 lg:mb-0 lg:mr-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <IoIosSearch className="absolute right-3 text-gray-500 pointer-events-none" size={20} />
      </div>

      {searchTerm.trim() && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-40 max-h-60 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Link
                key={item.id}
                to={item.route ? item.route : `${routePrefix}${item.id}`}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                onClick={(e) => handleClick(item, e)}
              >
                {item[labelKey]}
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No matching results
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <SearchBar items={homeSubItems} labelKey="name" />
    </div>
  );
};

export default App;
