import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HostelDetailPage() {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/hostels/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log("HOSTEL DETAIL RESPONSE:", data);

        // Backend agar { data: {...} } return karta hai
        setHostel(data.data || data);
      } catch (err) {
        console.error("Error fetching hostel:", err);
        setError("Unable to load hostel details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-gray-600 text-lg">Loading hostel...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // No hostel
  if (!hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-gray-600">Hostel not found.</p>
      </div>
    );
  }

  // Safe images
  const images = hostel.images || [];

  return (
    <div className="min-h-screen bg-gray-50 max-w-6xl mx-auto px-4 py-8 pt-24">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {hostel.name}
        </h1>

        <p className="text-gray-500 mt-2">
          📍 {hostel.location}
        </p>
      </div>

      {/* IMAGE GRID */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Main Image */}
          <img
            src={images[0]}
            alt={hostel.name}
            className="rounded-xl w-full h-[400px] object-cover"
          />

          {/* Other Images */}
          <div className="grid grid-cols-2 gap-2">
            {images.slice(1, 5).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${hostel.name}-${index + 1}`}
                className="rounded-lg object-cover h-[190px] w-full"
              />
            ))}
          </div>

        </div>
      ) : (
        <div className="h-[300px] bg-gray-200 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      )}

      {/* DETAILS */}
      <div className="mt-8 flex flex-col md:flex-row gap-8">

        {/* LEFT */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow">

          <h2 className="text-xl font-semibold text-blue-700 uppercase">
            {t("Hostel Facilities")}
          </h2>

          {hostel.description?.length > 0 ? (
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2">
              {hostel.description.map((point, index) => (
                <li key={index}>
                  {point}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-gray-500">
              {t("noDescription")}
            </p>
          )}

          {/* Hostel Info */}
          <div className="mt-6 space-y-2 text-gray-700">

            <p>
              🏠 {hostel.beds || 0} {t("bed")}
            </p>

            <p>
              🚿 {hostel.bathrooms || 0} {t("bath")}
            </p>

            <p>
              👥 {hostel.guests || 0} {t("guests")}
            </p>

            <p>
              ⭐ {hostel.rating || "N/A"}
            </p>

            <p>
              💬 {hostel.reviews || 0} {t("reviews")}
            </p>

          </div>
        </div>

        {/* RIGHT - BOOKING */}
        <div className="bg-white p-6 rounded-xl w-full md:w-[320px] shadow space-y-4">

          {/* PRICE */}
          {hostel.price && (
            <div>
              <p className="text-gray-500 text-sm">
                Starting from
              </p>

              <p className="text-2xl font-bold">
                ₹{hostel.price}
              </p>
            </div>
          )}

          {/* WHATSAPP + CALL */}
          <div className="flex gap-2">

            <a
              href={`https://wa.me/91${hostel.phone || "8757894455"}?text=${encodeURIComponent(
                `Hi, I'm interested in your hostel "${hostel.name}"`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white text-center py-2 rounded-lg hover:bg-green-600 transition"
            >
              📱 {t("WhatsApp")}
            </a>

            <a
              href={`tel:${hostel.phone || "8757894455"}`}
              className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
            >
              📞 {t("Call")}
            </a>

          </div>

          {/* RESERVE */}
          <button
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {t("reserve")}
          </button>

        </div>
      </div>
    </div>
  );
}

export default HostelDetailPage;