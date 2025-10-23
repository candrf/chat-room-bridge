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
            <div>
                <h2>Room: {room.name}</h2>
                <p>Welcome {user.name}!</p>
                <button onClick={()=>{handleClick()}}>Back To Rooms</button>
                <MessageList roomId={room.id} userId={user.id}/>
                <MessageInput user={user} room={room}/>
            </div>
        </>
    )
}
export default ChatRoom;