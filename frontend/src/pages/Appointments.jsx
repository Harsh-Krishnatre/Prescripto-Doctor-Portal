import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useHorizontalScroll } from "../hooks/HorizontalScroll";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

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

// Skeleton Loader component to prevent layout shift
const DoctorInfoSkeleton = () => (
    <div className="relative gap-4 flex flex-col md:flex-row animate-pulse">
      <div className="w-full md:w-1/4 h-48 bg-gray-200 rounded-xl"></div>
      <div className="flex flex-col gap-4 md:w-3/4 border border-gray-300 rounded-lg p-8">
        <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-3 w-1/4 bg-gray-200 rounded mt-2"></div>
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
      </div>
    </div>
);

// ## Main Component: Appointments
const Appointments = () => {
  const { docId } = useParams();
  const { doctors, backendUrl, getDoctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const bookAppointment = async () => {
    if (!selectedTime) {
      return toast.warn("Please select a time slot.");
    }
    try {
      const dates = docSlots[selectedDateIndex][0].dateTime;
      const slotdate = `${dates.getDate()}-${dates.getMonth() + 1}-${dates.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate: slotdate, slotTime: selectedTime }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctors(); // Refresh doctor data to update slots
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while booking.");
      console.log(error);
    }
  };
  
  // ✅ FIX: Combined useEffect to prevent cascading re-renders and layout shift
  useEffect(() => {
    if (doctors.length > 0) {
      const doc = doctors.find((d) => d._id === docId);
      if (doc) {
        setDocInfo(doc);
        
        // Calculate slots right after finding the doctor
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
            const nextHour = now.getMinutes() < 30 ? now.getHours() : now.getHours() + 1;
            const nextMinute = now.getMinutes() < 30 ? 30 : 0;
            startTime.setHours(nextHour, nextMinute, 0, 0);
          }

          const timeSlots = [];
          while (startTime < endTime) {
            const formattedTime = startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const slotDate = `${startTime.getDate()}-${startTime.getMonth() + 1}-${startTime.getFullYear()}`;
            const isBooked = doc.slots_booked && doc.slots_booked[slotDate] && doc.slots_booked[slotDate].includes(formattedTime);

            if (!isBooked) {
              timeSlots.push({ dateTime: new Date(startTime), time: formattedTime });
            }
            startTime.setMinutes(startTime.getMinutes() + 30);
          }
          if (timeSlots.length > 0) allSlots.push(timeSlots);
        }
        setDocSlots(allSlots);
      }
    }
  }, [doctors, docId]);
  
  // ✅ FIX: Use Skeleton Loader to prevent layout shift during loading
  if (!docInfo) {
    return (
      <div className="p-8">
        <DoctorInfoSkeleton />
      </div>
    );
  }

  return (
    <div className="mb-20">
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
        <button
          onClick={bookAppointment}
          className="bg-primary my-6 py-3 px-6 max-w-[500px] lg:w-1/3 text-white font-light text-sm rounded-full cursor-pointer"
        >
          Book an appointment
        </button>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointments;  