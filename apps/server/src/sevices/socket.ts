import { Server, Socket } from "socket.io";
import { Redis } from "ioredis";
import { User, createUser } from "./user";

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
    private _socketCount: number = 0;
    private _allUsers: User[] = [];

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
        io.on("connect", (socket: Socket) => {
            this._socketCount++; // Increment the socket count when a new socket connects
            console.log("New socket connected", socket.id);

            // Generate a new user and store it
            const newUser = createUser(socket.id);
            this._allUsers.push(newUser);

            io.emit("userListchange", JSON.stringify(this._allUsers));

            socket.on("disconnect", () => {
                // DONT KILL THE USER WHEN SOCKET DISCONNECTED 
                // KILL HIM WHEN ALL SOCKETS ARE CLOSED
                this._socketCount--; // Decrement the socket count when a socket disconnects
                console.log("Socket disconnected", socket.id);

                if(this._socketCount === 0){
                    this._allUsers = [];
                    io.emit("userListchange", JSON.stringify(this._allUsers));
                }

                // Remove the user from the array on disconnect
                this._allUsers = this._allUsers.map(user => {
                    if (user.socketId === socket.id) {
                        return {
                            ...user,
                            active: false
                        };
                    } else return user;
                });
                io.emit("userListchange", JSON.stringify(this._allUsers));
            });

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

    get socketCount() {
        return this._socketCount;
    }

    get allUsers() {
        return this._allUsers;
    }
}

export default SocketService;
