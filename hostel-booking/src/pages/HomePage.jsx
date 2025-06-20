import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import HostelCard from '../components/HostelCard';
import Hostellers from '../pages/Hostellers';
import ConnectionFeatures from '../pages/ConnectionFeatures';
import ChatIntroSection from '../pages/ChatIntroSection';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [hostels, setHostels] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHostels = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hostels`);
        const data = await response.json();
        setHostels(data);
      } catch (error) {
        console.error('Error fetching all hostels:', error);
      }
    };
    fetchAllHostels();
  }, []);

  const handleSearch = async (searchData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hostels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });
      const data = await response.json();
      setHostels(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="font-sans rounded-2xl shadow-2xl pt-20">

      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white py-16 sm:py-20 md:py-32 lg:py-40 flex items-center justify-center relative"
        style={{ backgroundImage: "url('/assets/banner2.png')" }}
      >
        <div className="w-full max-w-5xl px-4 text-center flex flex-col items-center justify-center z-10">
          <SearchBar onSearch={handleSearch} />
          <p className="text-white text-sm mt-4">
            🛏️ <strong>Free Cancellation & Flexible Booking</strong> available
          </p>
        </div>
      </section>

      {/* Deals Section */}
      <section className="bg-[#4d9af2] text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
            SOME HOSTEL IN GREATER NOIDA
          </h2>

          {hostels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {(hostels.length > 5 && !showAll
                ? hostels.slice(0, 5)
                : hostels
              ).map((hostel) => (
                <HostelCard
                  key={hostel.id}
                  {...hostel}
                  image={hostel.images?.[0]}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm mt-4">No hostels found. Try a different search!</p>
          )}

          {/* Show All Button */}
          {hostels.length > 5 && !showAll && (
            <div className="mt-10 text-center">
              <button
                onClick={() => navigate('/all-hostels')}
                className="bg-white text-blue-900 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 shadow-md cursor-pointer"
              >
                All Hostel Shows
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Connection Features */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          <ConnectionFeatures />
        </div>
      </section>

      {/* About / Tagline */}
      <section className="bg-white py-12 px-4 sm:px-6" id="connect-section">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600 uppercase tracking-wider text-sm font-bold mb-2">
            This is the NEW Hostelworld
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Helping you <span className="text-pink-600">connect with hostelers.</span> Even{' '}
            <span className="text-purple-700">before</span> you get to your hostel.
          </h2>
        </div>
      </section>

      {/* Hostellers Section */}
      <section className="bg-[#7e22ce] text-white py-16 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <Hostellers />
        </div>
      </section>

      {/* Chat Intro Section */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <ChatIntroSection />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
