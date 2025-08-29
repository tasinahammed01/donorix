import { motion } from "framer-motion";

const AboutUs = () => {
  const stats = [
    {
      number: "240%",
      title: "Awareness Raised",
      desc: "We managed to spread the usefulness of saving lives by donating blood to the youth of this generation.",
    },
    {
      number: "175+",
      title: "Company Growth",
      desc: "Our very talented team volunteers are the powerhouse of BloodTime and pillars of our tremendous success.",
    },
    {
      number: "500+",
      title: "Blood Donated",
      desc: "We have accomplished more than 500 successful Blood Donations nationwide and we are still counting many more.",
    },
  ];

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-12">
      {/* Top Section: Volunteers */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our leading, strong & creative{" "}
            <span className="text-red-600">Volunteers</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
            Our blood donation camp volunteers are the heart and soul of our
            mission to save lives. Committed, compassionate, and
            community-driven, they come from all walks of life to contribute
            their time and energy to ensure the smooth operation of our events.
            From registering donors and setting up equipment to providing
            refreshments and post-donation care, these dedicated individuals
            handle every aspect with meticulous attention and unwavering
            enthusiasm.
          </p>
          <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition">
            Join Our Team
          </button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-full h-auto rounded-2xl object-cover"
            src="https://i.ibb.co/PyPB5Vg/Screenshot-619-removebg-preview.png"
            alt="Volunteers"
          />
        </motion.div>
      </div>

      {/* Numbers Section */}
      <motion.div
        className="py-20 px-2 sm:px-6 md:px-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our results in numbers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 sm:p-8 shadow-lg rounded-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold text-red-500">
                {stat.number}
              </h3>
              <p className="mt-4 text-lg font-medium">{stat.title}</p>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Subscribe Section */}
      <motion.div
        className="bg-red-600 text-white py-16 px-4 sm:px-8 md:px-12 rounded-2xl mx-0 md:mx-20 my-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Subscribe and stay connected with us
          </motion.h2>
          <motion.p
            className="mb-8 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join our community of subscribers and receive regular updates
            delivered straight to your inbox. It’s quick, easy, and free
          </motion.p>

          <form className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email.."
              className="w-full md:w-96 px-4 py-3 text-gray-700 rounded-full outline-none border border-white bg-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
