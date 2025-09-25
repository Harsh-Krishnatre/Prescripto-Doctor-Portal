import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h[90vh] overflow-y-scroll no-scrollbar">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, id) => {
          return (
            <div className="border border-indigo-200 rounded-xl w-42 overflow-hidden cursor-pointer group" key={id} >
              <img className="bg-color-50 group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
              <div className="p-2">
                <p className="text-neutral-800 text-md font-medium">{item.name}</p>
                <p className="text-neutral-600 text-sm ">{item.speciality}</p>
                <div className="flex items-center space-x-4">
                  <span>Available</span>
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={item.available}
                      className="toggle-checkbox sr-only"
                    />
                    <div className="toggle-label relative h-4 w-7 rounded-full bg-gray-300 shadow-inner transition-all duration-300 ease-in-out">
                      <div className="toggle-circle absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out"></div>
                    </div>
                  </label>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorsList;
