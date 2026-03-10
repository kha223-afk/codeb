

 import dotenv from 'dotenv'
 import {app} from './app.js' 
import connectDB from "./db/index.js"
dotenv.config({
    path:'./.env'
})

connectDB()
.then(() => {
   app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
  console.log("Server is running on port:", process.env.PORT || 8000);

    })
})
.catch((err) => {
    console.error("MongoDB connection fail:", err);
});


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("OK");
// });

// const PORT = 8000;

// app.listen(PORT, () => {
//   console.log("LISTENING ON", PORT);
// });
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
