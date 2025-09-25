import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'

// PASTE THIS ENTIRE FUNCTION
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available, // This will be the string "true" from Postman
    } = req.body;

    const imageFile = req.file;
    

    // Validation check
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.status(400).json({ success: false, message: "Missing required details. Please provide all fields including an image." });
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email format." });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Cloudinary upload
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      available: available === 'true', // Convert string "true" to boolean true
      date: Date.now()
    };
    
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res.status(201).json({ success: true, message: "Doctor Added Successfully" });

  } catch (error) {
    console.error("ERROR IN addDoctor:", error); // Use console.error for better logging
    return res.status(500).json({ success: false, message: "Server error occurred.", error: error.message });
  }
};


// api to get all doctor list for admin panel
const getADoctors = async (req,res) =>{
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})

  } catch (error) {
    console.error("ERROR IN addDoctor:", error); // Use console.error for better logging
    return res.status(500).json({ success: false, message: "Server error occurred.", error: error.message });
  }
}


const adminLogin = async(req,res) =>{
  try{
      const {email,password} = req.body

      if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})
      }else{
        res.status(401).json({success:false,message:"Invalid admin credentials"})
      }

  } catch (error) {
      console.error("ERROR IN addDoctor:", error); // Use console.error for better logging
      return res.status(500).json({ success: false, message: "Server error occurred.", error: error.message });
  }
}

export { addDoctor,adminLogin,getADoctors };