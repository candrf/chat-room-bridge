package org.france.chatroombridge.service;

import org.france.chatroombridge.entities.User;
import org.france.chatroombridge.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public User findUser(Long id){
        return userRepository.findById(id).orElseThrow();
    }

    public Optional<User> findByName(String name) {
        return userRepository.findByNameIgnoreCase(name);
    }
}
