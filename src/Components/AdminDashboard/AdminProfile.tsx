import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string;
  role: string;
  createdAt?: string;
}

const AdminProfile = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [fetchUsers, setFetchUsers] = useState<User[]>([]);
  const [admin, setAdmin] = useState<User | null>(null);

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/users");
        setFetchUsers(response.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  // Find logged-in admin
  useEffect(() => {
    if (fetchUsers.length > 0 && user) {
      const adminUser = fetchUsers.find((u) => u.email === user.email) || null;
      setAdmin(adminUser);
    }
  }, [fetchUsers, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10 font-semibold">
        {error}
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="text-center text-gray-400 mt-10 font-semibold">
        Admin not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-xl p-8 relative">
        {/* Edit Button */}
        <Link to={`/dashboard/admin/profile/update/${admin._id}`}>
          <button className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition">
            Edit Profile
          </button>
        </Link>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={admin.profileImage}
            alt="Admin"
            className="w-32 h-32 rounded-full border-4 border-red-500 object-cover"
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
            <p className="text-gray-400">{admin.phone || "-"}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Location</h2>
            <p className="text-gray-400">{admin.location || "-"}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Joined</h2>
            <p className="text-gray-400">
              {admin.createdAt
                ? new Date(admin.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
