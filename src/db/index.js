import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGOOSE_URI}/${DB_NAME}?retryWrites=true&w=majority`
    );

    console.log(
      `Mongoose connected: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongoose connection Error", error);
    process.exit(1);
  }
};

export default connectDB;
