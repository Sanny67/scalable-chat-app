'use client'
import React, { useCallback, useContext, useEffect, useState } from "react"
import {Socket, io} from "socket.io-client";

/* User Creation */
interface Message {
    socketId: string;
    message: string;
}

interface Avatar {
    name: string;
    icon: string;
    color: string;
}

interface User {
    socketId: string;
    avatar: Avatar;
}

const generatedNames: Set<string> = new Set();

const icons: string[] = [
    "faFrog",
    "faDragon",
    "faOtter",
    "faFishFins",
    "faHippo",
    "faCat",
    "faDove",
    "faSpider",
    "faHorse",
    "faKiwiBird",
];

const animals: string[] = [
    "Frog",
    "Dragon",
    "Otter",
    "Fishy",
    "Hippo",
    "Cat",
    "Bird",
    "Spider",
    "Horse",
    "Kiwi",
];

const adjectives: string[] = [
    "Majestic",
    "Fierce",
    "Gentle",
    "Swift",
    "Graceful",
    "Radiant",
    "Spirited",
    "Elegant",
    "Vibrant",
    "Brilliant",
    "Dazzling",
    "Fearless",
    "Resilient",
    "Stunning",
    "Regal",
    "Enchanting",
    "Mysterious",
    "Serene",
    "Exquisite",
    "Whimsical",
];

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
};

function getRandomColor() {
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    
    // Construct the color string in hexadecimal format
    const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
    
    return color;
};

const generateAvatar = (): Avatar => {
    let uniqueName: string;
    let uniqueAvatar: Avatar;
    do {
        const randomAnimalKey = getRandomInt(0, animals.length);
        const randomAnimal = animals[randomAnimalKey];
        const randomIcon = icons[randomAnimalKey];
        const randomColor = getRandomColor();
        const randomAdjective = adjectives[getRandomInt(0, adjectives.length)];
        uniqueName = `${randomAdjective} ${randomAnimal}`;
        uniqueAvatar = {name: uniqueName, icon: randomIcon || "", color: randomColor};
    } while (generatedNames.has(uniqueName));
    generatedNames.add(uniqueName);
    return uniqueAvatar;
};

/* Socket code */
interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
    messages: Message[];
    user: User;
}

const initialMessages: Message[] = [];

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error("state is undefined");
    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {

    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [user, setUser] = useState<User>({socketId: "", avatar: generateAvatar()});

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
        if(socket) {
            socket.emit("event:message", {'socketId': socket.id, 'message': msg});
        }
    }, [socket]);

    const onMessageReceived = useCallback((data: string) => {
        console.log("From Server message received: ", data);
        setMessages((prev) => [...prev, JSON.parse(data)]);
    }, []);

    const createNewUser = (socket: Socket) => {
        if(socket.id) {
            setUser({...user, socketId: socket.id});
            console.log("user", user)
        }
    }

    useEffect(() => {
        const _socket = io('http://localhost:8000');
        _socket.on('connect', () => createNewUser(_socket));
        _socket.on('message', onMessageReceived);

        setSocket(_socket);

        return () => {
            _socket.disconnect();
            _socket.off('message', onMessageReceived);
            setSocket(undefined);
        };

    }, []);

    return (
        <SocketContext.Provider value={{sendMessage, messages, user}}>
            {children}
        </SocketContext.Provider>
    )
}