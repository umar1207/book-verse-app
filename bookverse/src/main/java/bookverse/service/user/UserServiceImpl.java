package bookverse.service.user;

import bookverse.dto.user.UserCreateDto;
import bookverse.dto.user.UserLoginDto;
import bookverse.dto.user.UserReadDto;
import bookverse.dto.user.UserUpdateDto;
import bookverse.entity.Role;
import bookverse.entity.User;
import bookverse.exception.general.EntityAlreadyExistsException;
import bookverse.exception.general.EntityNotFoundException;
import bookverse.exception.general.EntityReferencedException;
import bookverse.repository.RoleRepository;
import bookverse.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public void createUser(UserCreateDto userCreateDto) {
        Optional<User> checkUser = userRepository.findByEmail(userCreateDto.getEmail());
        if(checkUser.isPresent()){
            throw new EntityAlreadyExistsException("User Already exists with email: " + userCreateDto.getEmail());
        }
        Role role = (userCreateDto.getUserRoleName() != null) ? roleRepository.findByRoleName(userCreateDto.getUserRoleName())
                : roleRepository.findByRoleName("Reader");
        if(role == null) {
            throw new EntityNotFoundException("Role not exists: " + userCreateDto.getUserRoleName());
        }
        User user = new User(userCreateDto.getName(), userCreateDto.getEmail(), userCreateDto.getPassword(), role);
        userRepository.save(user);
    }

    @Override
    public List<UserReadDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserReadDto> allUsers = new ArrayList<>();
        for(User user: users){
            UserReadDto userReadDto = new UserReadDto(user.getUserId(), user.getName(), user.getEmail(), user.getRole().getRoleName(), user.getActive());
            allUsers.add(userReadDto);
        }
        return allUsers;
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("No user found with ID = " + userId));
        if(userRepository.numberOfIssues(userId) > 0) {
            throw new EntityReferencedException("User Cannot be deleted : Has issued a book");
        }
        user.setActive(Boolean.FALSE);
        userRepository.save(user);
    }

    @Override
    public void updateUser(Long userId, UserUpdateDto userUpdateDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User with does not exist with id = " + userId));

        String name = userUpdateDto.getName();
        String password = userUpdateDto.getPassword();
        String userRoleName = userUpdateDto.getUserRoleName();
        Boolean isActive = userUpdateDto.getActive();

        if(name != null){
            user.setName(name);
        }

        if(password != null){
            user.setPassword(password);
        }

        if(userRoleName != null){
            Role role = roleRepository.findByRoleName(userRoleName);
            if(role == null) throw new EntityNotFoundException("Role does not exist" + userRoleName);
            user.setRole(role);
        }

        if(isActive != null){
            if(isActive) user.setActive(Boolean.TRUE);
            else deleteUser(userId);
        }
        userRepository.save(user);
    }

    @Override
    public Map<String, Object> login(UserLoginDto userLoginDto, HttpSession session) {
        Optional<User> user = userRepository.findByEmail(userLoginDto.getEmail());
        if(user.isPresent() && user.get().getPassword().equals(userLoginDto.getPassword())){
            session.setAttribute("userId", user.get().getUserId());
            session.setAttribute("userRoleName", user.get().getRole().getRoleName());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("userId", user.get().getUserId());
            response.put("userRoleName", user.get().getRole().getRoleName());

            return response;
        }
        return Map.of("message", "Invalid Credentials");
    }
    @Override
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
