import { motion } from "framer-motion";

const AdminDashboard = () => {
  return (
    <div className="py-12 px-4 md:px-16 bg-gray-900 text-white">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6">
        Admin Dashboard
      </motion.h1>
      <p className="text-gray-300">Manage users, donors, and requests.</p>
    </div>
  );
};

export default AdminDashboard; 