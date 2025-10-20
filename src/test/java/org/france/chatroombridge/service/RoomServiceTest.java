package org.france.chatroombridge.service;

import org.france.chatroombridge.entities.Room;
import org.france.chatroombridge.repository.RoomRepository;
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
public class RoomServiceTest {

    @Mock
    RoomRepository roomRepository;

    @InjectMocks
    RoomService roomService;

    Room testRoom = Room.builder()
            .id(1L)
            .name("Default")
            .build();

    Room testRoom2 = Room.builder()
            .id(2L)
            .name("Room2")
            .build();

    List<Room> testRoomList = new ArrayList<>();

    @Test
    void shouldCreateRoom(){
        when(roomRepository.save(testRoom)).thenReturn(testRoom);

        Room actual = roomService.saveRoom(testRoom);

        verify(roomRepository, times(1)).save(testRoom);

        assertThat(actual).isEqualTo(testRoom);
    }

    @Test
    void shouldFindRoomById(){
        when(roomRepository.findById(1L)).thenReturn(Optional.of(testRoom));

        Room actual = roomService.findRoom(1L);

        verify(roomRepository, times(1)).findById(1L);

        assertThat(actual).isEqualTo(testRoom);
    }

    @Test
    void shouldFindAllRooms(){
        testRoomList.add(testRoom);
        testRoomList.add(testRoom2);

        when(roomRepository.findAll()).thenReturn(testRoomList);

        List<Room> actual = roomService.findAllRooms();

        verify(roomRepository, times(1)).findAll();

        assertThat(actual).isEqualTo(testRoomList);
    }
}
