import { useEffect, useState } from "react";
import api from "../utils/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    api.get("/api/auth/me").then((res) => {
      setUser(res.data);
      setFormData({
        name: res.data.name,
        phone: res.data.phone || "",
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    if (image) data.append("profileImage", image);

    const res = await api.patch("/api/users/profile", data);
    setUser(res.data);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6">

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          <img
            src={user.profileImage || "/assets/avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />

          <label className="mt-2 text-blue-600 cursor-pointer">
            Change Photo
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* INFO */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            className="input"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Full Name"
          />

          <input
            className="input bg-gray-100 cursor-not-allowed"
            value={user.email}
            disabled
          />

          <input
            className="input"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone Number"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-xl">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
