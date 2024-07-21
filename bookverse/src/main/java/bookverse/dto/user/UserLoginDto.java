package bookverse.dto.user;

import jakarta.validation.constraints.NotBlank;

public class UserLoginDto {
    @NotBlank(message = "Email Id not provided")
    private String email;
    @NotBlank(message = "Password not provided")
    private String password;

    public UserLoginDto() {
    }

    public UserLoginDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
