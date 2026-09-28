import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location.trim()) return; // 🛑 prevent empty search

    onSearch({ location });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4 w-full max-w-3xl"
    >
      {/* Location */}
      <div className="flex items-center gap-2 flex-1">
        📍
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-black"
        />
      </div>

      <button
        type="submit"
        className="bg-[#4d9af2] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Let’s go!
      </button>
    </form>
  );
}

export default SearchBar;
