
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {

  const navigate = useNavigate();

  const {doctors } =  useContext(AppContext);

  return (
    <div className="flex flex-col items-center my-10 text-gray-900 sm:mx-10 gap-4 px-4">
      <p className="text-2xl font-medium">
        Top Doctors to Book
      </p>
      <p className="text-sm text-center sm:w-1/3 text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="pt-5 px-3 sm:px-0 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {doctors.slice(0, 10).map((doctor, index) => {
          return (
            <Link
              key={index}
              to={`/appointments/${doctor._id}`}
              className="border border-gray-200 rounded-xl shadow-sm hover:translate-y-[-5px] transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <img className="bg-blue-50 w-full" src={doctor.image} alt="" />
              <div className="p-4">
                <div className="text-green-500 gap-2 text-sm flex items-center text-center">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-sm text-gray-900 font-semibold">{doctor.name}</p>
                <p className="text-xs text-gray-500 font-medium">
                  {doctor.speciality}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="bg-blue-50 px-12 py-3 text-gray-600 cursor-pointer text-sm rounded-full flex flex-wrap gap-4 mt-6">
        more
      </button>
    </div>
  );
};

export default TopDoctors;