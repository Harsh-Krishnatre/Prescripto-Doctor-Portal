import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointments = () => {
  const { backendUrl, uToken, getDoctors } = useContext(AppContext);

  const [appointments, setAppointments] = React.useState([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormatter = (slotDate) => {
    const dateArray = slotDate.split("-");
    return dateArray[0] + " " + months[dateArray[1] - 1] + ", " + dateArray[2];
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/my-appointments",
        { headers: { uToken } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { uToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (uToken) {
      getAppointments();
    }
  }, [uToken]);

  return (
    <div className="mb-20">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300 text-xl">
        My Appointments
      </p>
      <div>
        {appointments.slice(0,20).map((doc, id) => {
          return (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300"
              key={id}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={doc.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {doc.docData.name}
                </p>
                <p>{doc.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{doc.docData.address.line1}</p>
                <p className="text-xs">{doc.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:{" "}
                  </span>
                  {slotDateFormatter(doc.slotDate)} | {doc.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!doc.cancelled ? (
                  <div className="flex flex-col gap-2 justify-end">
                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-400 cursor-pointer">
                      Pay Online
                    </button>
                    <button
                      onClick={() => {
                        cancelAppointment(doc._id);
                      }}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-400 cursor-pointer"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                ) : (
                  <button
                    disabled
                    className="text-sm text-white text-center sm:min-w-48 py-2 border rounded bg-gray-300 cursor-not-allowed"
                  >
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
