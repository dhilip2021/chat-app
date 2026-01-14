import { Server } from "socket.io";


let io;


export async function GET() {
if (!io) {
io = new Server({ path: "/api/socket" });


io.on("connection", (socket) => {
socket.on("join", (userId) => {
socket.userId = userId;
io.emit("online", userId);
});


socket.on("send_message", (msg) => {
io.emit("receive_message", msg);
});


socket.on("disconnect", () => {
if (socket.userId) io.emit("offline", socket.userId);
});
});
}


return new Response("Socket Server Running");
}