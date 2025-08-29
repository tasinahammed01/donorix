import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 md:p-12 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login to <span className="text-red-600">Donorix</span>
        </h2>

        <form className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-red-600 font-medium">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
