// server.js
const express = require("express"); // ถ้า app.js เป็น express ก็ require มา
const cors = require("cors");
const http = require("http");
const app = require("./app"); 
// routes
const userRoute = require("./modules/user/user.route");
const gymRoute = require("./modules/gym/gym.route");
const trainerRoute = require("./modules/trainer/trainer.route");

// สมมติ app.js เป็น express instance

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/users", userRoute);
app.use("/rooms", gymRoute);
app.use("/trainers", trainerRoute);

// server
const PORT = 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
