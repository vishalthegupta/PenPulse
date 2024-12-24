import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
import { connectToDb } from './connectionToDb/conn.js'
import cookieParser from "cookie-parser";

const app = express();


// Setting up cors
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};
app.use(cors(corsOptions)); 


const PORT = process.env.PORT || 4040;

connectToDb();


// Middlewares
app.use(express.json());
app.use(cookieParser());


// Importing APIs
import authRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'


// Setting up API endpoints
app.use('/api/auth' , authRoutes);
app.use('/api/post' , postRoutes);



// Starting the server
app.listen(PORT , () => {
     console.log(`Server is running at port no : ${PORT}`)
})




