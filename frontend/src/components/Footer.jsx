import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="container">
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4 mb-6 mx-6 md:mx-10'>
      {/* left side */}
      <div className='flex flex-col gap-6 items-center text-center md:items-start md:text-left mb-8'>
        <img
        className="w-30 cursor-pointer"
        src={assets.logo}
        alt="Prescripto"
        onClick={()=>{navigate('/'); scrollTo(0,0)}}
      />
      <p className='text-gray-600 sm:text-base md:text-sm '>Prescripto is dedicated to simplifying your healthcare journey. We connect you with trusted doctors and specialists, allowing you to book appointments effortlessly and manage your health on your terms.</p>
      </div>
      {/* right side */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mx-5'>
        <div className='flex flex-col items-center md:items-start mb-8 text-gray-600'>
          <p className='font-medium'>COMPANY</p>
          <div className='flex flex-col md:flex-wrap items-center md:items-start gap-2 text-gray-600 sm:text-base md:text-sm pt-5 cursor-pointer'>
            <a href="#">Home</a>
            <a>About us</a>
            <a>Contact us</a>
            <a>Privacy policy</a>
          </div>
        </div>
        <div className='flex flex-col items-center md:items-start '>
          <p>GET IN TOUCH</p>
          <div className='flex flex-col md:flex-wrap items-center md:items-start gap-2 text-gray-600 sm:text-base md:text-sm pt-5 cursor-pointer'>
            <a href="">+91 7678166809</a>
            <a href="">krish.15082003@gmail.com</a>
          </div>
        </div>

        {/* copyright text */}
         
      </div>
    </div>
    <div className='text-center text-gray-600 text-sm mb-4 '>
      <hr className='mb-6 text-gray-400'/>
      © 2025 Prescripto. All rights reserved. Designed by Harsh Krishnatre
    </div>
    </div>
    
  )
}

export default Footer