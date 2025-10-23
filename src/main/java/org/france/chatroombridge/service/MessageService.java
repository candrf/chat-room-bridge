package org.france.chatroombridge.service;

import org.france.chatroombridge.entities.Message;
import org.france.chatroombridge.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    MessageService(MessageRepository messageRepository){
        this.messageRepository = messageRepository;
    }

    public Message saveMessage(Message message){
        return messageRepository.save(message);
    }

    public List<Message> findAllMessages(){
        return messageRepository.findAll();
    }

    public List<Message> findMessagesByRoom(Long id){
        return messageRepository.findByRoomId(id);
    }

    public void deleteMessage(Long id){
        messageRepository.deleteById(id);
    }

    public Message updateMessageText(Long messageId, String newText) {
        Message msg = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        msg.setMessage(newText);
        return messageRepository.save(msg);
    }

}
