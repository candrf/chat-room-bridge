import type {Room} from "../types/Room.ts";
import {type FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Rooms({onRoomSelect}:{onRoomSelect:(room: Room) => void}){
    const [rooms, setRooms] = useState<Room[]>([]);
    const [newRoom, setNewRoom] = useState("");
    const navigate = useNavigate();

    const getRooms = async () => {
        try {
            const response = await axios.get<Room[]>('http://localhost:8080/api/rooms')
            console.log(response.data);
            setRooms(response.data);
        }catch (error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getRooms();
    }, [])

    const handleClick = (room: Room) => {
        onRoomSelect(room);
        navigate(`/rooms/${room.id}`)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!newRoom.trim()) return; // prevent empty names
        try {
            const response = await axios.post<Room>("http://localhost:8080/api/rooms", {
                name: newRoom,
            });
            // Add the newly created room to the state
            setRooms((prevRooms) => [...prevRooms, response.data]);
            setNewRoom(""); // clear input
        } catch (error) {
            console.error("Error creating room:", error);
        }
    };

    return(
        <>
            <h2>Room List</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type={"text"}
                    placeholder={"Enter new room name"}
                    value={newRoom}
                    onChange={(e)=> setNewRoom(e.target.value)}
                />

                <button type={"submit"}>Add Room</button>
            </form>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id} onClick={()=> handleClick(room)}>
                        {room.name}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default Rooms;