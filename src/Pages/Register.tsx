import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Register = () => {
  const [userType, setUserType] = useState("donor");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 md:p-12 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Register as <span className="text-red-600">{userType}</span>
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setUserType("donor")}
            className={`px-4 py-2 rounded-full font-semibold ${
              userType === "donor"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Donor
          </button>
          <button
            onClick={() => setUserType("recipient")}
            className={`px-4 py-2 rounded-full font-semibold ${
              userType === "recipient"
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Recipient
          </button>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
          />

          {userType === "donor" && (
            <>
              <input
                type="text"
                placeholder="Blood Group"
                className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
              />
              <input
                type="text"
                placeholder="City / Location"
                className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
              />
            </>
          )}

          {userType === "recipient" && (
            <>
              <input
                type="text"
                placeholder="Blood Group Needed"
                className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
              />
              <input
                type="text"
                placeholder="City / Location"
                className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
          >
            Register
          </button>
        </form>
        <div className="mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
