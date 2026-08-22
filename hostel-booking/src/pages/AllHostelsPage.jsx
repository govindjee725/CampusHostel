import React, { useEffect, useState } from "react";
import HostelCard from "../components/HostelCard";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
const API_URL = `${import.meta.env.VITE_API_URL}`;

function AllHostelsPage() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================================
  // Fetch all hostels
  // ================================
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        console.log("Fetching:", `${API_URL}/api/hostels`);

        const response = await fetch(`${API_URL}/api/hostels`);

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        console.log("Hostel API response:", data);
        console.log("Is array:", Array.isArray(data));

        // Your current backend returns a direct array
        const hostelData = Array.isArray(data)
          ? data
          : data?.data || [];

        console.log("Hostels received:", hostelData.length);

        setHostels(hostelData);

      } catch (error) {
        console.error("Error fetching hostels:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);


  // ================================
  // Search hostels
  // ================================
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


  // ================================
  // Loading
  // ================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <p className="text-xl text-blue-600 font-semibold">
          Loading hostels...
        </p>
      </div>
    );
  }


  // ================================
  // Error
  // ================================
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">
            Failed to load hostels
          </p>

          <p className="text-gray-600 mt-2">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-20">

      {/* ================================
          Heading
      ================================= */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 text-center mb-6 tracking-wide">
        Explore the Best Hostels 🏨
      </h1>

      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
        Find affordable and comfortable hostel stays tailored for students
        and professionals
      </p>


      {/* ================================
          Search
      ================================= */}
      <div className="max-w-3xl mx-auto mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>


      {/* ================================
          Hostel Cards
      ================================= */}
      <div className="max-w-7xl mx-auto">

        {hostels.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {hostels.map((hostel) => (

              <HostelCard
                key={hostel._id || hostel.id}
                {...hostel}

                // First Image
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

          <p className="text-center text-gray-600 text-sm">
            No hostels found. Try adjusting your search!
          </p>

        )}

      </div>

    </div>
  );
}

export default AllHostelsPage;