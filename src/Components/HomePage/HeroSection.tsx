import { motion } from "framer-motion";
const HeroSection = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        className="lg:w-full lg:h-[80vh]  md:h-[100%] md:mb-0 mb-60  md:object-cover "
        src="https://i.ibb.co/hx7PpVYt/Red-White-Minimalist-Blood-Donation-Health-Banner-1.jpg"
        alt="Blood Donating image"
      />

      {/* Animated Text Content */}
      <motion.div
        initial={{ opacity: 0, x: 100 }} // from right
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute md:top-1/2 top-70 lg:right-20 right-10 space-y-5 transform -translate-y-1/2 text-right lg:max-w-xl md:max-w-sm" 
      >
        <h1 className="lg:text-6xl text-3xl font-bold text-white drop-shadow-lg">
          Welcome to Blood Bank
        </h1>
        <p className="lg:text-xl text-sm mt-4 text-white drop-shadow lg:max-w-xl md:max-w-sm">
          Your blood can save other lives. Let's make a difference because every
          drop counts.
        </p>
        <div className="flex md:gap-10 gap-5 justify-end">
          <button className="mt-6 lg:px-6 md:px-4 px-2 py-3 bg-red-600 text-white rounded-full md:text-lg font-semibold shadow-md hover:bg-red-700 transition duration-300">
            Want to be a Donator
          </button>
          <button className="mt-6 lg:px-6 md:px-4 px-2 py-3 border-2 border-red-600 hover:bg-red-600 text-white rounded-full md:text-lg font-semibold shadow-md transition duration-300">
            Need Blood
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
