import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

interface Level {
  current: number;
  xp: number;
  nextLevelXp: number;
  levelBadge: string;
}

interface Achievement {
  id: number;
  title: string;
  description?: string;
  date?: string | null;
  badgeColor: string;
}

interface Donation {
  id: number;
  date: string;
  location: string;
  amount: string;
  status: string;
}

interface UserData {
  name: string;
  email: string;
  role: string;
  totalDonated: number;
  isActive: boolean;
  isSuspended: boolean;
  achievements: Achievement[];
  level: Level;
  donations: Donation[];
}

const Profile = () => {
  const { user } = useContext(AuthContext); // logged-in user
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return; // ✅ check uid instead of _id
      try {
        const res = await fetch(`http://localhost:5000/donations/${user.uid}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/users/update/${user._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setUserData((prev) => ({ ...prev!, ...data }));
      setSuccessMsg("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (!userData) return <p className="text-white">Loading...</p>;

  const {
    name,
    email,
    role,
    totalDonated,
    isActive,
    isSuspended,
    achievements,
    level,
  } = userData;

  // Badge colors
  const badgeColors: { [key: string]: string } = {
    bronze: "bg-amber-500",
    silver: "bg-gray-400",
    gold: "bg-yellow-400",
    platinum: "bg-purple-500",
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded shadow-md text-white space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile</h2>
        <button
          className="p-2 bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Edit Form */}
      {editMode && (
        <div className="bg-gray-700 p-4 rounded space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-600 border border-gray-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-600 border border-gray-500"
          />
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
          {successMsg && <p className="text-green-400">{successMsg}</p>}
        </div>
      )}

      {/* User Info */}
      {!editMode && (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
          <p>
            <strong>Total Donated:</strong> {totalDonated}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={isActive ? "text-green-400" : "text-red-400"}>
              {isActive ? "Active" : "Inactive"}
            </span>
          </p>
          <p>
            <strong>Suspended:</strong>{" "}
            <span className={isSuspended ? "text-red-400" : "text-green-400"}>
              {isSuspended ? "Yes" : "No"}
            </span>
          </p>

          {/* Level */}
          <div className="mt-4 flex items-center gap-4">
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-full text-white font-bold text-lg ${
                badgeColors[level.levelBadge]
              }`}
            >
              Lv {level.current}
            </div>
            <div className="flex-1">
              <p>
                XP: {level.xp} / {level.nextLevelXp}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                <div
                  className={`${
                    badgeColors[level.levelBadge]
                  } h-2 rounded-full`}
                  style={{ width: `${(level.xp / level.nextLevelXp) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Achievements</h3>
            <ul className="space-y-2">
              {achievements.map((ach) => (
                <li
                  key={ach.id}
                  className={`p-2 rounded border-l-4 ${
                    ach.badgeColor === "gold"
                      ? "border-yellow-400 bg-gray-700"
                      : ach.badgeColor === "silver"
                      ? "border-gray-400 bg-gray-700"
                      : ach.badgeColor === "bronze"
                      ? "border-amber-500 bg-gray-700"
                      : "border-purple-500 bg-gray-700"
                  }`}
                >
                  <p className="font-semibold">{ach.title}</p>
                  {ach.description && (
                    <p className="text-gray-300 text-sm">{ach.description}</p>
                  )}
                  {ach.date && (
                    <p className="text-gray-400 text-xs">
                      {new Date(ach.date).toLocaleDateString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
