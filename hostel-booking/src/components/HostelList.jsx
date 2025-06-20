// components/HostelList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HostelCard from './HostelCard';

function HostelList() {
  const [allHostels, setAllHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/hostels')
      .then(res => {
        setAllHostels(res.data);
        setFilteredHostels(res.data); // Show all initially
      })
      .catch(err => console.error('Error fetching hostels:', err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setFilteredHostels(allHostels); // Show all if input is cleared
    } else {
      const filtered = allHostels.filter(hostel =>
        hostel.name.toLowerCase().includes(value) ||
        hostel.location.toLowerCase().includes(value)
      );
      setFilteredHostels(filtered);
    }
  };

  return (
    <div className="p-6">
      {/* <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 rounded border border-gray-300 text-black"
        />
      </div> */}

      {filteredHostels.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredHostels.map((hostel) => (
            <HostelCard key={hostel.id} {...hostel} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No hostels found. Try a different search!</p>
      )}
    </div>
  );
}

export default HostelList;
