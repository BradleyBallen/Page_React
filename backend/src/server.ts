import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { registerChatSocket } from "./sockets/chat.socket";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL },
});

// Conectar sockets
registerChatSocket(io);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
