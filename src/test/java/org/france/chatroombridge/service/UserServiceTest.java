package org.france.chatroombridge.service;

import org.france.chatroombridge.entities.User;
import org.france.chatroombridge.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    // mock the repository
    @Mock
    UserRepository userRepository;

    // inject service to mock
    @InjectMocks
    UserService userService;

    User testUser = User.builder()
            .id(1L)
            .name("Andrew")
            .build();


    @Test
    void shouldCreateUser(){
        when(userRepository.save(testUser)).thenReturn(testUser);

        User actual = userService.saveUser(testUser);

        verify(userRepository, times(1)).save(testUser);

        assertThat(actual).isEqualTo(testUser);

    }

    @Test
    void shouldFindUserById(){
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        User actual = userService.findUser(1L);

        verify(userRepository, times(1)).findById(1L);

        assertThat(actual).isEqualTo(testUser);
    }



}
