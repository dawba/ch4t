import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import router from "./routes/routes.js";
import mongoose from "mongoose";
// import db from "./db/connection.js";

// Load env vars from .env
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 5050;
const app = express();

const uri = process.env.ATLAS_URI || "";

const db = mongoose.connection;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

mongoose.connection.on("error", (err) => {
  console.error("Connection error", err);
});

try {
  await mongoose.connect(uri);
} catch (error) {
  console.log("Error when opening the connection", error);
}

app.use(cors());
app.use(express.json());
app.use("/api", router);

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
