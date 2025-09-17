const app = require("./app");
const http = require("http");

const port = 5000;
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, async () => {
    console.log("hi2")
    console.log(`Server is running on port ${port}`);
});


module.exports = server;