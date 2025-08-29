import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  const [userType, setUserType] = useState<"donor" | "recipient">("donor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const totalDonated = 0;

  const navigate = useNavigate();

  const { createUser } = useContext(AuthContext);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await createUser(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred.");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          totalDonated,
          role: userType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Registration successful → redirect to login
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Register as <span className="text-red-600">{userType}</span>
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
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
            type="button"
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

        <form className="space-y-4" onSubmit={handleRegister}>
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
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </form>

        <div className="mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
