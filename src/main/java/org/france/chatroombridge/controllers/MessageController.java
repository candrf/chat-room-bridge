package org.france.chatroombridge.controllers;

import org.france.chatroombridge.DTOs.MessageUpdateDTO;
import org.france.chatroombridge.entities.Message;
import org.france.chatroombridge.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    MessageController(MessageService messageService){
        this.messageService = messageService;
    }

    @PostMapping()
    public ResponseEntity<Message> createMessage(@RequestBody Message message){
        Message savedMessage = messageService.saveMessage(message);
        return ResponseEntity.status(201).body(savedMessage);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<List<Message>> findMessageByRoom(@PathVariable Long roomId){
        return ResponseEntity.ok(messageService.findMessagesByRoom(roomId));
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long messageId){

        messageService.deleteMessage(messageId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{messageId}")
    public ResponseEntity<Message> updateMessage(@PathVariable Long messageId, @RequestBody MessageUpdateDTO messageUpdateDTO){
        String message = messageUpdateDTO.getMessage();
        Message updated = messageService.updateMessageText(messageId, message);
        return ResponseEntity.ok(updated);

    }
}
