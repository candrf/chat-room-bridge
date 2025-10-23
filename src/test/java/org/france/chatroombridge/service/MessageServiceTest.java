package org.france.chatroombridge.service;

import org.france.chatroombridge.entities.Message;
import org.france.chatroombridge.entities.Room;
import org.france.chatroombridge.entities.User;
import org.france.chatroombridge.repository.MessageRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MessageServiceTest {

    @Mock
    MessageRepository messageRepository;

    @InjectMocks
    MessageService messageService;

    Room testRoom = Room.builder()
            .id(1L)
            .name("Default")
            .build();

    User testUser = User.builder()
            .id(1L)
            .name("Andrew")
            .build();


    Message testMessage = Message.builder()
            .id(1L)
            .message("My First Message")
            .timestamp(null)
            .room(testRoom)
            .user(testUser)
            .build();

    List<Message> messages = new ArrayList<>();

    @Test
    void shouldSaveMessage(){
        when(messageRepository.save(testMessage)).thenReturn(testMessage);

        Message actual = messageService.saveMessage(testMessage);

        verify(messageRepository, times(1)).save(testMessage);

        assertThat(actual).isEqualTo(testMessage);
    }

    @Test
    void shouldFindAllMessages(){
        messages.add(testMessage);

        when(messageRepository.findAll()).thenReturn(messages);

        List<Message> actual = messageService.findAllMessages();

        verify(messageRepository, times(1)).findAll();

        assertThat(actual).isEqualTo(messages);
    }

    @Test
    void shouldFindMessagesByRoomId(){
        messages.add(testMessage);

        when(messageRepository.findByRoomId(1L)).thenReturn(messages);

        List<Message> actual = messageService.findMessagesByRoom(1L);

        verify(messageRepository, times(1)).findByRoomId(1L);

        assertThat(actual).isEqualTo(messages);
    }

    @Test
    void shouldDeleteMessage() {
        Long messageId = 1L;

        // No need to mock anything for void deleteById, just verify
        doNothing().when(messageRepository).deleteById(messageId);

        messageService.deleteMessage(messageId);

        verify(messageRepository, times(1)).deleteById(messageId);
    }

    @Test
    void shouldUpdateMessage(){
        // save original message
        when(messageRepository.save(testMessage)).thenReturn(testMessage);
        messageService.saveMessage(testMessage);

        Long messageId = 1L;
        String newMessage = "new message";

        //find old message and save updated message
        when(messageRepository.findById(messageId)).thenReturn(Optional.ofNullable(testMessage));

        Message updatedMessage = messageService.updateMessageText(1L, newMessage);

        verify(messageRepository, times(1)).findById(testMessage.getId());
        verify(messageRepository, times(2)).save(testMessage);

        assertThat(updatedMessage.getMessage()).isEqualTo(newMessage);
    }

}