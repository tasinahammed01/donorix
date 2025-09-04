import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Donor {
  _id: string;
  name: string;
  email: string;
  role: string;
  status?: "active" | "suspended";
  createdAt: string;
}

const DonorList = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://donorix-backend-1.onrender.com/users");
        const donorOnly = response.data.filter(
          (user: Donor) => user.role.toLowerCase() === "donor"
        );
        setDonors(donorOnly);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong!";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://donorix-backend-1.onrender.com/users/${id}`);
        setDonors(donors.filter((donor) => donor._id !== id));
        Swal.fire("Deleted!", "Donor has been deleted.", "success");
      } catch {
        Swal.fire("Error!", "Failed to delete donor.", "error");
      }
    }
  };

  const handleSuspend = async (id: string, action: "suspend" | "unsuspend") => {
    try {
      await axios.patch(`https://donorix-backend-1.onrender.com/users/${id}`, {
        action,
      });
      setDonors((prev) =>
        prev.map((donor) =>
          donor._id === id
            ? {
                ...donor,
                status: action === "suspend" ? "suspended" : "active",
              }
            : donor
        )
      );
      Swal.fire(
        "Success!",
        `Donor has been ${action === "suspend" ? "suspended" : "unsuspended"}.`,
        "success"
      );
    } catch {
      Swal.fire("Error!", "Failed to update donor status.", "error");
    }
  };

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await axios.patch(`https://donorix-backend-1.onrender.com/users/${id}`, { role });
      setDonors((prev) =>
        prev.map((donor) => (donor._id === id ? { ...donor, role } : donor))
      );
      Swal.fire("Success!", `Role updated to ${role}`, "success");
    } catch {
      Swal.fire("Error!", "Failed to update role.", "error");
    }
  };

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(search.toLowerCase()) ||
      donor.email.toLowerCase().includes(search.toLowerCase())
  );

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
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Donor List</h1>

      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded w-full md:w-1/3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
                Status
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
            {filteredDonors.map((donor, index) => (
              <tr
                key={donor._id}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
              >
                <td className="py-2 px-3 border-b border-gray-700">
                  {index + 1}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  {donor.name}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  {donor.email}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  <select
                    value={donor.role}
                    onChange={(e) =>
                      handleRoleChange(donor._id, e.target.value)
                    }
                    className="bg-gray-700 text-white p-1 rounded focus:outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="donor">Donor</option>
                    <option value="recipient">Recipient</option>
                  </select>
                </td>
                <td className="py-2 px-3 border-b border-gray-700 capitalize">
                  {donor.status || "active"}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  {new Date(donor.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 border-b border-gray-700 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() =>
                      handleSuspend(
                        donor._id,
                        donor.status === "suspended" ? "unsuspend" : "suspend"
                      )
                    }
                    className={`px-3 py-1 rounded text-white ${
                      donor.status === "suspended"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    }`}
                  >
                    {donor.status === "suspended" ? "Unsuspend" : "Suspend"}
                  </button>
                  <button
                    onClick={() => handleDelete(donor._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredDonors.length === 0 && (
          <p className="text-center mt-4 text-gray-400">No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default DonorList;
