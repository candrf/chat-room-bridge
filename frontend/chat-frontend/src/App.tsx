import Login from "./components/Login.tsx";
import {useState} from "react";
import type {User} from "./types/User.ts";
import type {Room} from "./types/Room.ts";
import Rooms from "./components/Rooms.tsx";
import ChatRoom from "./components/ChatRoom.tsx";

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [room, setRoom] = useState<Room | null>(null);

    if(!user) return <Login onLogin={setUser}/>

    if(!room) return <Rooms onRoomSelect={setRoom}/>

    return (
        <>
            <ChatRoom user={user} room={room}/>
        </>
    )
}

export default App
