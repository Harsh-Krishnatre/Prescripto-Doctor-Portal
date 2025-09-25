import express from "express";
import { addDoctor, adminLogin, getADoctors } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',adminLogin)
adminRouter.post('/all-doctors',authAdmin,getADoctors)

export default adminRouter;