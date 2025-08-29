import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import api from "../api";

interface Request {
  _id: string;
  bloodGroup: string;
  city: string;
  requesterName: string;
}

const BloodRequest = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  const fetchRequests = useCallback(async () => {
    const res = await api.get<Request[]>("/donors", {
      params: { bloodGroup, city },
    });
    setRequests(res.data);
  }, [bloodGroup, city]);

  const createRequest = async () => {
    await api.post("/request", { bloodGroup, city });
    alert("Request sent!");
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <div className="py-12 px-4 md:px-16 bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-lg mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Request Blood</h2>
        <input
          type="text"
          placeholder="Blood Group Needed"
          className="w-full mb-3 px-4 py-2 rounded-md bg-gray-900 border border-gray-600"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        />
        <input
          type="text"
          placeholder="City / Location"
          className="w-full mb-3 px-4 py-2 rounded-md bg-gray-900 border border-gray-600"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={createRequest}
          className="w-full bg-red-600 py-2 rounded-md hover:bg-red-700 transition"
        >
          Send Request
        </button>
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Available Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 p-4 rounded-xl shadow-lg"
            >
              <p>
                <span className="font-semibold">Blood Group:</span>{" "}
                {req.bloodGroup}
              </p>
              <p>
                <span className="font-semibold">City:</span> {req.city}
              </p>
              <button
                onClick={async () => {
                  await api.post(`/request/${req._id}/accept`, {});
                  alert("Request Accepted!");
                }}
                className="mt-2 w-full bg-red-600 py-2 rounded-md hover:bg-red-700 transition"
              >
                Accept
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodRequest;
