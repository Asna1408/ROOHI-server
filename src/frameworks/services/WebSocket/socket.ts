
import { Server as HTTPServer } from "http";
import { Server as SocketIoServer } from "socket.io";

function initializeSocket(server: HTTPServer): SocketIoServer {
  console.log("Initializing socket");

//   const allowedOrigins: any = [
//     "https://elitemediator.shop",
//     "https://www.elitemediator.shop"
//   ];
  
  const io = new SocketIoServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization", "Content-Type"],
      credentials: true,
    },
  });


  io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
    });

    socket.on("join room", (roomId) => {
      console.log(`Socket ${socket.id} joining room ${roomId}`);
      socket.join(roomId);
      socket.emit('join room', roomId)
    });

    socket.on('typing', (roomId) => {
      socket.in(roomId).emit("typing")
    })

    socket.on('stop typing', (roomId) => {
      socket.in(roomId).emit("stop typing")
    })

    socket.on('notify', (id)=>{
      console.log(id + '👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👍😍😘');
      io.to(id).emit('notify', id);
  })

    socket.on('send-message', (data)=>{
      console.log("sending message 😂😂😂😂😂😂😂😂",data);
      io.to(data).emit('send-message', data);
    })
  });

  return io;
}


export { initializeSocket };



