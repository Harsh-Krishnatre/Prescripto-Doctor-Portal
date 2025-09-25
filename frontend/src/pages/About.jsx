import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="mb-50">
      <p className="text-center text-2xl text-gray-600">
        ABOUT <span className="font-bold text-black">US</span>
      </p>
      <div className="flex flex-col md:flex-row my-12 gap-10">
        <img src={assets.about_image} alt="" className="w-full md:w-1/3" />
        <div className="text-gray-600 text-md font-light">
          <p className="py-3 ">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className="pb-3">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <p className="pb-3 font-bold">Our Vision</p>
          <p className="">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      <div className="mb-10">
        <p className=" text-lg text-gray-600 mb-10">
          WHY <span className="font-bold text-black">CHOOSE US</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full text-gray-600">
          <div className="border border-gray-400 px-10 py-8 hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer">
            <p className="mb-4 font-semibold">Efficiency:</p>
            <p className="mb-4">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="border border-gray-400 px-10 py-8 hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer">
            <p className="mb-4 font-semibold">Convenience:</p>
            <p className="mb-4">Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="border border-gray-400 px-10 py-8 hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer">
            <p className="mb-4 font-semibold">Personalization:</p>
            <p className="mb-4">Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
