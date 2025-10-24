import type {Message} from "../types/Message.ts";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";

interface MessageListProps {
    roomId: number;
    userId: number;
    client: Client;
}

function MessageList({roomId, userId, client}: MessageListProps){
    const [messages, setMessages] = useState<Message[]>([])
    const [connected, setConnected] = useState(false);

    // Create a ref for the scroll container
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Wait for client to connect
        const checkConnection = () => {
            if (client.connected) {
                setConnected(true);
            } else {
                const timer = setTimeout(checkConnection, 100); // retry until connected
                return () => clearTimeout(timer);
            }
        };
        checkConnection();
    }, [client]);

    useEffect(() => {
        if (!connected) return; // do nothing until client is connected

        // Load message history
        const loadHistory = async () => {
            try {
                const res = await axios.get<Message[]>(
                    `http://localhost:8080/api/messages/${roomId}`
                );
                setMessages(res.data);
            } catch (err) {
                console.error("Failed to fetch messages", err);
            }
        };
        loadHistory();

        // Subscribe to live messages
        const subscription = client.subscribe(`/topic/room.${roomId}`, (frame) => {
            const newMsg: Message = JSON.parse(frame.body);
            setMessages((prev) => [...prev, newMsg]);
        });

        return () => subscription.unsubscribe();
    }, [connected, client, roomId]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
                    {/* This empty div is used to scroll to */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </>
    )
}

export default MessageList;