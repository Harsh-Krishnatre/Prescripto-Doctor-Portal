import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";

// Reusable Input Component to reduce repetition
const FormInput = ({ label, value, onChange, ...props }) => (
  <div className="flex flex-1 flex-col gap-1">
    <p>{label}</p>
    <input
      value={value}
      onChange={onChange}
      className="rounded border border-gray-300 p-2 focus:outline-gray-400"
      required
      {...props}
    />
  </div>
);

// Reusable Select Component
const FormSelect = ({ label, value, onChange, options, ...props }) => (
  <div className="flex flex-1 flex-col gap-1">
    <p>{label}</p>
    <select
      value={value}
      onChange={onChange}
      className="rounded border border-gray-300 p-2 focus:outline-gray-400"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const AddDoctor = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    experience: "0-1 Year",
    fees: "",
    about: "",
    speciality: "General physician",
    degree: "",
    address1: "",
    address2: "",
  };

  const [docImg, setDocImg] = useState(null);
  const [data, setData] = useState(initialState);
  const [isAvailable, setIsAvailable] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setDocImg(e.target.files[0]);
  };

  const resetForm = () => {
    setData(initialState);
    setDocImg(null);
    setIsAvailable(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!docImg) {
      return toast.error("Please select a profile image.");
    }

    const formData = new FormData();
    formData.append("image", docImg);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("experience", data.experience);
    formData.append("fees", Number(data.fees));
    formData.append("about", data.about);
    formData.append("speciality", data.speciality);
    formData.append("degree", data.degree);
    formData.append("address", JSON.stringify({ line1: data.address1, line2: data.address2 }));
    formData.append("available", isAvailable);

    try {
      const response = await axios.post(backendUrl + "/api/admin/add-doctor", formData, {
        headers: { aToken },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="no-scrollbar max-h-[80vh] w-full max-w-4xl overflow-y-scroll rounded border border-stone-300 bg-white p-8">
        <div className="mb-8 flex items-center gap-4 text-gray-500">
          <label htmlFor="doc-image">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
              className="w-16 cursor-pointer rounded-full bg-gray-100 object-cover h-16"
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="doc-image"
            accept="image/*"
            hidden
          />
          <p>Upload Doctor <br /> Picture</p>
        </div>

        <div className="flex flex-col items-start gap-10 text-gray-600 lg:flex-row">
          <div className="flex w-full flex-col gap-4 lg:flex-1">
            <FormInput label="Doctor Name" name="name" value={data.name} onChange={handleTextChange} placeholder="Name" />
            <FormInput label="Doctor Email" name="email" value={data.email} onChange={handleTextChange} type="email" placeholder="Email" />
            <FormInput label="Doctor Password" name="password" value={data.password} onChange={handleTextChange} type="password" placeholder="Password" />
            <FormSelect label="Experience" name="experience" value={data.experience} onChange={handleTextChange} options={["0-1 Year", "2-4 Year", "5-7 Year", "8-10 Year", "10+ Year"]} />
            <FormInput label="Fees" name="fees" value={data.fees} onChange={handleTextChange} type="number" min={0} placeholder="Consultation Fees" />
          </div>

          <div className="flex w-full flex-col gap-4 lg:flex-1">
            <FormSelect label="Speciality" name="speciality" value={data.speciality} onChange={handleTextChange} options={["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"]} />
            <FormInput label="Education" name="degree" value={data.degree} onChange={handleTextChange} placeholder="Degree (e.g., MBBS, MD)" />
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input name="address1" value={data.address1} onChange={handleTextChange} className="rounded border border-gray-300 p-2 focus:outline-gray-400 mb-2" type="text" placeholder="Address Line 1" required />
              <input name="address2" value={data.address2} onChange={handleTextChange} className="rounded border border-gray-300 p-2 focus:outline-gray-400" type="text" placeholder="Address Line 2" />
            </div>
            <div className="flex items-center space-x-4">
              <span>Availability</span>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={() => setIsAvailable(!isAvailable)}
                  className="toggle-checkbox sr-only"
                />
                <div className="toggle-label relative h-4 w-7 rounded-full bg-gray-300 shadow-inner transition-all duration-300 ease-in-out">
                  <div className="toggle-circle absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="my-6 flex flex-1 flex-col gap-1">
          <p>About Doctor</p>
          <textarea
            name="about"
            value={data.about}
            onChange={handleTextChange}
            className="w-full rounded border border-gray-300 p-2 focus:outline-gray-400"
            rows={5}
            placeholder="Write a brief bio for the doctor"
          ></textarea>
        </div>

        <button type="submit" className="cursor-pointer rounded-full bg-primary px-10 py-3 text-sm text-white">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;