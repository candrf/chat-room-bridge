import type {Room} from "../types/Room.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Rooms({onRoomSelect}:{onRoomSelect:(room: Room) => void}){
    const [rooms, setRooms] = useState<Room[]>([]);
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

    return(
        <>
            <h2>Room List</h2>
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