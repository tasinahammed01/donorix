import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

const AdminProfileUpdate = () => {
  const navigate = useNavigate();

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
    age: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Check if the donor is eligible based on age and BMI
  const checkEligibility = (
    age: number,
    bmi: number,
    lastDonationDateStr: string
  ) => {
    const ageIsValid = age >= 18;
    const bmiIsValid = bmi >= 18.5 && bmi <= 24.9;
    const gapIsValid = checkDonationGap(lastDonationDateStr);
    return ageIsValid && bmiIsValid && gapIsValid;
  };

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
      const weightNum = parseFloat(newData.weight);
      const heightNum = parseFloat(newData.height);
      const ageNum = parseInt(newData.age, 10);

      if (
        (name === "weight" || name === "height") &&
        weightNum > 0 &&
        heightNum > 0
      ) {
        const bmiValue = weightNum / (heightNum / 100) ** 2;
        newData.bmi = bmiValue.toFixed(1);
        newData.isEligible = checkEligibility(
          ageNum,
          bmiValue,
          newData.lastDonationDate
        );
        newData.nextDonationDate = calculateNextDonationDate(
          newData.lastDonationDate
        );
      }

      if (name === "age") {
        newData.isEligible = checkEligibility(
          ageNum,
          parseFloat(newData.bmi),
          newData.lastDonationDate
        );
      }

      if (name === "lastDonationDate") {
        newData.isEligible = checkEligibility(
          ageNum,
          parseFloat(newData.bmi),
          value
        );
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
          age: formData.age,
        })
      );

      if (selectedFile) {
        form.append("profileImage", selectedFile);
      }

      // Simulate the backend update process
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "The donor profile has been updated successfully!",
        confirmButtonColor: "#d33",
      }).then(() => {
        // Reset form state after successful submission
        setFormData({
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
          age: "",
        });
        setSelectedFile(null); // Clear the selected file
        setPreview(null); // Clear the preview
        navigate("/dashboard/admin/profile", { replace: true });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        confirmButtonColor: "#d33",
      });
      console.error("Error updating donor profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Update Donor Profile
        </h1>
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
          <InputField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
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
              <p
                className={`font-semibold ${
                  formData.isEligible ? "text-green-400" : "text-red-400"
                }`}
              >
                Next Donation Date: {formData.nextDonationDate}
              </p>
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
              onClick={() => navigate("/dashboard/donor/profile")}
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
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const InputField = ({ label, name, value, type = "text", onChange }: InputFieldProps) => (
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

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const SelectField = ({ label, name, value, options, onChange }: SelectFieldProps) => (
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
