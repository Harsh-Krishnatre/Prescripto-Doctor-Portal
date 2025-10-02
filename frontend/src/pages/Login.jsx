import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {


  const { backendUrl, uToken, setUToken } = useContext(AppContext)
  const navigate = useNavigate('')

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");
  const [name, setName] = useState("");


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if(state === "Sign Up"){
        const {data} = await axios.post(backendUrl+'/api/user/register',{name,password,email})
        if(data.success){
          localStorage.setItem('uToken',data.uToken)
          setUToken(data.uToken)
        }else{
          return toast.error(data.message)
          setState("Login")
        }

      }else{
        const {data} = await axios.post(backendUrl+'/api/user/login',{password,email})
        if(data.success){
          localStorage.setItem('uToken',data.uToken)
          setUToken(data.uToken)
        }else{
          return  toast.error(data.message)
          
        }
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message)
    }

  };

  return (
    <div className="container mb-20">
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center justify-center"
      >
        <div className="w-full max-w-xs border border-gray-300 rounded-2xl px-6 py-6 shadow-xl">
          <h2 className="font-semibold text-xl text-gray-700">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-gray-500 text-sm mb-3">
            Please {state === "Sign Up" ? "sign up" : "login"} to book an
            appointment
          </p>

          <div className="flex flex-col gap-2">
            {state === "Sign Up" && (
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-gray-600 text-xs mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 text-xs mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-600 text-xs mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPaswword(e.target.value)}
                className="h-9 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-black transition-colors duration-300 cursor-pointer mt-3 py-2 rounded-md text-white font-semibold"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
          </div>

          {/* Reduced font size and top margin */}
          <p className="text-xs text-gray-600 mt-5 text-start">
            {state === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}
            <span
              onClick={() => {
                setState(state === "Sign Up" ? "Login" : "Sign Up");
              }}
              className="text-primary font-semibold cursor-pointer hover:underline ml-1"
            >
              {state === "Sign Up" ? "Login here" : "Sign Up here"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;