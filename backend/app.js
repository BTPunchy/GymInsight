const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes (ถ้ามี route เรียกผ่าน app.js ก็ได้)
const userRoute = require("./modules/user/user.route");
const gymRoute = require("./modules/gym/gym.route");
const trainerRoute = require("./modules/trainer/trainer.route");

app.use("/users", userRoute);
app.use("/rooms", gymRoute);
app.use("/trainers", trainerRoute);

module.exports = app; // ต้อง export app
