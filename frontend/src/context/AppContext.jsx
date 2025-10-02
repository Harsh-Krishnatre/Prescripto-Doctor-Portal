import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

  // Initialize token from localStorage
  const [uToken, setUToken] = useState(localStorage.getItem("uToken") || "");
  
  // Initialize userData as null
  const [userData, setUserData] = useState(null);

  // Function to save/remove token from state and localStorage
  const saveToken = (token) => {
    setUToken(token);
    if (token) {
      localStorage.setItem("uToken", token);
    } else {
      localStorage.removeItem("uToken");
    }
  };

  const getUserData = async (token) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-user", {
        headers: {
          utoken: token, // Use the provided token and the correct lowercase key
          'Content-Type': 'application/json' // Good practice to include
        },
      });
      if (data.success) {
        setUserData(data.user); // Corrected key
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  // This useEffect now correctly handles login/logout and page refresh
  useEffect(() => {
    if (uToken) {
      getUserData(uToken);
    } else {
      setUserData(null);
    }
  }, [uToken]);

  useEffect(() => {
    getDoctors();
  }, []);

  const value = {
    doctors,
    currencySymbol,
    uToken,
    setUToken: saveToken, // Expose the saveToken function to your components
    backendUrl,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;