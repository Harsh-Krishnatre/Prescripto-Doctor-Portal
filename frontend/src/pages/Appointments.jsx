import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useHorizontalScroll } from "../hooks/HorizontalScroll";
import RelatedDoctors from "../components/RelatedDoctors";

// ## Component 1: DoctorInfo
// Displays the doctor's information card.
const DoctorInfo = ({ docInfo }) => {
  const { currencySymbol } = useContext(AppContext);

  return (
    <div className="relative gap-4 flex flex-col md:flex-row">
      <img
        src={docInfo.image}
        alt={docInfo.name}
        className="w-full md:w-1/4 bg-primary rounded-xl object-cover"
      />
      <div className="flex flex-col gap-3 md:w-3/4 border border-gray-500 rounded-lg p-8">
        <p className="flex items-center gap-2 text-xl font-medium">
          {docInfo.name}
          <img src={assets.verified_icon} className="w-4 h-4" alt="Verified" />
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>
            {docInfo.degree} - {docInfo.speciality}
          </span>
          <div className="border border-gray-500 rounded-full py-1 px-2 text-[11px]">
            {docInfo.experience}
          </div>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-xs text-gray-900">
            About
            <img src={assets.info_icon} className="w-3 h-3" alt="Info" />
          </p>
        </div>
        <p className="text-xs text-gray-600 max-w-[95%]">{docInfo.about}</p>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          Appointment fee:
          <p className="text-md text-black font-medium">
            {currencySymbol}
            {docInfo.fees}
          </p>
        </div>
      </div>
    </div>
  );
};

// ## Component 2: DateSelector
// Renders the horizontally scrolling date tabs.
const DateSelector = ({ docSlots, selectedDateIndex, onDateSelect }) => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="flex flex-nowrap gap-3 items-center overflow-x-auto p-2 no-scrollbar">
      {docSlots.map((daySlots, index) => (
        <div
          key={index}
          onClick={() => onDateSelect(index)}
          className={`text-center py-6 px-2 min-w-20 rounded-full cursor-pointer transition-colors duration-200 ${
            selectedDateIndex === index
              ? "bg-primary text-white"
              : "border border-gray-300 hover:bg-gray-100"
          }`}
        >
          <p className="text-xs">{daysOfWeek[daySlots[0].dateTime.getDay()]}</p>
          <p className="font-bold text-medium">
            {daySlots[0].dateTime.getDate()}
          </p>
        </div>
      ))}
    </div>
  );
};

// ## Component 3: TimeSlots
// Renders the available time slots for the selected date.
const TimeSlots = ({ slots, selectedTime, onTimeSelect }) => {
  const scrollRef = useHorizontalScroll();

  if (!slots || slots.length === 0) {
    return (
      <div className="mt-4 text-sm text-gray-500">
        No available slots for this day.
      </div>
    );
  }

  return (
    <div
      className="flex items-center flex-nowrap gap-3 overflow-x-auto mt-4 min-w-0 py-2 no-scrollbar"
      ref={scrollRef}
    >
      {slots.map((slot, index) => (
        <p
          key={index}
          onClick={() => onTimeSelect(slot.time)}
          className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 ${
            selectedTime === slot.time
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          {slot.time.toLowerCase()}
        </p>
      ))}
    </div>
  );
};

// ## Main Component: Appointments
// Manages state and orchestrates the child components.
const Appointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const findDoctor = () => {
      const doc = doctors.find((d) => d._id === docId);
      setDocInfo(doc);
    };
    findDoctor();
  }, [doctors, docId]);

  useEffect(() => {
    const getAvailableSlots = () => {
      if (!docInfo) return;

      const allSlots = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date();
        day.setDate(day.getDate() + i);

        const startTime = new Date(day);
        startTime.setHours(10, 0, 0, 0);

        const endTime = new Date(day);
        endTime.setHours(21, 0, 0, 0);

        if (i === 0) {
          const now = new Date();
          const nextHour =
            now.getMinutes() < 30 ? now.getHours() : now.getHours() + 1;
          const nextMinute = now.getMinutes() < 30 ? 30 : 0;
          startTime.setHours(nextHour, nextMinute, 0, 0);
        }

        const timeSlots = [];
        while (startTime < endTime) {
          timeSlots.push({
            dateTime: new Date(startTime),
            time: startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
          startTime.setMinutes(startTime.getMinutes() + 30);
        }

        if (timeSlots.length > 0) {
          allSlots.push(timeSlots);
        }
      }
      setDocSlots(allSlots);
    };

    getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) {
    return (
      <div className="p-8 text-center">
        <p>Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="mb-20 ">
      <DoctorInfo docInfo={docInfo} />

      <div className="sm:ml-72 sm:pl-4 mt-4 flex flex-col font-medium text-gray-700 overflow-hidden">
        <p>Booking Slots</p>
        <DateSelector
          docSlots={docSlots}
          selectedDateIndex={selectedDateIndex}
          onDateSelect={(index) => {
            setSelectedDateIndex(index);
            setSelectedTime(""); // Reset time when date changes
          }}
        />
        <TimeSlots
          slots={docSlots.length > 0 ? docSlots[selectedDateIndex] : []}
          selectedTime={selectedTime}
          onTimeSelect={setSelectedTime}
        />
        <button className="bg-primary my-6 py-3 px-6 max-w-[500px] lg:w-1/3 text-white font-light text-sm rounded-full cursor-pointer">
          Book an appointment
        </button>
      </div>
      <RelatedDoctors docId = {docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointments;
