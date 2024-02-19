'use client'
import React, { useCallback, useContext, useEffect, useState } from "react"
import {Socket, io} from "socket.io-client";


interface Message {
    socketId: string;
    message: string;
}
interface Avatar {
    name: string;
    icon: string;
    color: string;
}
export interface User {
    socketId: string;
    avatar: Avatar;
}

/* Socket code */
interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
    messages: Message[];
    socket: Socket | undefined;
    users: User[];
}

const initialMessages: Message[] = [];
const initialUsers: User[] = [];

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error("state is undefined");
    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {

    const [socket, setSocket] = useState<Socket>();
    // const [user, setUser] = useState<User>({socketId: "", avatar: { name: "", icon: "", color: "" }});
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [users, setUsers] = useState<User[]>(initialUsers);

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
        if(socket) {
            socket.emit("event:message", {'socketId': socket.id, 'message': msg});
        }
    }, [socket]);

    const onMessageReceived = useCallback((data: string) => {
        // console.log("From Server message received: ", data);
        setMessages((prev) => [...prev, JSON.parse(data)]);
    }, []);

    const onUserListChange = useCallback((data: string) => {
        // console.log("From Server user list changed: ", data);
        setUsers(JSON.parse(data));
    }, []);

    // const createNewUser = (socket: Socket) => {
    //     if(socket.id) {
    //         setUser({...user, socketId: socket.id});
    //         console.log("user", user)
    //     }
    // }

    useEffect(() => {
        const _socket = io('http://localhost:8000');
        
        // _socket.on('connect', () => createNewUser(_socket));
        _socket.on('message', onMessageReceived);
        _socket.on("userListchange", onUserListChange);


        setSocket(_socket);

        return () => {
            _socket.disconnect();
            _socket.off('message', onMessageReceived);
            setSocket(undefined);
        };

    }, []);

    return (
        <SocketContext.Provider value={{sendMessage, messages, socket, users}}>
            {children}
        </SocketContext.Provider>
    )
}