import type {Message} from "../types/Message.ts";
import {useEffect, useState} from "react";
import axios from "axios";

interface MessageListProps {
    roomId: number;
}

function MessageList({roomId}: MessageListProps){
    const [messages, setMessages] = useState<Message[]>([])

    const fetchMessages = async () => {
        try {
            const response = await axios.get<Message[]>(`http://localhost:8080/api/messages/${roomId}`)
            setMessages(response.data);
        }catch (error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchMessages()
        const interval = setInterval(fetchMessages, 5000); // time for refresh
        return () => clearInterval(interval);
    },[])

    return(
        <>
            <div id={"textBox"}>
                {messages.map((message) => (
                    <div key={message.id}>
                        {message.user.name}: {message.message}
                    </div>
                ))}
            </div>
        </>
    )
}

export default MessageList;