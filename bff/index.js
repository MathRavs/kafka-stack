require('dotenv').config();
const { Server } = require("socket.io");
const express = require("express");
const { createServer } = require("http");
const { instrument } = require("@socket.io/admin-ui");
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});

// Serve static admin UI from your own app in dev mode only
if (process.env.NODE_ENV === 'development') {
    app.use('/admin', express.static(__dirname + '/node_modules/@socket.io/admin-ui/ui/dist'));
}

instrument(io, {
    auth: false
});

io.on("connection", () => {
  console.log("a user connected");
});

io.on("disconnect", () => {
  console.log("a user disconnected");
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});