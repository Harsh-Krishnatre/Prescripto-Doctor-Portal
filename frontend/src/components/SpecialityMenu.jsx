import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center py-14 gap-4 px-4">
      <p className="text-2xl md:3xl lg:4xl font-semibold">Find by Speciality</p>
      <p className="text-sm text-stone-600 text-center sm:w-2/5">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center pt-5 gap-4 w-full overflow-scroll ">
        {specialityData.map((item, index) => {
          return (
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={()=>scrollTo(0,0)}
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500  "
              key={index}
            >
              <img className="w-16 sm:24 mb-2 " src={item.image} alt="" />
              <br />
              <p className="text-sm">{item.speciality}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialityMenu;
