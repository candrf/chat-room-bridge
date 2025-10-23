import type {User} from "../types/User.ts";
import type {Room} from "../types/Room.ts";
import {useState} from "react";
import axios from "axios";
import type {Message} from "../types/Message.ts";

interface MessageInputProps{
    user: User;
    room: Room;
}

function MessageInput({user, room}:MessageInputProps){
    const [message, setMessage] = useState("");

    const sendMessage = async () => {
        if (!message.trim()) return;

        const timestamp = new Date().toISOString();

        try {
            const response = await axios.post<Message>(
                'http://localhost:8080/api/messages', {
                    message: message,
                    timestamp: timestamp,
                    user: user,
                    room: room
                })
            console.log(response.data);
        } catch (error){
            console.error(error);
        } finally {
            setMessage("");
        }
    }

    const handleKeyDown = (key: string) =>{
        if(key === "Enter"){
            sendMessage();
        }
    }
    return(
        <>
            <input
                type={"text"}
                placeholder={"Enter a message"}
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e.key)}
            />
            <button onClick={sendMessage}>Send</button>
        </>
    )
}

export default MessageInput;