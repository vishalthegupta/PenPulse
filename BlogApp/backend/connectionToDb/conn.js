import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export const connectToDb = async() => {
    // console.log(process.env.MongoDbURL)
    const mongodbUri = `${process.env.MongoDbURL}`;

      try {
        await mongoose.connect(mongodbUri);
 
        console.log("Connected to DB");
      } catch (error) {
          console.log(`Failed to connect to DataBase because :  ${error}`)
      }
}

