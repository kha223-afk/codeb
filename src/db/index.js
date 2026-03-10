import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const baseUri = process.env.MONGOOSE_URI;

    if (!baseUri) {
      throw new Error("MONGOOSE_URI is missing in environment variables");
    }

    // If DB name is missing in URI, append it before query params.
    const hasDbInPath = /mongodb(?:\+srv)?:\/\/[^/]+\/[^?]+/.test(baseUri);
    let connectionUri = baseUri;

    if (!hasDbInPath) {
      if (baseUri.includes("?")) {
        const [beforeQuery, query = ""] = baseUri.split("?");
        const normalizedBase = beforeQuery.endsWith("/")
          ? beforeQuery.slice(0, -1)
          : beforeQuery;
        connectionUri = `${normalizedBase}/${DB_NAME}?${query}`;
      } else {
        const normalizedBase = baseUri.endsWith("/")
          ? baseUri.slice(0, -1)
          : baseUri;
        connectionUri = `${normalizedBase}/${DB_NAME}`;
      }
    }

    const connectionInstance = await mongoose.connect(connectionUri);

    console.log(
      `Mongoose connected: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongoose connection Error", error);
    process.exit(1);
  }
};

export default connectDB;
