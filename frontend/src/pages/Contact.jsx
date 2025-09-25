import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="my-10 mb-30">
      <p className="text-center text-2xl text-gray-600">
        CONTACT <span className="font-bold text-black">US</span>
      </p>
      <div className="flex flex-col md:flex-row my-15 mx-10 md:ml-40 gap-8">
        <img src={assets.contact_image} alt="" className="w-full md:w-[360px]" />
        <div className="">
          <div className="text-lg font-medium text-gray-700 mt-6 mb-4">
            OUR OFFICE
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <p>ABC 123</p>
            <p>DEF 456, WXYZ, GHI</p>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <p>Tel: (415) 555‑0132</p>
            <p>Email: hkrishnatre@gmail.com</p>
          </div>

          <div className="text-lg font-medium text-gray-700 mt-6 mb-4">Careers at PRESCRIPTO</div>
          <p className="text-sm text-gray-600 mb-4">Learn more about our teams and job openings.</p>
          <button className="text-sm text-gray-600 mb-4 border-1 border-gray-500 py-3 px-6 hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
