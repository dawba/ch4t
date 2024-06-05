import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import MessageRouter from "./entities/message/router.js";
import ChatRouter from "./entities/chat/router.js";
import UserRouter from "./entities/user/router.js";
import { MessageService } from "./entities/message/MessageService.js";

// Load env vars from .env
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 5050;
const app = express();

const uri = process.env.ATLAS_URI || "";

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("connected", () => {
  console.log("Mongoose is connected");
});

db.on("error", (err) => {
  console.error("Connection error", err);
});

(async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log("Error when opening the connection", error);
  }
})();

app.use(cors());
app.use(express.json());
app.use("/api/message", MessageRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/user", UserRouter);

const server = http.createServer(app);
const messageService = new MessageService();

// Websocket preparation
// Binding Socket.IO to our server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (adjust as needed for security)
    methods: ["GET", "POST"],
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a specific chat room
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  // Handle sending messages
  socket.on("sendMessage", async (messageData) => {
    console.log(messageData);
    const { chatId, messageObject } = messageData;
    console.log("Message sent:", messageObject);
    await messageService.createMessageForChat(chatId, messageObject);
    io.to(chatId).emit("receiveMessage", messageObject);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
