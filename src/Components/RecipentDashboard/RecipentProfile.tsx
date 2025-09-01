import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string;
  role: string;
  createdAt?: string;
  donations: {
    bloodGroup: string;
    lastDonationDate: string;
    weight: string;
    height: string;
    bmi: string;
    isEligible: boolean;
    nextDonationDate: string;
    age: number; // Added age field
  };
  achievements: string[];
  level: {
    current: number;
    xp: number;
    nextLevelXp: number;
    levelBadge: string;
  };
}

const RecipientProfile = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [fetchUsers, setFetchUsers] = useState<User[]>([]);
  const [recipient, setRecipient] = useState<User | null>(null);

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/users");
        setFetchUsers(response.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  // Find logged-in recipient
  useEffect(() => {
    if (fetchUsers.length > 0 && user) {
      const recipientUser =
        fetchUsers.find((u) => u.email === user.email) || null;
      setRecipient(recipientUser);
    }
  }, [fetchUsers, user]);

  // handleDeleteImage function
  const handleDeleteImage = async () => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirmation.isConfirmed) return;

      // Delete the image from the backend
      await axios.delete(
        `http://localhost:5000/users/${recipient._id}/profile-image`
      );

      // Update the state to remove the profile image
      setRecipient((prevRecipient) => {
        if (prevRecipient) {
          return { ...prevRecipient, profileImage: null };
        }
        return prevRecipient;
      });

      // Show success message
      Swal.fire({
        title: "Deleted!",
        text: "Your profile image has been deleted.",
        icon: "success",
        confirmButtonText: "Okay",
      });
    } catch (err: any) {
      // Show error message if something goes wrong
      Swal.fire({
        title: "Error!",
        text: err.message || "Something went wrong while deleting the image!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10 font-semibold">
        {error}
      </div>
    );
  }

  if (!recipient) {
    return (
      <div className="text-center text-gray-400 mt-10 font-semibold">
        Recipient not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-xl p-8 relative">
        {/* Edit Button */}
        <Link to={`/dashboard/recipient/profile/update/${recipient._id}`}>
          <button className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition">
            Edit Profile
          </button>
        </Link>

        {/* Profile Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={`http://localhost:5000${recipient?.profileImage}`}
            alt="Profile"
            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
          />

          <div>
            <h1 className="text-3xl font-bold">{recipient.name}</h1>
            <p className="text-red-400 text-lg">{recipient.role}</p>
          </div>

          {/* Delete Image Button */}
          <button
            onClick={handleDeleteImage}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete Profile Image
          </button>
        </div>

        {/* Profile Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Email</h2>
            <p className="text-gray-400">{recipient.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Phone</h2>
            <p className="text-gray-400">{recipient.phone || "-"}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Location</h2>
            <p className="text-gray-400">{recipient.location || "-"}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Joined</h2>
            <p className="text-gray-400">
              {recipient.createdAt
                ? new Date(recipient.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>

          {/* Recipient Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Blood Group</h2>
            <p className="text-gray-400">{recipient.donations.bloodGroup}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">
              Last Donation
            </h2>
            <p className="text-gray-400">
              {recipient.donations.lastDonationDate}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Eligibility</h2>
            <p className="text-gray-400">
              {recipient.donations.isEligible ? "Eligible" : "Not Eligible"}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">
              Next Donation
            </h2>
            <p className="text-gray-400">
              {recipient.donations.nextDonationDate}
            </p>
          </div>

          {/* Health Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Weight</h2>
            <p className="text-gray-400">{recipient.donations.weight} kg</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Height</h2>
            <p className="text-gray-400">{recipient.donations.height} cm</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-300">BMI</h2>
            <p className="text-gray-400">{recipient.donations.bmi}</p>
          </div>

          {/* Age Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Age</h2>
            <p className="text-gray-400">{recipient.donations.age} years</p>
          </div>

          {/* Recipient Level Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-300">Level</h2>
            <p className="text-gray-400">{recipient.level.levelBadge}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientProfile;
