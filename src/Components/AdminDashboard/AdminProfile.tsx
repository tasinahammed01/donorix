import { Link, useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();

  // Example admin data (replace with dynamic data from your backend)
  const admin = {
    name: "John Doe",
    email: "admin@bloodbank.org",
    role: "Administrator",
    phone: "+1 234 567 890",
    location: "New York, USA",
    joined: "January 15, 2024",
    profileImage: "https://via.placeholder.com/150", // Replace with admin's image URL
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-xl p-8 relative">
        {/* Edit Button */}
        <Link to={`/dashboard/admin/profile/update/${admin._id}`}>
          <button
            onClick={() => navigate("/admin/profile/update")}
            className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
          >
            Edit Profile
          </button>
        </Link>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={admin.profileImage}
            alt="Admin"
            className="w-32 h-32 rounded-full border-4 border-red-500"
          />
          <div>
            <h1 className="text-3xl font-bold">{admin.name}</h1>
            <p className="text-red-400 text-lg">{admin.role}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Email</h2>
            <p className="text-gray-400">{admin.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Phone</h2>
            <p className="text-gray-400">{admin.phone}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Location</h2>
            <p className="text-gray-400">{admin.location}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Joined</h2>
            <p className="text-gray-400">{admin.joined}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
