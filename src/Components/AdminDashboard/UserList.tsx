import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/users"); // Replace with your API
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        await axios.delete(`http://localhost:5000/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (err) {
      alert("Delete failed!");
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const roleMatch = roleFilter === "all" || user.role === roleFilter;
    return searchMatch && roleMatch;
  });

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

  return (
    <div className="p-4 md:p-6 text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">All Users</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded w-full md:w-1/3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 rounded w-full md:w-1/6 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="donor">Donor</option>
          <option value="recipient">Recipient</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-gray-900 border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left py-2 px-3 border-b border-gray-700">
                #
              </th>
              <th className="text-left py-2 px-3 border-b border-gray-700">
                Name
              </th>
              <th className="text-left py-2 px-3 border-b border-gray-700">
                Email
              </th>
              <th className="text-left py-2 px-3 border-b border-gray-700">
                Role
              </th>
              <th className="text-left py-2 px-3 border-b border-gray-700">
                Created At
              </th>
              <th className="text-left py-2 px-3 border-b border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
              >
                <td className="py-2 px-3 border-b border-gray-700">
                  {index + 1}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  {user.name}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  {user.email}
                </td>
                <td className="py-2 px-3 border-b border-gray-700 capitalize">
                  {user.role}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 border-b border-gray-700 flex flex-col sm:flex-row gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center mt-4 text-gray-400">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
