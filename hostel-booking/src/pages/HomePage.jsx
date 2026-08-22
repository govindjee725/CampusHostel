import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import HostelCard from "../components/HostelCard";
import Hostellers from "../pages/Hostellers";
import ConnectionFeatures from "../pages/ConnectionFeatures";
import ChatIntroSection from "../pages/ChatIntroSection";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ==========================================
  // Fetch all hostels when HomePage loads
  // ==========================================
  useEffect(() => {
    const fetchAllHostels = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching:", `${API_URL}/api/hostels`);

        const response = await fetch(`${API_URL}/api/hostels`);

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        console.log("Hostel API response:", data);

        const hostelData = Array.isArray(data)
          ? data
          : data?.data || [];

        console.log("Hostels received:", hostelData.length);

        setHostels(hostelData);
      } catch (error) {
        console.error("Error fetching all hostels:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllHostels();
  }, []);

  // ==========================================
  // Search hostels
  // ==========================================
  const handleSearch = async (searchData) => {
    try {
      setLoading(true);
      setError("");

      console.log("Searching:", searchData);

      const response = await fetch(
        `${API_URL}/api/hostels/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchData),
        }
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();

      console.log("Search response:", data);

      const hostelData = Array.isArray(data)
        ? data
        : data?.data || [];

      setHostels(hostelData);
    } catch (error) {
      console.error("Error searching hostels:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans rounded-2xl shadow-2xl pt-20">

      {/* ==========================================
          Hero Section
      ========================================== */}
      <section
  className="relative w-full min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] bg-cover bg-center flex items-center justify-center text-white"
  style={{
    backgroundImage: "url('/assets/banner2.png')",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/20"></div>

  <div className="relative z-10 w-full max-w-5xl px-4 text-center flex flex-col items-center justify-center">

    <SearchBar onSearch={handleSearch} />

    <p className="text-white text-sm mt-4">
      🛏️{" "}
      <strong>
        Free Cancellation & Flexible Booking
      </strong>{" "}
      available
    </p>

  </div>
</section>

      {/* ==========================================
          Deals / Hostels Section
      ========================================== */}
      <section className="bg-[#4d9af2] text-white py-9 px-2 sm:px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
            SOME HOSTELS IN GREATER NOIDA
          </h2>

          {/* Loading */}
          {loading && (
            <div className="text-center py-10">
              <p className="text-white text-lg font-semibold">
                Loading hostels...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center py-10">

              <p className="text-red-100 text-lg font-semibold">
                Failed to load hostels
              </p>

              <p className="text-white/80 mt-2">
                {error}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Retry
              </button>

            </div>
          )}

          {/* Hostel Cards */}
          {!loading && !error && (
            <>
              {hostels.length > 0 ? (

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

                  {hostels.slice(0, 5).map((hostel) => (

                    <HostelCard
                      key={hostel._id || hostel.id}
                      {...hostel}
                      image={
                        hostel.images &&
                        hostel.images.length > 0
                          ? hostel.images[0]
                          : null
                      }
                    />

                  ))}

                </div>

              ) : (

                <p className="text-center text-sm mt-4">
                  No hostels found. Try a different search!
                </p>

              )}

              {/* View All */}
              {hostels.length > 5 && (
                <div className="mt-10 text-center">

                  <button
                    onClick={() => navigate("/all-hostels")}
                    className="bg-white text-blue-900 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 shadow-md cursor-pointer"
                  >
                    View All Hostels
                  </button>

                </div>
              )}

            </>
          )}

        </div>
      </section>

      {/* ==========================================
          Connection Features
      ========================================== */}
      <section className="bg-white py-16 px-4 sm:px-6">

        <div className="relative z-10 max-w-7xl mx-auto">
          <ConnectionFeatures />
        </div>

      </section>

      {/* ==========================================
          About / Tagline
      ========================================== */}
      <section
        className="bg-white py-12 px-4 sm:px-6"
        id="connect-section"
      >

        <div className="max-w-5xl mx-auto text-center">

          <p className="text-gray-600 uppercase tracking-wider text-sm font-bold mb-2">
            This is the NEW Hostelworld
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">

            Helping you{" "}

            <span className="text-pink-600">
              connect with hostelers.
            </span>{" "}

            Even{" "}

            <span className="text-purple-700">
              before
            </span>{" "}

            you get to your hostel.

          </h2>

        </div>

      </section>

      {/* ==========================================
          Hostellers Section
      ========================================== */}
      <section className="bg-[#7e22ce] text-white py-16 px-4 sm:px-6 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto">
          <Hostellers />
        </div>

      </section>

      {/* ==========================================
          Chat Intro Section
      ========================================== */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto">
          <ChatIntroSection />
        </div>

      </section>

    </div>
  );
}

export default HomePage;