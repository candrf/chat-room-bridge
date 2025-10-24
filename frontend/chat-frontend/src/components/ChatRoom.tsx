import type {User} from "../types/User.ts";
import type {Room} from "../types/Room.ts";
import MessageInput from "./MessageInput.tsx";
import MessageList from "./MessageList.tsx";
import {useNavigate} from "react-router-dom";
import { Client } from "@stomp/stompjs";
import {useEffect, useState} from "react";

interface ChatRoomProps {
    user: User;
    room: Room;
}

function ChatRoom({user, room}:ChatRoomProps){
    const navigate = useNavigate();
    const [client, setClient] = useState<Client | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const stompClient = new Client({
            webSocketFactory: () => new WebSocket("ws://localhost:8080/ws"),
            reconnectDelay: 5000,
            debug: (msg) => console.log("[STOMP]", msg),
        });

        stompClient.onConnect = () => {
            console.log("✅ Connected to WebSocket");
            setConnected(true);
        };

        stompClient.onStompError = (frame) => {
            console.error("❌ STOMP error:", frame.body);
        };

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, []);

    const handleClick = () =>{
        navigate(`/`)
    }

    if (!client) return <div>Connecting to chat...</div>;

    return (
        <>
            <div className={"flex min-h-screen items-center justify-center bg-gray-200"}>
                <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
                    <h2 className={"text-3xl"}>Room: {room.name}</h2>
                    <p className={"mt-2"}>Welcome {user.name}!</p>
                    <button onClick={()=>{handleClick()}}
                    className={"mt-2 mb-2 bg-black text-gray-200 shadow-md rounded-lg p-1"}>Back To Rooms</button>
                    <MessageList roomId={room.id} userId={user.id} client={client}/>
                    <MessageInput user={user} room={room} client={client}/>
                </div>
            </div>
        </>
    )
}
export default ChatRoom;