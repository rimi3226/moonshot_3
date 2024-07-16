const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('sensor_data', (data) => {
        console.log('Received sensor data:', data);
        io.emit('sensor_data', data); // Broadcast the data to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 8765;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
