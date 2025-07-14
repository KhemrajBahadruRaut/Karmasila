import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';

const SearchBar = ({ parts = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParts = searchTerm.trim()
    ? parts.filter(
        part =>
          part.status === "1" &&
          part.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="relative w-full lg:w-64 mb-2 lg:mb-0 lg:mr-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search parts..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <IoIosSearch className="absolute right-3 text-gray-500 pointer-events-none" size={20} />
      </div>

      {filteredParts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-40 max-h-60 overflow-y-auto">
          {filteredParts.map((part) => (
            <Link
              key={part.id}
              to={`/parts/${part.id}`}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
              onClick={() => setSearchTerm('')}
            >
              {part.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
