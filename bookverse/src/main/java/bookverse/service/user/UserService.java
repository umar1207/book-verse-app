package bookverse.service.user;

import bookverse.dto.user.UserCreateDto;
import bookverse.dto.user.UserLoginDto;
import bookverse.dto.user.UserReadDto;
import bookverse.dto.user.UserUpdateDto;
import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Map;

public interface UserService {
    public void createUser(UserCreateDto userCreateDto);
    public List<UserReadDto> getAllUsers();
    public void updateUser(Long userId, UserUpdateDto userUpdateDto);
    public void deleteUser(Long userId);
    public Map<String,Object> login(UserLoginDto userLoginDto, HttpSession session);
    public void logout(HttpSession session);
}
