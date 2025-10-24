package org.france.chatroombridge.controllers;


import org.france.chatroombridge.entities.User;
import org.france.chatroombridge.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    UserController(UserService userService){
        this.userService = userService;
    }


    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user){
        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(201).body(savedUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.findUser(id));
    }

    @GetMapping
    public ResponseEntity<User> getUserByName(@RequestParam String name) {
        Optional<User> user = userService.findByName(name);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
