const app = require("./app");
const http = require("http");
const userRoute = require("./modules/user/user.route");

const server = http.createServer(app);
const PORT = 1234;

app.use("/users", userRoute);

server.listen(PORT, () => {
  console.log(`In the beninging on port http://localhost:${PORT}`);
})