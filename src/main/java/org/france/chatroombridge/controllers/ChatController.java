package org.france.chatroombridge.controllers;

import org.france.chatroombridge.entities.Message;
import org.france.chatroombridge.entities.Room;
import org.france.chatroombridge.entities.User;
import org.france.chatroombridge.service.MessageService;
import org.france.chatroombridge.service.RoomService;
import org.france.chatroombridge.service.UserService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    private final MessageService messageService;
    private final UserService userService;
    private final RoomService roomService;

    public ChatController(MessageService messageService, UserService userService, RoomService roomService) {
        this.messageService = messageService;
        this.userService = userService;
        this.roomService = roomService;
    }

    // The client sends to /app/chat.sendMessage/{roomId}
    @MessageMapping("/chat.sendMessage/{roomId}")
    @SendTo("/topic/room.{roomId}")
    public Message handleSendMessage(
            @DestinationVariable Long roomId,
            @Payload Message incoming
    ) {
        // Get the user and room from DB
        User sender = userService.findUser(incoming.getUser().getId());
        Room room = roomService.findRoom(roomId);

        // Build and save message
        Message saved = Message.builder()
                .message(incoming.getMessage())
                .timestamp(LocalDateTime.now())
                .user(sender)
                .room(room)
                .build();

        return messageService.saveMessage(saved);
    }
}
