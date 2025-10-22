import type {Room} from "../types/Room.ts";
import {useEffect, useState} from "react";
import axios from "axios";

function Rooms({onRoomSelect}:{onRoomSelect:(room: Room) => void}){
    const [rooms, setRooms] = useState<Room[]>([]); // state for all rooms

    // get all rooms from backend
    const getRooms = async () => {
        try {
            const response = await axios.get<Room[]>('http://localhost:8080/api/rooms')
            console.log(response.data);
            setRooms(response.data);
        }catch (error){
            console.log(error);
        }
    }

    // fetch rooms when mounted
    useEffect(()=>{
        getRooms();
    }, [])
    // list all available rooms,
    return(
        <>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id} onClick={()=> onRoomSelect(room)}>
                        {room.name}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default Rooms;