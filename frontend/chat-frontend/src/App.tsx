import Login from "./components/Login.tsx";
import {useState} from "react";
import type {User} from "./types/User.ts";
import type {Room} from "./types/Room.ts";
import Rooms from "./components/Rooms.tsx";
import ChatRoom from "./components/ChatRoom.tsx";
import {Route, Routes} from "react-router-dom";

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [room, setRoom] = useState<Room | null>(null);

    if(!user) return <Login onLogin={setUser}/>

    return (
        <>
            <Routes>
                <Route path="/" element={<Rooms onRoomSelect={setRoom}/>} />
                <Route path="/rooms/:id" element={room ? <ChatRoom user={user} room={room}/> : <p>Error</p>} />
            </Routes>
        </>
    )
}

export default App
