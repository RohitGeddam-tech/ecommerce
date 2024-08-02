const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const socketio = require("socket.io");

// Routes
const productRoutes = require("./routes/products.routes.js");

const app = express();
const server = require("http").Server(app);
const io = socketio(server);

dotenv.config();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes)

app.get("/", (req, res) => res.send("hello world"));

server.listen(port, () => console.log(`listening at port ${port}`));

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
