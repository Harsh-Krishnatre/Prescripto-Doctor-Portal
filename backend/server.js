import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// app config
const app = express();
const PORT = process.env.PORT || 4000
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// endpoint api
app.get('/',(req,res)=>{
  res.send('API Working now ');
})
app.use('/api/admin',adminRouter);
// localhost:5173/api/admin/add-doctor


app.listen(PORT,()=>{
  console.log("Server is running on",PORT);
  
})