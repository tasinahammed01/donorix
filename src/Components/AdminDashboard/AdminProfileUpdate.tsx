import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminProfileUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Expecting route: /admin/profile/update/:id

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch current admin data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        const data = await response.json();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          profileImage: data.profileImage || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/users/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/admin/profile");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Update Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="w-full bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/profile")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileUpdate;
