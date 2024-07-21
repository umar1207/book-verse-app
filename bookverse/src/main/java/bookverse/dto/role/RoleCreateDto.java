package bookverse.dto.role;

import jakarta.validation.constraints.NotBlank;

public class RoleCreateDto {
    @NotBlank(message = "Role not entered")
    private String roleName;

    public String getRoleName() {
        return roleName;
    }
}
