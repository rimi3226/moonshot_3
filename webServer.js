const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Web server running on port ${PORT}`));

// Forward sensor data from sensor server to web clients
const sensorSocket = socketIo.connect('http://localhost:8765');

sensorSocket.on('sensor_data', (data) => {
    console.log('Forwarding sensor data:', data);
    io.emit('sensor_data', data);
});
