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
  isEligible?: boolean;
  donations?: {
    age?: number;
    bloodGroup?: string;
    lastDonationDate?: string;
  };
}

const TopDonors = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [eligibility, setEligibility] = useState("");

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

  const filterData = (
    search: string,
    blood: string,
    eligibleStatus: string
  ) => {
    let filtered = users.filter(
      (user) =>
        user.location?.toLowerCase().includes(search) ||
        user.name.toLowerCase().includes(search)
    );

    if (blood) {
      filtered = filtered.filter(
        (user) =>
          user.donations?.bloodGroup?.toLowerCase() === blood.toLowerCase()
      );
    }

    if (eligibleStatus) {
      const isEligible = eligibleStatus === "eligible";
      filtered = filtered.filter((user) => user.donations.isEligible === isEligible);
    }

    setFilteredUsers(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterData(value, bloodGroup, eligibility);
  };

  const handleBloodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setBloodGroup(value);
    filterData(searchTerm, value, eligibility);
  };

  const handleEligibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setEligibility(value);
    filterData(searchTerm, bloodGroup, value);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Top Donors</h1>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by location or name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:border-teal-500 focus:outline-none"
          />

          <select
            value={bloodGroup}
            onChange={handleBloodChange}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:border-teal-500 focus:outline-none"
          >
            <option value="">All Blood Groups</option>
            <option value="a+">A+</option>
            <option value="a-">A-</option>
            <option value="b+">B+</option>
            <option value="b-">B-</option>
            <option value="ab+">AB+</option>
            <option value="ab-">AB-</option>
            <option value="o+">O+</option>
            <option value="o-">O-</option>
          </select>

          <select
            value={eligibility}
            onChange={handleEligibilityChange}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-[#1e1e1e] text-gray-200 border border-gray-600 focus:border-teal-500 focus:outline-none"
          >
            <option value="">All Eligibility</option>
            <option value="eligible">Eligible</option>
            <option value="notEligible">Not Eligible</option>
          </select>
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

                {user.donations?.age !== undefined && (
                  <p className="text-sm mt-1 text-gray-400">
                    <span className="font-medium text-teal-400">Age:</span>{" "}
                    {user.donations.age} years
                  </p>
                )}

                {user.donations?.bloodGroup && (
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

                {user.donations?.lastDonationDate && (
                  <p className="text-sm mt-1 text-gray-400">
                    <span className="font-medium text-teal-400">
                      Last Donation:
                    </span>{" "}
                    {new Date(
                      user.donations.lastDonationDate
                    ).toLocaleDateString()}
                  </p>
                )}

                <p className="text-sm mt-1 text-gray-400">
                  <span className="font-medium text-teal-400">
                    Eligibility:
                  </span>{" "}
                  {user.donations.isEligible ? (
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
