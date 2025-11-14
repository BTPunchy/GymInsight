const app = require("./app");
const cors = require("cors");
const http = require("http");
const userRoute = require("./modules/user/user.route");
const gymRoute = require("./modules/gym/gym.route");
const trainerRoute = require("./modules/trainer/trainer.route");

app.use(cors());
const server = http.createServer(app);
const PORT = 1234;

app.use("/users", userRoute);
app.use("/rooms", gymRoute);
app.use("/trainers", trainerRoute);

server.listen(PORT, () => {
  console.log(`In the beninging on port http://localhost:${PORT}`);
});
