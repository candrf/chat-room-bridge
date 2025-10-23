import type {Message} from "../types/Message.ts";
import {useEffect, useState} from "react";
import axios from "axios";

interface MessageListProps {
    roomId: number;
    userId: number;
}

function MessageList({roomId, userId}: MessageListProps){
    const [messages, setMessages] = useState<Message[]>([])

    const fetchMessages = async () => {
        try {
            const response = await axios.get<Message[]>(`http://localhost:8080/api/messages/${roomId}`)
            setMessages(response.data);
        }catch (error){
            console.error(error);
        }
    }

    const handleDelete = async (messageId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/messages/${messageId}`);
            setMessages(messages.filter(msg => msg.id !== messageId));
        } catch (error) {
            console.error("Failed to delete message", error);
        }
    };

    const handleEdit = async (message: Message) => {
        const newText = prompt("Edit your message", message.message);
        if (!newText || newText.trim() === message.message) return;

        try {
            const response = await axios.patch<Message>(
                `http://localhost:8080/api/messages/${message.id}`,
                { message: newText }
            );
            setMessages(messages.map(msg => msg.id === message.id ? response.data : msg));
        } catch (error) {
            console.error("Failed to edit message", error);
        }
    };


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

                        {message.user.id === userId && (
                            <>
                                <button onClick={()=>{handleEdit(message)}}>Edit</button>
                                <button onClick={()=>{handleDelete(message.id)}}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default MessageList;