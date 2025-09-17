package com.example.backend.controller;
import com.example.backend.dto.UserDto;
import com.example.backend.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public UserDto login(@RequestBody UserDto userDto) {
        return userService.loginByEin(userDto.getAuthorizedEin());
    }
}
