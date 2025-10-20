package org.france.chatroombridge.service;

import org.france.chatroombridge.entities.Room;
import org.france.chatroombridge.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    RoomService(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    public Room saveRoom(Room room){
        return roomRepository.save(room);
    }

    public Room findRoom(Long id){
        return roomRepository.findById(id).orElseThrow();
    }

    public List<Room> findAllRooms(){
        return roomRepository.findAll();
    }
}
