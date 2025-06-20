import React, { useEffect, useState } from 'react';
import HostelCard from '../components/HostelCard';
import SearchBar from '../components/SearchBar';

function AllHostels() {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hostels`);
        const data = await response.json();
        setHostels(data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };
    fetchHostels();
  }, []);

  const handleSearch = async (searchData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hostels/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });
      const data = await response.json();
      setHostels(data);
    } catch (error) {
      console.error('Error searching hostels:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-20">
      {/* Page Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 text-center mb-6 tracking-wide">
        Explore the Best Hostels 🏨
      </h1>
      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
        Find affordable and comfortable hostel stays tailored for students and professionals
      </p>

      {/* Centered SearchBar */}
      <div className="max-w-3xl mx-auto mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Hostel Cards */}
      <div className="max-w-7xl mx-auto">
        {hostels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {hostels.map((hostel) => (
              <HostelCard key={hostel.id} {...hostel} image={hostel.images?.[0]} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-sm">
            No hostels found. Try adjusting your search!
          </p>
        )}
      </div>
    </div>
  );
}

export default AllHostels;
