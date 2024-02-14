// const express = require("express")
// const http = require("http")
// const app = express()
// const server = http.createServer(app)
// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: [ "GET", "POST" ]
// 	}
// })

// io.on("connection", (socket) => {
// 	socket.emit("me", socket.id)

// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	})

// 	socket.on("callUser", (data) => {
// 		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
// 	})

// 	socket.on("answerCall", (data) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	})
// })

// server.listen(5000, () => console.log("server is running on port 5000"))
// const express = require('express');
// const path = require('path');

// const app = express();

// // Define the directory where your React app's build files reside
// const reactAppDirectory = path.join(__dirname, '/frontend/build');

// // Serve static files from the specified directory
// app.use(express.static(reactAppDirectory));

// // Serve the index.html file for any other requests
// app.get('*', (req, res) => {
//   res.sendFile(path.join(reactAppDirectory, 'index.html'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Define the directory where your React app's build files reside
const reactAppDirectory = path.join(__dirname, '/frontend/build');

// Serve static files from the specified directory
app.use(express.static(reactAppDirectory));

// Serve the index.html file for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(reactAppDirectory, 'index.html'));
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('callUser', {
      signal: data.signalData,
      from: data.from,
      name: data.name
    });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


