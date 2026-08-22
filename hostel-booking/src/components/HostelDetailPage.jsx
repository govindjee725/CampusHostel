import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL;

function HostelDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch hostel details
  // ==========================================
  useEffect(() => {
    const fetchHostel = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching hostel:", `${API_URL}/hostels/${id}`);

        const response = await fetch(`${API_URL}/hostels/${id}`);

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        console.log("Hostel details:", data);

        // Handle both direct object and { data: object }
        const hostelData = data?.data || data;

        setHostel(hostelData);
      } catch (err) {
        console.error("Error fetching hostel:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHostel();
    }
  }, [id]);

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <p className="text-xl text-blue-600 font-semibold">
          {t("loading") || "Loading hostel..."}
        </p>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================
  if (error || !hostel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="text-center">

          <p className="text-red-500 text-xl font-semibold">
            Failed to load hostel
          </p>

          <p className="text-gray-600 mt-2">
            {error || "Hostel not found"}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // Images
  // ==========================================
  const images = Array.isArray(hostel.images)
    ? hostel.images
    : [];

  const mainImage = images.length > 0
    ? images[0]
    : "/assets/placeholder.jpg";

  const additionalImages = images.slice(1, 5);

  // ==========================================
  // Phone
  // ==========================================
  const phone = hostel.phone || "8757894455";

  // ==========================================
  // Description
  // ==========================================
  const description = Array.isArray(hostel.description)
    ? hostel.description
    : hostel.description
      ? [hostel.description]
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ==========================================
            Hostel Header
        ========================================== */}
        <div className="mb-6">

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {hostel.name}
          </h1>

          <p className="text-gray-500 mt-2">
            📍 {hostel.location}
          </p>

        </div>


        {/* ==========================================
            IMAGE GALLERY
        ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Main Image */}
          <div className="h-[300px] sm:h-[400px] md:h-[500px]">

            <img
              src={mainImage}
              alt={hostel.name || "Hostel"}
              className="w-full h-full object-cover rounded-2xl shadow-md"
              onError={(e) => {
                e.currentTarget.src = "/assets/placeholder.jpg";
              }}
            />

          </div>


          {/* Additional Images */}
          <div className="grid grid-cols-2 gap-3">

            {additionalImages.length > 0 ? (

              additionalImages.map((img, index) => (

                <img
                  key={index}
                  src={img}
                  alt={`${hostel.name} ${index + 2}`}
                  className="w-full h-[145px] sm:h-[195px] md:h-[242px] object-cover rounded-xl shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/placeholder.jpg";
                  }}
                />

              ))

            ) : (

              <div className="col-span-2 flex items-center justify-center bg-gray-100 rounded-xl text-gray-500">
                No additional images
              </div>

            )}

          </div>

        </div>


        {/* ==========================================
            DETAILS
        ========================================== */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ==========================================
              LEFT - Hostel Information
          ========================================== */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">

            <h2 className="text-2xl font-bold text-blue-700">
              {t("Hostel Facilities") || "Hostel Facilities"}
            </h2>


            {/* Description */}
            {description.length > 0 ? (

              <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">

                {description.map((point, index) => (
                  <li key={index}>
                    {point}
                  </li>
                ))}

              </ul>

            ) : (

              <p className="mt-4 text-gray-500">
                {t("noDescription") || "No description available."}
              </p>

            )}


            {/* Hostel Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">

              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-2xl">🛏️</p>
                <p className="font-bold text-gray-800 mt-1">
                  {hostel.beds || 0}
                </p>
                <p className="text-sm text-gray-500">
                  {t("bed") || "Beds"}
                </p>
              </div>


              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-2xl">🚿</p>
                <p className="font-bold text-gray-800 mt-1">
                  {hostel.bathrooms || 0}
                </p>
                <p className="text-sm text-gray-500">
                  {t("bath") || "Bathrooms"}
                </p>
              </div>


              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-2xl">👥</p>
                <p className="font-bold text-gray-800 mt-1">
                  {hostel.guests || 0}
                </p>
                <p className="text-sm text-gray-500">
                  {t("guests") || "Guests"}
                </p>
              </div>


              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-2xl">⭐</p>
                <p className="font-bold text-gray-800 mt-1">
                  {hostel.reviews || 0}
                </p>
                <p className="text-sm text-gray-500">
                  {t("reviews") || "Reviews"}
                </p>
              </div>

            </div>

          </div>


          {/* ==========================================
              RIGHT - Booking Card
          ========================================== */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">

              {/* Price */}
              {hostel.price && (
                <div className="mb-5">

                  <p className="text-sm text-gray-500">
                    Starting from
                  </p>

                  <p className="text-3xl font-extrabold text-gray-900">
                    ₹{hostel.price}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      
                    </span>
                  </p>

                </div>
              )}


              {/* Reserve */}
              <button
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
              >
                {t("reserve") || "Reserve"}
              </button>


              {/* WhatsApp + Call */}
              <div className="flex gap-3 mt-3">

                <a
                  href={`https://wa.me/91${phone}?text=${encodeURIComponent(
                    `Hi, I'm interested in your hostel "${hostel.name}"`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-600 transition"
                >
                  📱 {t("WhatsApp") || "WhatsApp"}
                </a>


                <a
                  href={`tel:${phone}`}
                  className="flex-1 bg-blue-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
                >
                  📞 {t("Call") || "Call"}
                </a>

              </div>


              {/* Cancellation */}
              <div className="mt-5 p-3 bg-green-50 rounded-xl">

                <p className="text-sm text-green-700 font-medium">
                  🛏️ Free Cancellation & Flexible Booking
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HostelDetailPage;