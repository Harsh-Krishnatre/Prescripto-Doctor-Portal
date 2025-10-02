import doctorModel from "../models/doctorModel.js";

const changeAvailablity = async(req,res) =>{
  try {
    
    const {docId} = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
    res.json({success:true,message:'Availablity changed'}) 


  } catch (error) {
    console.error("ERROR IN addDoctor:", error); // Use console.error for better logging
    return res.status(500).json({ success: false, message: "Server error occurred.", error: error.message });
  }
}

const getDoctorList = async(req,res) =>{
  try {
    const doctors = await doctorModel.find({}).select(['-email','-password'])
    res.json({success:true,doctors})

  } catch (error) {
    console.error(error.message)
  }
}

export {changeAvailablity,getDoctorList}