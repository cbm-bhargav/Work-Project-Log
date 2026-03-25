import express from "express"
import { createServer } from "node:http"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { Server } from "socket.io"

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
});
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(join(__dirname, "public")))

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "public", "index.html"))
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('message', {
      text: msg,
      sender: socket.id
    });
  });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})