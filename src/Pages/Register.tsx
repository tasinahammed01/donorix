import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, type RegisterData } from "../Auth/AuthContext";

const Register = () => {
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setSubmitting(true);
    try {
      const payload: RegisterData = {
        name,
        email,
        password,
        role: userType,
      };
      await register(payload);
      navigate("/login", { replace: true });
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-600 bg-gray-900 text-white px-4 py-2 rounded-md outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </button>
          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}
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
