import { motion } from "framer-motion";
const HeroSection = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        className="w-full h-[80vh] object-cover"
        src="https://i.ibb.co/hx7PpVYt/Red-White-Minimalist-Blood-Donation-Health-Banner-1.jpg"
        alt="Blood Donating image"
      />

      {/* Animated Text Content */}
      <motion.div
        initial={{ opacity: 0, x: 100 }} // from right
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-1/2 right-20 space-y-5 transform -translate-y-1/2 text-right max-w-xl"
      >
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          Welcome to Blood Bank
        </h1>
        <p className="text-xl mt-4 text-white drop-shadow max-w-xl">
          Your blood can save other lives. Let's make a difference because every
          drop counts.
        </p>
        <div className="flex gap-10 justify-end">
          <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full text-lg font-semibold shadow-md hover:bg-red-700 transition duration-300">
            Want to be a Donator
          </button>
          <button className="mt-6 px-6 py-3 border-2 border-red-600 hover:bg-red-600 text-white rounded-full text-lg font-semibold shadow-md transition duration-300">
            Need Blood
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
