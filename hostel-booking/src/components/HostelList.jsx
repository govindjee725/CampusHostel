// components/HostelList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import HostelCard from "./HostelCard";

function HostelList() {
  const [allHostels, setAllHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching hostels...");

        const response = await axios.get(
          import.meta.env.VITE_API_URL/hostels
        );

        console.log("Backend response:", response.data);

        // Backend currently returns:
        // [
        //   { id, name, location, ... },
        //   { id, name, location, ... }
        // ]

        const hostels = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        console.log("Hostels received:", hostels);
        console.log("Total hostels:", hostels.length);

        setAllHostels(hostels);
        setFilteredHostels(hostels);

      } catch (err) {
        console.error("Error fetching hostels:", err);

        setError(
          err.response?.data?.message ||
          "Unable to fetch hostels from server."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);


  // Search hostels
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredHostels(allHostels);
      return;
    }

    const filtered = allHostels.filter((hostel) => {
      const name = hostel.name?.toLowerCase() || "";
      const location = hostel.location?.toLowerCase() || "";

      return (
        name.includes(value) ||
        location.includes(value)
      );
    });

    setFilteredHostels(filtered);
  };


  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-gray-600">
          Loading hostels...
        </p>
      </div>
    );
  }


  // Error
  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="p-6">

      {/* Search */}
      <div className="max-w-4xl mx-auto mb-6">

        <input
          type="text"
          placeholder="Search by hostel name or location..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg border border-gray-300 text-black outline-none focus:ring-2 focus:ring-blue-400"
        />

      </div>


      {/* Result count */}
      {allHostels.length > 0 && (
        <p className="text-center text-gray-600 mb-6">
          Showing {filteredHostels.length} of {allHostels.length} hostels
        </p>
      )}


      {/* Hostel cards */}
      {filteredHostels.length > 0 ? (

        <div className="flex flex-wrap gap-6 justify-center">

          {filteredHostels.map((hostel) => (

            <HostelCard
              key={hostel._id || hostel.id}
              {...hostel}
            />

          ))}

        </div>

      ) : (

        <div className="text-center py-10">

          <p className="text-gray-600 text-lg">
            No hostels found.
          </p>

          {searchTerm && (
            <p className="text-gray-500 mt-2">
              Try searching for another hostel or location.
            </p>
          )}

        </div>

      )}

    </div>
  );
}

export default HostelList;