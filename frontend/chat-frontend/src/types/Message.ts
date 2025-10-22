import type {User} from "./User.ts";
import type {Room} from "./Room.ts";

export interface Message{
    id: number,
    message: string,
    timestamp: Date,
    user: User,
    room: Room
}