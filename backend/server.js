import http from "http";
import app from "./app.js";
import userRoute from "./modules/user/user.route.js";
import gymRoute from "./modules/gym/gym.route.js";
import cors from "cors";

app.use(cors());

const server = http.createServer(app);
const PORT = 1234;

app.use("/users", userRoute);
app.use("/rooms", gymRoute);

server.listen(PORT, () => {
  console.log(`In the beninging on port http://localhost:${PORT}`);
});
