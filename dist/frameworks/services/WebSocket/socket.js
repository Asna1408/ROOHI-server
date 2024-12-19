"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
const socket_io_1 = require("socket.io");
const onlineUsers = new Map(); // Map of userId to socketId
function initializeSocket(server) {
    console.log("Initializing socket");
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: ["https://perfect-bride.vercel.app"],
            // origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["Authorization", "Content-Type"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.id);
        socket.on("user-connected", (userId) => {
            onlineUsers.set(userId, socket.id);
            io.emit("update-online-status", Array.from(onlineUsers.keys()));
        });
        socket.on("disconnect", () => {
            var _a;
            const disconnectedUserId = (_a = [...onlineUsers.entries()].find(([_, id]) => id === socket.id)) === null || _a === void 0 ? void 0 : _a[0];
            if (disconnectedUserId) {
                onlineUsers.delete(disconnectedUserId);
                io.emit("update-online-status", Array.from(onlineUsers.keys()));
            }
            console.log("User disconnected: " + socket.id);
        });
        socket.on("join room", (roomId) => {
            console.log(`Socket ${socket.id} joining room ${roomId}`);
            socket.join(roomId);
            socket.emit('join room', roomId);
        });
        socket.on('typing', (roomId) => {
            socket.in(roomId).emit("typing");
        });
        socket.on('stop typing', (roomId) => {
            socket.in(roomId).emit("stop typing");
        });
        socket.on('notify', (id) => {
            console.log(id + '👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👍😍😘');
            io.to(id).emit('notify', id);
        });
        socket.on('send-message', (data) => {
            console.log("sending message 😂😂😂😂😂😂😂😂", data);
            io.to(data).emit('send-message', data);
        });
    });
    return io;
}
