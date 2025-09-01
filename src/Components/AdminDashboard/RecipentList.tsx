import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Recipient {
  _id: string;
  name: string;
  email: string;
  role: string;
  status?: string; // "active" or "suspended"
  createdAt: string;
}

const RecipientList = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://donorix-backend-1.onrender.com/users");
        const recipientOnly = response.data.filter(
          (user: Recipient) => user.role.toLowerCase() === "recipient"
        );
        setRecipients(recipientOnly);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong!";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipients();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This recipient will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://donorix-backend-1.onrender.com/users/${id}`);
        setRecipients(recipients.filter((recipient) => recipient._id !== id));
        Swal.fire("Deleted!", "Recipient has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete recipient.", "error");
      }
    }
  };

  const handleSuspend = async (
    id: string,
    currentStatus: string | undefined
  ) => {
    const action = currentStatus === "suspended" ? "unsuspend" : "suspend";

    const result = await Swal.fire({
      title: `${action === "suspend" ? "Suspend" : "Unsuspend"} recipient?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: action === "suspend" ? "#facc15" : "#22c55e",
      cancelButtonColor: "#3085d6",
      confirmButtonText: action === "suspend" ? "Suspend" : "Unsuspend",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.patch(
          `https://donorix-backend-1.onrender.com/users/${id}/suspend`,
          { action }
        );
        setRecipients(
          recipients.map((user) =>
            user._id === id
              ? {
                  ...user,
                  status: action === "suspend" ? "suspended" : "active",
                }
              : user
          )
        );
        Swal.fire("Success!", response.data.message, "success");
      } catch {
        Swal.fire("Error!", "Failed to update status.", "error");
      }
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      const response = await axios.patch(
        `https://donorix-backend-1.onrender.com/users/${id}/role`,
        {
          role: newRole,
        }
      );
      setRecipients(
        recipients.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
      Swal.fire("Success!", response.data.message, "success");
    } catch {
      Swal.fire("Error!", "Failed to update role.", "error");
    }
  };

  const filteredRecipients = recipients.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(search.toLowerCase()) ||
      recipient.email.toLowerCase().includes(search.toLowerCase())
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
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Recipient List</h1>

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
            {filteredRecipients.map((recipient, index) => (
              <tr
                key={recipient._id}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
              >
                <td className="py-2 px-3 border-b border-gray-700">
                  {index + 1}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  {recipient.name}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  {recipient.email}
                </td>
                <td className="py-2 px-3 border-b border-gray-700 capitalize">
                  <select
                    value={recipient.role}
                    onChange={(e) =>
                      handleRoleChange(recipient._id, e.target.value)
                    }
                    className="bg-gray-700 text-white p-1 rounded"
                  >
                    <option value="recipient">Recipient</option>
                  </select>
                </td>
                <td className="py-2 px-3 border-b border-gray-700 capitalize">
                  {recipient.status || "active"}
                </td>
                <td className="py-2 px-3 border-b border-gray-700">
                  {new Date(recipient.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 border-b border-gray-700 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() =>
                      handleSuspend(recipient._id, recipient.status)
                    }
                    className={`px-3 py-1 rounded text-white ${
                      recipient.status === "suspended"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    }`}
                  >
                    {recipient.status === "suspended" ? "Unsuspend" : "Suspend"}
                  </button>
                  <button
                    onClick={() => handleDelete(recipient._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRecipients.length === 0 && (
          <p className="text-center mt-4 text-gray-400">No recipients found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipientList;
