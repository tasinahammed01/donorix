import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";

interface Donor {
  _id: string;
  name: string;
  bloodGroup: string;
  city: string;
  donationsMade: number;
}

const TopDonors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const fetchDonors = async () => {
      const res = await api.get<Donor[]>("/top-donors");
      setDonors(res.data);
    };
    fetchDonors();
  }, []);

  return (
    <div className="py-12 px-4 md:px-16 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Top Donors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {donors.map((donor, idx) => (
          <motion.div
            key={donor._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg text-center"
          >
            <h3 className="text-xl font-semibold">{donor.name}</h3>
            <p className="text-sm mt-1">{donor.bloodGroup}</p>
            <p className="text-sm mt-2">{donor.city}</p>
            <p className="mt-3 font-bold">Donations: {donor.donationsMade}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopDonors;
