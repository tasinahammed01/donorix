import { motion } from "framer-motion";

const RecipientDashboard = () => {
  return (
    <div className="py-12 px-4 md:px-16 bg-gray-900 text-white">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6">
        Recipient Dashboard
      </motion.h1>
      <p className="text-gray-300">Track your blood requests and donor responses.</p>
    </div>
  );
};

export default RecipientDashboard; 