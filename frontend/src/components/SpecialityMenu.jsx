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
      {/*
        FIX: Added 'flex-wrap' to allow items to wrap on smaller screens.
        Changed 'sm:justify-center' to 'justify-center' for consistent centering.
      */}
      <div className="flex flex-wrap justify-center items-center pt-5 gap-4 w-full">
        {specialityData.map((item, index) => {
          return (
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="w-16 sm:w-24 mb-2" src={item.image} alt={item.speciality} />
              <p className="text-sm">{item.speciality}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialityMenu;