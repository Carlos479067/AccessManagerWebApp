package com.example.backend.service;
import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto loginByEin(String authorizedEin) {

        User user = userRepository.findByAuthorizedEin(authorizedEin);
        System.out.println(userRepository.findByAuthorizedEin(authorizedEin));
        if(user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "EIN not found");
        }

        UserDto dto = mapToUserDto(user);

        return dto;
    }

    private UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setAuthorizedEin(user.getAuthorizedEin());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        return userDto;
    }
}
