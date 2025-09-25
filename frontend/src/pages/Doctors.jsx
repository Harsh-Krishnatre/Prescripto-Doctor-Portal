import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

// Define specialties in an array for easier maintenance
const specialties = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const Doctors = () => {
  const { speciality: currentSpeciality } = useParams(); // Rename for clarity
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // Memoize this function for better performance in larger apps
  useEffect(() => {
    if (currentSpeciality) {
      setFilteredDoctors(
        doctors.filter((doc) => doc.speciality === currentSpeciality)
      );
    } else {
      setFilteredDoctors(doctors); // If no speciality in URL, show all doctors
    }
  }, [doctors, currentSpeciality]);

  // Function to handle filter button clicks
  const handleFilterClick = (speciality) => {
    // If the clicked filter is already active, remove it. Otherwise, apply it.
    if (currentSpeciality === speciality) {
      navigate("/doctors/");
    } else {
      navigate(`/doctors/${speciality}`);
    }
  };

  return (
    <div className="my-10">
      <p className="text-center md:text-left text-gray-500 mb-6">
        Browse through our specialists.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter && "bg-primary text-white"
          }`}
        >
          Filters
        </button>
        {/* --- SPECIALTY FILTERS (Sidebar) --- */}
        <div
          className={`w-full md:w-1/4 flex-col items-center px-4 md:px-0 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {specialties.map((speciality) => (
            <button
              key={speciality}
              onClick={() => handleFilterClick(speciality)}
              className={`
                border my-1 rounded px-2 py-2 text-sm transition-all duration-300
                w-full text-left md:min-w-full 
                ${
                  currentSpeciality === speciality
                    ? "bg-blue-100 border-blue-100 font-semibold"
                    : "border-gray-300 hover:bg-blue-50 hover:border-blue-100"
                }
              `}
            >
              {speciality}
            </button>
          ))}
        </div>

        {/* --- DOCTORS LIST --- */}
        <div className="flex-1 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id} // Use a unique ID like doctor._id for the key
              className="border border-blue-200 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300 overflow-hidden cursor-pointer"
              onClick={() => {
                navigate(`/appointments/${doctor._id}`);
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="bg-blue-50 w-full aspect-square object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="font-semibold text-gray-900 mt-1">
                  {doctor.name}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {doctor.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
