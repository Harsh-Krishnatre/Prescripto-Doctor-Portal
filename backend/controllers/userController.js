import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from "cloudinary";
// api to register user

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Incomplete Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const salt = await bcrypt.genSalt(9);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    const uToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, uToken });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const uToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, uToken });
    } else {
      res.json({ success: false, message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "Incomplete Details" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // uplaod image to cloudinary
      const imageUplaoad = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUplaoad.secure_url;

      await userModel.findByIdAndUpdate(userId, {
        image: imageUrl,
      });
    }

    res.json({ success: true, message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor is not available right now",
      });
    }

    let slots_booked = docData.slots_booked;

    // checking for slots availability
    if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    } else {
      if (slots_booked[slotDate]) {
        slots_booked[slotDate].push(slotTime);
      } else {
        slots_booked[slotDate] = [slotTime];
      }
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const newAppointment = new appointmentModel({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    });

    await newAppointment.save();

    // save new slots booked in doctor collection
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Booked Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get all user appointments 
const getUserAppointments = async(req,res)=>{
  try {
    const {userId} = req.body;
    const appointments = await appointmentModel.find({userId}).sort({date:-1});
    res.json({success:true,appointments});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// api to cancel appointment

const cancelAppointment = async(req,res)=>{
  try {
    const { userId, appointmentId} = req.body;
    const appointment = await appointmentModel.findById(appointmentId)

    if(!appointment){
      return res.status(404).json({success:false, message:"Appointment not found"});
    }

    if(appointment.userId != userId){
      return res.status(401).json({success:false, message:"You are not authorized to cancel this appointment"});
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true});

    const {slotDate , slotTime, docId} = appointment;

    const doctor = await doctorModel.findById(docId);
    let slots_booked = doctor.slots_booked;
    if(slots_booked[slotDate]){
      slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
    }
    await doctorModel.findByIdAndUpdate(docId, {slots_booked});

    res.json({success:true, message:"Appointment cancelled successfully"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// api to make payment
const paymentRazorPay = async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}

export { userRegister, userLogin, getUser, userUpdate, bookAppointment, getUserAppointments, cancelAppointment };
