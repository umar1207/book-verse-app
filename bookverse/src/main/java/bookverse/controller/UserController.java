package bookverse.controller;

import bookverse.dto.user.UserCreateDto;
import bookverse.dto.user.UserLoginDto;
import bookverse.dto.user.UserReadDto;
import bookverse.dto.user.UserUpdateDto;
import bookverse.service.user.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public ResponseEntity<?> getAllUsers(){
        List<UserReadDto> allUsers = userService.getAllUsers();
        return ResponseEntity.ok(allUsers);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody UserUpdateDto userUpdateDto){
        userService.updateUser(userId, userUpdateDto);
        return ResponseEntity.ok("User updated successfully");
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted");
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserCreateDto userCreateDto){
        userService.createUser(userCreateDto);
        return ResponseEntity.ok("User created successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDto userLoginDto, HttpSession session){
        Map<String,Object> response = userService.login(userLoginDto, session);
        if (response.get("message").equals("Login successful")) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        userService.logout(session);
        return ResponseEntity.ok("Logout Successful");
    }
}
