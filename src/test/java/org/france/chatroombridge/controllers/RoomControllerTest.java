package org.france.chatroombridge.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.france.chatroombridge.entities.Room;
import org.france.chatroombridge.service.RoomService;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RoomController.class)
@AutoConfigureMockMvc
public class RoomControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    RoomService roomService;

    Room testRoom = Room.builder()
            .id(1L)
            .name("Default")
            .build();

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldCreateRoom() throws Exception{
        Mockito.when(roomService.saveRoom(testRoom))
                .thenReturn(testRoom);


        String room = objectMapper.writeValueAsString(testRoom);

        mvc.perform(post("/api/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(room))
                .andExpect(status().is2xxSuccessful());

    }

    @Test
    void shouldFindAllRooms() throws Exception{
        List<Room> roomList = new ArrayList<>();
        roomList.add(testRoom);

        Mockito.when(roomService.findAllRooms()).thenReturn(roomList);

        mvc.perform(get("/api/rooms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());

    }

    @Test
    void shouldFindRoomById() throws Exception{
        Mockito.when(roomService.findRoom(1L)).thenReturn(testRoom);

        String roomJson = objectMapper.writeValueAsString(testRoom);

        mvc.perform(get("/api/rooms/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(roomJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Default"));

    }

}
