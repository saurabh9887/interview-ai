import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the db");
  } catch (error) {
    console.log(error);
    console.log("Failed to connect db");
  }
}

export default connectToDB;
