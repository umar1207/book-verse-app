package bookverse.dto.user;

public class UserReadDto {
    private Long userId;
    private String name;
    private String email;
    private String userRoleName;
    private Boolean isActive;

    public UserReadDto(Long userId, String name, String email, String userRoleName, Boolean isActive) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.userRoleName = userRoleName;
        this.isActive = isActive;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserRoleName() {
        return userRoleName;
    }

    public void setUserRoleName(String userRoleName) {
        this.userRoleName = userRoleName;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
