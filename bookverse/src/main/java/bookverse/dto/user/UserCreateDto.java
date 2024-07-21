package bookverse.dto.user;

import jakarta.validation.constraints.NotBlank;

public class UserCreateDto {
    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    private String userRoleName; // reader by default

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getUserRoleName() {
        return userRoleName;
    }
}
