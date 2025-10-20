package org.france.chatroombridge.controllers;


import org.france.chatroombridge.entities.User;
import org.france.chatroombridge.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    UserController(UserService userService){
        this.userService = userService;
    }


    @PostMapping()
    public ResponseEntity<User> createUser(User user){
        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(201).body(savedUser);
    }
}
