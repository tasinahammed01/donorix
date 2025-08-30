import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

interface Achievement {
  id: number;
  title: string;
  description: string;
  date?: string | null;
  badgeColor: string;
}

interface Level {
  current: number;
  xp: number;
  nextLevelXp: number;
  levelBadge: string;
}

interface UserData {
  achievements: Achievement[];
  level: Level;
}

const Achievements = () => {
  const { user } = useContext(AuthContext); // user should have _id
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/donations/${user._id}`
        );
        const data = await res.json();

        setUserData({
          achievements: data.achievements || [],
          level: data.level || {
            current: 1,
            xp: 0,
            nextLevelXp: 5,
            levelBadge: "bronze",
          },
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [user]);

  if (!userData)
    return <p className="text-white text-center mt-6">Loading...</p>;

  const { achievements, level } = userData;

  // Colors for badges
  const badgeColors: { [key: string]: string } = {
    bronze: "bg-amber-500",
    silver: "bg-gray-400",
    gold: "bg-yellow-400",
    platinum: "bg-purple-500",
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow-lg max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Achievements & Level
      </h2>

      {/* Level Badge */}
      <div className="flex flex-col items-center mb-6">
        <div
          className={`w-24 h-24 flex items-center justify-center rounded-full text-white text-lg font-bold ${
            badgeColors[level.levelBadge]
          }`}
        >
          Lv {level.current}
        </div>
        <p className="text-white mt-2">
          XP: {level.xp} / {level.nextLevelXp}
        </p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div
            className={`${badgeColors[level.levelBadge]} h-2 rounded-full`}
            style={{ width: `${(level.xp / level.nextLevelXp) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Achievements */}
      <ul className="space-y-3">
        {achievements.map((ach) => (
          <li
            key={ach.id}
            className={`flex items-center justify-between p-3 rounded shadow-md border-l-4 ${
              ach.badgeColor === "gold"
                ? "border-yellow-400 bg-gray-700"
                : ach.badgeColor === "silver"
                ? "border-gray-400 bg-gray-700"
                : ach.badgeColor === "bronze"
                ? "border-amber-500 bg-gray-700"
                : "border-purple-500 bg-gray-700"
            }`}
          >
            <div>
              <p className="text-white font-semibold">{ach.title}</p>
              {ach.description && (
                <p className="text-gray-300 text-sm">{ach.description}</p>
              )}
            </div>
            {ach.date && (
              <span className="text-gray-400 text-sm">
                {new Date(ach.date).toLocaleDateString()}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
