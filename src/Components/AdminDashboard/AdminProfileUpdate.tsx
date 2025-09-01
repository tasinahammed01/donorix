import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

const AdminProfileUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    profileImage: "",
    bloodGroup: "",
    lastDonationDate: "",
    weight: "",
    height: "",
    bmi: "",
    isEligible: false,
    nextDonationDate: "",
  });

  console.log(formData.profileImage);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        const data = await response.json();

        // If donations exist, populate from donations object
        const donations = data.donations || {};
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
          profileImage: data.profileImage || "",
          bloodGroup: donations.bloodGroup || "",
          lastDonationDate: donations.lastDonationDate || "",
          weight: donations.weight || "",
          height: donations.height || "",
          bmi: donations.bmi || "",
          isEligible: donations.isEligible || false,
          nextDonationDate: donations.nextDonationDate || "",
        });

        if (data.profileImage) setPreview(data.profileImage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [id]);

  const checkDonationGap = (lastDateStr: string) => {
    if (!lastDateStr) return true;
    const lastDate = new Date(lastDateStr);
    const today = new Date();
    const diffDays =
      (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= 90;
  };

  const calculateNextDonationDate = (lastDateStr: string) => {
    if (!lastDateStr) return "";
    const lastDate = new Date(lastDateStr);
    lastDate.setDate(lastDate.getDate() + 90);
    return lastDate.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // BMI and eligibility calculation
      const weightNum = parseFloat(newData.weight);
      const heightNum = parseFloat(newData.height);
      if (
        (name === "weight" || name === "height") &&
        weightNum > 0 &&
        heightNum > 0
      ) {
        const bmiValue = weightNum / (heightNum / 100) ** 2;
        newData.bmi = bmiValue.toFixed(1);
        newData.isEligible =
          bmiValue >= 18.5 &&
          bmiValue <= 24.9 &&
          checkDonationGap(newData.lastDonationDate);
        newData.nextDonationDate = calculateNextDonationDate(
          newData.lastDonationDate
        );
      }

      if (name === "lastDonationDate") {
        newData.isEligible =
          checkDonationGap(value) &&
          parseFloat(newData.bmi) >= 18.5 &&
          parseFloat(newData.bmi) <= 24.9;
        newData.nextDonationDate = calculateNextDonationDate(value);
      }

      return newData;
    });
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("location", formData.location);

      // Add donations as JSON string
      form.append(
        "donations",
        JSON.stringify({
          bloodGroup: formData.bloodGroup,
          lastDonationDate: formData.lastDonationDate,
          weight: formData.weight,
          height: formData.height,
          bmi: formData.bmi,
          isEligible: formData.isEligible,
          nextDonationDate: formData.nextDonationDate,
        })
      );

      // Add image if selected
      if (selectedFile) {
        form.append("profileImage", selectedFile);
      }

      const response = await fetch(`http://localhost:5000/users/update/${id}`, {
        method: "PATCH",
        body: form,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "The admin profile has been updated successfully!",
          confirmButtonColor: "#d33",
        }).then(() => {
          navigate("/dashboard/admin/profile", { replace: true });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Failed to update profile. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        confirmButtonColor: "#d33",
      });
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Update Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <SelectField
            label="Blood Group"
            name="bloodGroup"
            value={formData.bloodGroup}
            options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            onChange={handleChange}
          />
          <InputField
            label="Last Donation Date"
            name="lastDonationDate"
            type="date"
            value={formData.lastDonationDate}
            onChange={handleChange}
          />
          <InputField
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
          />
          <InputField
            label="Height (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
          />

          <div className="mt-2">
            <p>BMI: {formData.bmi}</p>
            <p>
              Eligible for donation:{" "}
              <span
                className={
                  formData.isEligible
                    ? "text-green-500 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                {formData.isEligible ? "Yes" : "No"}
              </span>
            </p>
            {formData.nextDonationDate && (
              <p>Next Donation Date: {formData.nextDonationDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Profile Image
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                isDragActive
                  ? "border-red-500 bg-red-900/20"
                  : "border-gray-600 bg-gray-800"
              }`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <p className="text-gray-400">
                  Drag & drop an image here, or{" "}
                  <span className="text-red-400">click to upload</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/profile")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileUpdate;

// Reusable components
const InputField = ({ label, name, value, type = "text", onChange }: any) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
);

const SelectField = ({ label, name, value, options, onChange }: any) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <option value="">Select</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
