import React, { use, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = React.useContext(AppContext);

  const [docInfo, setDocInfo] = React.useState(null);
  const [docSlots, setDocSlots] = React.useState([]);
  const [slotIndex, setSlotIndes] = React.useState(0);
  const [slotTime, setSlotTime] = React.useState("");

  const findDoctor = () => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = () => {
    setDocSlots([]);

    // getting current date and time
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // settin end time od the date
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i); 
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          today.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0);
        currentDate.setHours(
          today.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prevSlots) => [...prevSlots, timeSlots]);
    }
  };

  useEffect(() => {
    findDoctor();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  if (!docInfo) {
    return (
      <div className="p-8 text-center">
        <p>Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="mb-20">
      <div className="relative gap-4 flex flex-col md:flex-row ">
        {/* left side */}
        <img
          src={docInfo.image}
          alt=""
          className="w-1/4 bg-primary rounded-xl hidden md:block"
        />
        {/* right side */}
        <div className="flex flex-col gap-3 max-w-full md:w-3/4 border border-gray-500 max-h-full rounded-lg p-8">
          <p className="flex flex-row gap-2 text-xl font-medium">
            {docInfo.name}{" "}
            <img src={assets.verified_icon} className="w-4" alt="" />
          </p>
          <div className="flex flex-row items-center gap-1 text-xs text-gray-600 ">
            {docInfo.degree} - {docInfo.speciality}
            <div className="border border-gray-500 rounded-full py-1 px-2 text-[11px]">
              {docInfo.experience}
            </div>
          </div>
          <div>
            <p className="flex flex-row items-center gap-1.5 text-xs text-gray-900">
              About <img src={assets.info_icon} className="w-3" alt="" />
            </p>
          </div>
          <p className="text-xs text-gray-600 max-w-[95%] md:max-w-4/5">
            {docInfo.about}
          </p>
          <div className="flex flex-row gap-1 text-sm text-gray-600">
            Appointment fee:{" "}
            <p className="text-md text-black font-medium">
              {currencySymbol}
              {docInfo.fees}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
