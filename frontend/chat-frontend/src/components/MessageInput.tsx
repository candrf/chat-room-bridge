import type {User} from "../types/User.ts";
import type {Room} from "../types/Room.ts";
import {useState} from "react";
import { Client } from "@stomp/stompjs";

interface MessageInputProps{
    user: User;
    room: Room;
    client: Client;
}

function MessageInput({user, room, client}:MessageInputProps){
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (!message.trim()) return;

        if (!client.connected) {
            console.warn("WebSocket not connected, message not sent");
            return;
        }

        client.publish({
            destination: `/app/chat.sendMessage/${room.id}`,
            body: JSON.stringify({ message, user: { id: user.id } }),
        });

        setMessage("");
    };

    const handleKeyDown = (key: string) =>{
        if(key === "Enter"){
            sendMessage();
        }
    }
    return(
        <div className={"mt-2"}>
            <input
                type={"text"}
                placeholder={"Enter a message"}
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e.key)}
                className={"mt-2 me-2 p-1  w-full max-w-md border border-gray-300 rounded-lg shadow-md"}
            />
            <button onClick={sendMessage}
                    className={"bg-black text-gray-200 shadow-md rounded-lg p-1 w-13"}
            >Send</button>
        </div>
    )
}

export default MessageInput;