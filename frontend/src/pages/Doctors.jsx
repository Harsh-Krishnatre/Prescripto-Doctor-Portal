import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilteredDoctors(
        doctors.filter((doc) => doc.speciality === speciality)
      );
    } else {
      setFilteredDoctors(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="my-10 ">
      <p className="flex flex-col items-center md:items-start gap-4 text-md sm:text-sm font-medium text-gray-500  ">
        Browse through the doctors specialist.
      </p>
      <div className="flex flex-col sm:flex-row  items-center md:items-start gap-8 pt-2 ">
        <div className="flex w-1/4 flex-col items-center md:items-start text-gray-600 cursor-pointer ">
          <p
            onClick={() => {
              speciality === "General physician"
                ? navigate("/doctors/")
                : navigate("/doctors/General%20physician");
            }}
            className={`border ${
              speciality === "General physician"
                ? "bg-blue-100 border-blue-100"
                : "border-gray-400"
            }  my-2 rounded-lg px-6 text-sm hover:bg-blue-100 hover:border-blue-100 duration-300 py-2 shadow-md min-w-full`}
          >
            General physician
          </p>
          <p
            onClick={() => {
              speciality === "Gynecologist"
                ? navigate("/doctors/")
                : navigate("/doctors/Gynecologist");
            }}
            className={`border ${
              speciality === "Gynecologist"
                ? "bg-blue-100 border-blue-100"
                : "border-gray-400"
            } my-2 rounded-lg px-6 text-sm hover:bg-blue-100 hover:border-blue-100 duration-300 py-2 shadow-md min-w-full`}
          >
            Gynecologist
          </p>
          <p
            onClick={() => {
              speciality === "Dermatologist"
                ? navigate("/doctors/")
                : navigate("/doctors/Dermatologist");
            }}
            className={`border ${
              speciality === "Dermatologist"
                ? "bg-blue-100 border-blue-100"
                : "border-gray-400"
            } my-2 rounded-lg px-6 text-sm hover:bg-blue-100 hover:border-blue-100 duration-300 py-2 shadow-md min-w-full`}
          >
            Dermatologist
          </p>
          <p
            onClick={() => {
              speciality === "Pediatricians"
                ? navigate("/doctors/")
                : navigate("/doctors/Pediatricians");
            }}
            className={`border ${
              speciality === "Pediatricians"
                ? "bg-blue-100 border-blue-100"
                : "border-gray-400"
            } my-2 rounded-lg px-6 text-sm hover:bg-blue-100 hover:border-blue-100 duration-300 py-2 shadow-md min-w-full`}
          >
            Pediatricians
          </p>
          <p
            onClick={() => {
              speciality === "Neurologist"
                ? navigate("/doctors/")
                : navigate("/doctors/Neurologist");
            }}
            className={`border  ${
              speciality === "Neurologist"
                ? "bg-blue-100 border-blue-100"
                : "border-gray-400"
            } my-2 rounded-lg px-6 text-sm hover:bg-blue-100 hover:border-blue-100 duration-300 py-2 shadow-md min-w-full`}
          >
            Neurologist
          </p>
          <p
            onClick={() => {
              speciality === "Gastroenterologist"
                ? navigate("/doctors/")
                : navigate("/doctors/Gastroenterologist");
            }}
            className={`border  ${
              speciality === "Gastroenterologist"
                ? "bg-blue-100 border-blue-100"
                : "border-gray-400"
            } my-2 rounded-lg px-6 text-sm hover:bg-blue-100 hover:border-blue-100 duration-300 py-2 shadow-md min-w-full`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full px-5 pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredDoctors.map((doctors, index) => {
            return (
              <div
                key={index}
                className="border border-blue-200 rounded-xl shadow-sm hover:translate-y-[-5px] transition-all duration-500 overflow-hidden cursor-pointer "
                onClick={() => {
                  navigate(`/appointments/${doctors._id}`);
                  scrollTo(0, 0);
                }}
              >
                <img src={doctors.image} alt="" className="bg-blue-50 w-full" />
                <div className="p-4">
                  <div className="text-green-500 gap-2 text-sm flex items-center text-center">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-sm text-gray-900 font-semibold">
                    {doctors.name}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {doctors.speciality}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
