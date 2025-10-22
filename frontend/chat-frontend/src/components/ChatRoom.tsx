import type {User} from "../types/User.ts";
import type {Room} from "../types/Room.ts";
import MessageInput from "./MessageInput.tsx";
import MessageList from "./MessageList.tsx";

interface ChatRoomProps {
    user: User;
    room: Room;
}

function ChatRoom({user, room}:ChatRoomProps){

    return (
        <>
            <div>
                <h2>Room: {room.name}</h2>
                <p>Welcome {user.name}!</p>
                <MessageList roomId={room.id}/>
                <MessageInput user={user} room={room}/>
            </div>
        </>
    )
}
export default ChatRoom;