import type {User} from "../types/User.ts";
import type {Room} from "../types/Room.ts";
import MessageInput from "./MessageInput.tsx";
import MessageList from "./MessageList.tsx";
import {useNavigate} from "react-router-dom";

interface ChatRoomProps {
    user: User;
    room: Room;
}

function ChatRoom({user, room}:ChatRoomProps){
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate(`/`)
    }
    return (
        <>
            <div className={"flex min-h-screen items-center justify-center bg-gray-200"}>
                <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
                    <h2 className={"text-3xl"}>Room: {room.name}</h2>
                    <p className={"mt-2"}>Welcome {user.name}!</p>
                    <button onClick={()=>{handleClick()}}
                    className={"mt-2 mb-2 bg-black text-gray-200 shadow-md rounded-lg p-1"}>Back To Rooms</button>
                    <MessageList roomId={room.id} userId={user.id}/>
                    <MessageInput user={user} room={room}/>
                </div>
            </div>
        </>
    )
}
export default ChatRoom;