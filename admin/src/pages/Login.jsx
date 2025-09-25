import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const {setAToken,backendUrl} = useContext(AdminContext);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      if(state === "Admin"){
        const {data} = await axios.post(backendUrl+'/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('aToken',data.token)
          setAToken(data.token);
          toast.success("login succesful")
          
        } else{
          toast.error(data.message);
        }
      }else{

      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
    }
  }




  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-none rounded-xl text-stone-700 text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e)=>{setEmail(e.target.value)}}
            value={email}
            className="border border-stone-300 rounded w-full p-1 pt-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
            className="border border-stone-300 rounded w-full p-1 pt-2 mt-1"
            type="password"
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="cursor-pointer text-primary underline "
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="cursor-pointer text-primary underline "
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
