import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [minRating, setMinRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    onSearch({
      location,
      checkIn,
      checkOut,
      guests,
      minRating,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md shadow-lg p-4 flex flex-wrap justify-between items-center w-full max-w-3xl space-x-2"
    >
      <div className="flex items-center gap-2">
        📍
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent focus:outline-none placeholder:text-gray-500 text-black"
        />
      </div>

      <div className="flex items-center gap-2 border-l pl-4 text-black">
        📅
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="bg-transparent focus:outline-none "
        />
      </div>

      <div className="flex items-center gap-2 border-l pl-4 text-black">
        📅
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="bg-transparent focus:outline-none"
        />
      </div>

      

      

      <button
  type="submit"
  className="ml-auto bg-[#4d9af2] text-white px-6 py-2 rounded-md hover:bg-[#64b191] transition"
>
  Let's go!
</button>

    </form>
  );
}

export default SearchBar;
