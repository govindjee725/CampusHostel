import React from "react";
import { useNavigate } from "react-router-dom";

function HostelCard({
  id,
  _id,
  name,
  location,
  rating,
  discount,
  image,
  price,
}) {
  const navigate = useNavigate();

  // MongoDB uses _id, while some data may use id
  const hostelId = _id || id;

  const handleClick = () => {
    if (!hostelId) {
      console.error("Hostel ID is missing:", {
        id,
        _id,
        name,
      });
      return;
    }

    navigate(`/hostel/${hostelId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white text-black rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <img
        src={image || "/assets/placeholder.jpg"}
        alt={name || "Hostel"}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.currentTarget.src = "/assets/placeholder.jpg";
        }}
      />

      {/* Content */}
      <div className="p-4">

        <h3 className="font-bold text-lg">
          {name || "Hostel"}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          {location || "Location not available"}
        </p>

        {rating && (
          <p className="text-sm text-yellow-600 mt-2">
            ⭐ {rating}
          </p>
        )}

        {price && (
          <p className="text-sm font-semibold text-gray-800 mt-2">
            ₹{price}
          </p>
        )}

        {discount && (
          <p className="text-red-500 font-semibold text-sm mt-2">
            {discount}
          </p>
        )}

      </div>
    </div>
  );
}

export default HostelCard;