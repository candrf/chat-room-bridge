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
        const interval = setInterval(fetchMessages, 2000); // time for refresh
        return () => clearInterval(interval);
    },[])

    return(
        <>
            <div className="flex flex-col h-[70vh] max-h-[80vh] border-2 border-gray-300 rounded-2xl overflow-hidden shadow-md bg-gray-50">
                <div id={"textBox"} className={"flex-1 overflow-y-auto p-4 space-y-3 "}>
                    {messages.map((message) => (
                        <div key={message.id} className={"border border-gray-300  bg-white rounded-lg p-2"}>
                            <p>
                                {message.user.name}:
                            </p>
                            <p>
                                {message.message}
                            </p>


                            {message.user.id === userId && (
                                <div className={"flex justify-end space-x-2 mt-1 text-xs"}>
                                    <button onClick={()=>{handleEdit(message)}}
                                    className={"border w-10 border-gray-500 rounded-lg p-0.5"}>Edit</button>

                                    <button onClick={()=>{handleDelete(message.id)}}
                                    className={"border border-gray-500 rounded-lg p-0.5 "}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MessageList;