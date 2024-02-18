import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
    host: 'redis-1b7c0c97-chat-app-67.a.aivencloud.com',
    port: 27789,
    username: 'default',
    password: 'AVNS_4oL9BQ25DK2AKA6nAzG'
});

const sub = new Redis({
    host: 'redis-1b7c0c97-chat-app-67.a.aivencloud.com',
    port: 27789,
    username: 'default',
    password: 'AVNS_4oL9BQ25DK2AKA6nAzG'
});

class SocketService {
    private _io: Server;

    constructor() {
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*"
            }
        });
        sub.subscribe("MESSAGES");
    }

    public initListeners() {
        console.log("Init Socket Listeners...");
        
        const io = this._io;
        io.on("connect", (socket) => {
            console.log("New socket connected", socket.id);
            socket.on("event:message", async({socketId, message}) => {
                // console.log("New Message Received:", [socketId, message]);
                // Publish this message to redis
                await pub.publish("MESSAGES", JSON.stringify({socketId, message}))
            });
        });
        
        sub.on('message', (channel, message) => {
            if(channel === "MESSAGES") {
                io.emit("message", message);
            }
        });
    }

    get io() {
        return this._io;
    }
}

export default SocketService;