import express from "express";
import { addDoctor, adminLogin, getADoctors } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',adminLogin)
adminRouter.get('/all-doctors',authAdmin,getADoctors)
adminRouter.post('/change-availablity',authAdmin,changeAvailablity)

export default adminRouter;