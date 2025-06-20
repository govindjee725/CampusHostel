// SearchResults.jsx
import React from 'react';

function SearchResults({ results }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {results.map((hostel) => (
        <div key={hostel.id} className="border rounded-xl shadow-lg p-4 flex">
          <img src={hostel.image} alt={hostel.name} className="w-40 h-32 object-cover rounded" />
          <div className="ml-4">
            <h2 className="text-xl font-bold">{hostel.name}</h2>
            <p className="text-gray-600">{hostel.location}</p>
            <p className="text-yellow-500 font-semibold">⭐ {hostel.rating} ({hostel.reviews} reviews)</p>
            <p className="text-green-500">-{hostel.discount}% Discount</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
