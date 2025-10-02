import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

// --- Reusable Field Component ---
const EditableField = ({ icon, label, value, onChange, isEdit, type = 'text', children }) => {
  return (
    <div className="grid grid-cols-[28px_1fr] items-start gap-5">
      <div className="flex justify-center pt-1">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        {isEdit ? (
          children || <input
            className="w-full text-lg text-gray-800 bg-slate-100 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            type={type}
            value={value || ''}
            onChange={onChange}
          />
        ) : (
          <p className="text-lg font-medium text-gray-800 mt-1">{value || 'Not set'}</p>
        )}
      </div>
    </div>
  );
};

// --- Main Profile Component ---
const MyProfile = () => {
  const { userData, setUserData, uToken, backendUrl, getUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfile = async () => {
    // ... (Your existing API call logic remains the same)
    try {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("phone", userData.phone);
        formData.append("address", JSON.stringify(userData.address));
        formData.append('gender', userData.gender);
        formData.append('dob', userData.dob);

        if (image) {
          formData.append("image", image);
        }

        const response = await fetch(backendUrl + "/api/user/update-user", {
          method: 'POST',
          headers: { utoken: uToken },
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Profile updated successfully!");
          await getUserData(uToken);
setIsEdit(false);
          setImage(false);
        } else {
          toast.error(data.message);
        }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  if (!userData) {
    return <p className="text-center mt-10 text-gray-500 animate-pulse">Loading Your Profile...</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100 font-sans mb-20">
      
      {/* Profile Header (Responsive) */}
      <header className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-10 text-center sm:text-left">
        <label htmlFor="image" className={`relative cursor-pointer group ${!isEdit && 'pointer-events-none'}`}>
          <img className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full ring-4 ring-white shadow-md transition-transform group-hover:scale-105" src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
          {isEdit && (
            <div className="absolute inset-0 bg-black bg-opacity-80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-300">
              <img className="w-8" src={assets.upload_icon} alt="Upload" />
            </div>
          )}
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden disabled={!isEdit} />
        </label>
        
        <div className="flex-grow">
          {isEdit ? (
            <input
              className="text-3xl md:text-4xl font-bold text-gray-800 w-full bg-slate-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition text-center sm:text-left"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{userData.name}</h1>
          )}
        </div>
      </header>
      
      {/* Profile Details (Responsive Grid) */}
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        <EditableField 
            icon={<img src={assets.email_icon} className="w-6 opacity-40"/>} 
            label="Email Address"
            value={userData.email}
            isEdit={false}
        />
        <EditableField 
            icon={<img src={assets.phone_icon} className="w-6 opacity-40"/>} 
            label="Phone Number"
            value={userData.phone}
            isEdit={isEdit}
            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <EditableField 
            icon={<img src={assets.location_icon} className="w-6 opacity-40"/>} 
            label="Address"
            value={`${userData.address?.line1 || ''}${userData.address?.line2 ? `, ${userData.address.line2}` : ''}`}
            isEdit={isEdit}
            onChange={(e) => {
                const [line1, ...line2] = e.target.value.split(',');
                setUserData((prev) => ({ ...prev, address: { line1: line1.trim(), line2: line2.join(',').trim() } }));
            }}
        />
        <EditableField 
            icon={<img src={assets.birthday_icon} className="w-6 opacity-40"/>} 
            label="Birthday"
            type="date"
            value={userData.dob}
            isEdit={isEdit}
            onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
        />
        <EditableField 
            icon={<img src={assets.gender_icon} className="w-6 opacity-40"/>} 
            label="Gender"
            isEdit={isEdit}
        >
            <select
                className="w-full text-lg text-gray-800 bg-slate-100 p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="Not Selected">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
        </EditableField>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
        {isEdit ? (
          <>
            <button
                className="text-gray-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => {
                    setIsEdit(false);
                    getUserData(uToken); 
                }}
            >
                Cancel
            </button>
            <button
                className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-primary/80 transition-colors shadow-sm"
                onClick={updateUserProfile}
            >
                Save Changes
            </button>
          </>
        ) : (
          <button
            className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-primary/80 transition-colors shadow-sm flex items-center gap-2"
            onClick={() => setIsEdit(true)}
          >
            <img src={assets.edit_icon} className="w-4"/> 
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;