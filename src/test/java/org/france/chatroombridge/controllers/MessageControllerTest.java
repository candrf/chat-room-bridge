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
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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

    @Test
    void shouldDeleteMessageById() throws Exception {

        mvc.perform(delete("/api/messages/1"))
                .andExpect(status().isNoContent());

    }

    @Test
    void shouldUpdateMessage() throws Exception {

        String testJson = objectMapper.writeValueAsString(testMessage);

        mvc.perform(patch("/api/messages/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testJson))
                .andExpect(status().isOk());
    }
}
