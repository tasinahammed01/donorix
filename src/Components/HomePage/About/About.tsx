import { IoIosReturnRight } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function About() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16 py-12 overflow-hidden">
      {/* Left Content */}
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome to <span className="text-red-600">Donorix</span>
        </motion.h1>

        <motion.hr
          className="my-4 sm:my-5 border-2 border-red-600 w-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ transformOrigin: "left" }}
        />

        <motion.p
          className="text-gray-300 text-sm sm:text-base leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Since our inception set out in 2020, Donorix has successfully
          contributed in blood donation to over 500+ patients. Sharing awareness
          to young generation the usefulness of donating blood for others to
          save countless lives.
        </motion.p>

        {/* Features */}
        <motion.div
          className="my-6 sm:my-10 w-full sm:w-4/5 text-gray-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            "1000+ Donors Available 24/7",
            "Associated with 200+ Medical facilities",
            "Donated Blood to Over 500+ Patients",
            "Contributed in Public Awareness",
            "Customer Service Available Country Wide",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 my-3">
                <IoIosReturnRight className="text-red-600 text-xl sm:text-2xl" />
                <p className="text-sm sm:text-base">{item}</p>
              </div>
              {index < 4 && <hr className="border-gray-600/40" />}
            </motion.div>
          ))}
        </motion.div>

        <Link to="/about">
          <button className="mt-6 lg:px-6 md:px-4 px-2 py-3 bg-red-600 text-white rounded-full md:text-lg font-semibold shadow-md hover:bg-red-700 transition duration-300">
            Join Our Team
          </button>
        </Link>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          className="w-full h-56 sm:h-72 md:h-96 lg:h-[550px] rounded-xl sm:rounded-2xl object-cover"
          src="https://i.ibb.co.com/7dzywB3m/imgi-20-detail-with-hand-blood-donor-plastic-blood-bag-hospital-person-513275-2529.jpg"
          alt="Blood Donation"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        />
      </motion.div>
    </div>
  );
}
