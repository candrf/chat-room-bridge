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
            <div className={"flex min-h-screen justify-center bg-gray-200"}>
                <div className="w-full my-3 max-w-md rounded-4xl bg-white p-8 shadow-lg">
                    <h2 className={"text-4xl "}>Room List</h2>
                    <form onSubmit={handleSubmit} className={"mt-2"}>
                        <input
                            type={"text"}
                            placeholder={"Enter new room name"}
                            value={newRoom}
                            onChange={(e)=> setNewRoom(e.target.value)}
                            className={"mt-2 me-2 p-1 border border-gray-300 rounded-lg"}
                        />

                        <button type={"submit"}
                        className={"border border-gray-500 rounded-lg p-1"}>Add Room</button>
                    </form>
                    <ul>
                        {rooms.map((room) => (
                            <div key={room.id} >
                                <button onClick={()=> handleClick(room)}
                                        className={"w-fit mt-3 p-1 rounded-lg bg-black text-gray-200 font-semibold shadow-md"}>
                                    {room.name}</button>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Rooms;