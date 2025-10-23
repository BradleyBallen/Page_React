import { Server } from "socket.io";

export const registerChatSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Client connected");
  });
};