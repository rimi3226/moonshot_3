import asyncio
import serial
import socketio

# Serial configuration
ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)

# Socket.IO server
sio = socketio.AsyncServer(async_mode='asgi')
app = socketio.ASGIApp(sio)

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

async def read_serial():
    while True:
        if ser.in_waiting > 0:
            data = ser.readline().decode('utf-8').strip()
            print("Received:", data)
            await sio.emit('sensor_data', data)
        await asyncio.sleep(0.1)

async def main():
    await asyncio.gather(
        sio.start_background_task(read_serial),
        asyncio.create_task(sio.serve(app, host='0.0.0.0', port=8765))
    )

if __name__ == "__main__":
    asyncio.run(main())
