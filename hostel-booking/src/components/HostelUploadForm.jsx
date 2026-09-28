import React, { useRef,useState } from "react";
import axios from "axios";

const HostelUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    beds: "",
    bathrooms: "",
    guests: "",
    description: ""
  });
const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // --------------------
  // HANDLE INPUT CHANGE
  // --------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --------------------
  // HANDLE IMAGE SELECT
  // --------------------
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // allow selecting images multiple times
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  // --------------------
  // REMOVE IMAGE
  // --------------------
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // --------------------
  // SUBMIT FORM
  // --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.price) {
      return setStatus("❌ Please fill required fields");
    }

    if (images.length === 0) {
      return setStatus("❌ Please select at least one image");
    }

    setLoading(true);
    setStatus("Uploading hostel...");

    const data = new FormData();

    // basic fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "description") data.append(key, value);
    });

    // description → array
    formData.description
      .split("\n")
      .filter(Boolean)
      .forEach((line) => data.append("description", line));

    // images
    images.forEach((img) => data.append("images", img));

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/hostels`,
        data
      );
      setStatus("✅ Hostel uploaded successfully");

      setFormData({
        name: "",
        location: "",
        price: "",
        beds: "",
        bathrooms: "",
        guests: "",
        description: ""
      });
      setImages([]);
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Add New Hostel 🏨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* BASIC INFO */}
          <section>
            <h3 className="font-semibold text-lg mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" name="name" placeholder="Hostel Name *" value={formData.name} onChange={handleChange} />
              <input className="input" name="location" placeholder="Location *" value={formData.location} onChange={handleChange} />
            </div>
          </section>

          {/* CAPACITY */}
          <section>
            <h3 className="font-semibold text-lg mb-3">Capacity & Pricing</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input className="input" type="number" name="price" placeholder="Price *" value={formData.price} onChange={handleChange} />
              <input className="input" type="number" name="beds" placeholder="Beds" value={formData.beds} onChange={handleChange} />
              <input className="input" type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} />
              <input className="input" type="number" name="guests" placeholder="Guests" value={formData.guests} onChange={handleChange} />
            </div>
          </section>

          {/* DESCRIPTION */}
          <section>
            <h3 className="font-semibold text-lg mb-3">Description</h3>
            <textarea
              rows="4"
              className="input resize-none"
              name="description"
              placeholder="One facility per line"
              value={formData.description}
              onChange={handleChange}
            />
          </section>

          {/* IMAGES */}
          <section>
            <h3 className="font-semibold text-lg mb-3">Hostel Images</h3>

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Add Image Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition cursor-pointer"
            >
              ➕ Add Images
            </button>


            {/* IMAGE PREVIEW */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="h-28 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
          >
            {loading ? "Uploading..." : "Add Hostel"}
          </button>

          {status && <p className="text-center font-medium">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default HostelUploadForm;
