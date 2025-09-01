import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  location?: string;
  phone?: string;
  totalDonated?: number;
  lastDonationDate?: string;
  age?: number;
  bloodGroup?: string;
  eligible?: boolean;
}

const TopDonors = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://donorix-backend-1.onrender.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched users:", data); // Debug
        const donors = data.filter(
          (user: User) => user.role?.toLowerCase() === "donor"
        );
        setUsers(donors);
        setFilteredUsers(donors);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.location?.toLowerCase().includes(value) ||
          user.name.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Top Donors</h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by location or name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg hover:shadow-teal-500/30 transition transform hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold text-white mb-2">
                  {user.name}
                </h2>
                <p className="text-gray-400 text-sm">{user.email}</p>

                {user.phone && (
                  <p className="text-sm mt-1 text-gray-400">
                    <span className="font-medium text-teal-400">Phone:</span>{" "}
                    {user.phone}
                  </p>
                )}

                {user.donations.age !== undefined && (
                  <p className="text-sm mt-1 text-gray-400">
                    <span className="font-medium text-teal-400">Age:</span>{" "}
                    {user.donations.age} years
                  </p>
                )}

                {user.donations.bloodGroup && (
                  <p className="text-sm mt-1 text-gray-400">
                    <span className="font-medium text-teal-400">
                      Blood Group:
                    </span>{" "}
                    {user.donations.bloodGroup}
                  </p>
                )}

                {user.location && (
                  <p className="text-sm mt-1 text-gray-400">
                    <span className="font-medium text-teal-400">Location:</span>{" "}
                    {user.location}
                  </p>
                )}

                {user.totalDonated !== undefined && (
                  <p className="text-sm mt-1 text-gray-400">
                    <span className="font-medium text-teal-400">
                      Total Donated:
                    </span>{" "}
                    {user.totalDonated} units
                  </p>
                )}

                {user.donations.lastDonationDate && (
                  <p className="text-sm mt-1 text-gray-400">
                    <span className="font-medium text-teal-400">
                      Last Donation:
                    </span>{" "}
                    {new Date(user.donations.lastDonationDate).toLocaleDateString()}
                  </p>
                )}

                <p className="text-sm mt-1 text-gray-400">
                  <span className="font-medium text-teal-400">
                    Eligibility:
                  </span>{" "}
                  {user.eligible ? (
                    <span className="text-green-400">Eligible</span>
                  ) : (
                    <span className="text-red-400">Not Eligible</span>
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No donors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopDonors;
