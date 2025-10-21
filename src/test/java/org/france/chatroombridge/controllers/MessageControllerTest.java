package org.france.chatroombridge.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.france.chatroombridge.entities.Message;
import org.france.chatroombridge.entities.Room;
import org.france.chatroombridge.entities.User;
import org.france.chatroombridge.service.MessageService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MessageController.class)
@AutoConfigureMockMvc
public class MessageControllerTest {
    @Autowired
    MockMvc mvc;

    @MockitoBean
    MessageService messageService;

    @Autowired
    ObjectMapper objectMapper;

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
            .message("Test Message")
            .timestamp(null)
            .user(testUser)
            .room(testRoom)
            .build();

    @Test
    void shouldCreateMessage() throws Exception {
        Mockito.when(messageService.saveMessage(testMessage)).thenReturn(testMessage);

        mvc.perform(post("/api/messages"))
                .andExpect(status().is2xxSuccessful());

        System.out.println(objectMapper.writeValueAsString(testMessage));

    }

    @Test
    void shouldFindMessagesByRoom() throws Exception {
        List<Message> messageList = new ArrayList<>();
        messageList.add(testMessage);

        Mockito.when(messageService.findMessagesByRoom(1L)).thenReturn(messageList);

        mvc.perform(get("/api/messages/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}
