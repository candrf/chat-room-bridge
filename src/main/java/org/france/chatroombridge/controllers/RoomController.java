package org.france.chatroombridge.controllers;

import org.france.chatroombridge.entities.Room;
import org.france.chatroombridge.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    RoomController(RoomService roomService){
        this.roomService = roomService;
    }

    @PostMapping()
    public ResponseEntity<Room> createRoom(Room room){
        Room savedRoom = roomService.saveRoom(room);
        return ResponseEntity.status(201).body(savedRoom);
    }


    @GetMapping()
    public ResponseEntity<List<Room>> findAllRooms(){
        return ResponseEntity.ok(roomService.findAllRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> findRoomById(@PathVariable Long id){
        return ResponseEntity.ok(roomService.findRoom(id));
    }
}
