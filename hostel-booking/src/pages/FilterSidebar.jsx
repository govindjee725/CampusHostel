// src/components/FilterSidebar.jsx

import React, { useState } from 'react';

const FilterSidebar = ({ onApplyFilters }) => {
  const [type, setType] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApply = () => {
    onApplyFilters({
      type,
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : Infinity,
    });
  };

  const handleClear = () => {
    setType('any');
    setMinPrice('');
    setMaxPrice('');
    onApplyFilters({ type: 'any', minPrice: 0, maxPrice: Infinity });
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Type filter */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Type of Place</label>
        <div className="flex gap-2">
          {['any', 'room', 'entire'].map((option) => (
            <button
              key={option}
              className={`px-4 py-2 border rounded-full ${
                type === option ? 'bg-blue-900 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setType(option)}
            >
              {option === 'any' ? 'Any type' : option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Price range (₹)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 px-2 py-1 border rounded"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 px-2 py-1 border rounded"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <button onClick={handleClear} className="text-sm text-red-500">
          Clear all
        </button>
        <button
          onClick={handleApply}
          className="bg-blue-900 text-white px-4 py-2 rounded-full"
        >
          Show Results
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;






 