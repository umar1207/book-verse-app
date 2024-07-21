package bookverse.service.role;

import bookverse.dto.role.RoleCreateDto;
import bookverse.dto.role.RoleReadDto;

import java.util.List;

public interface RoleService {
    public void createRole(RoleCreateDto roleCreateDto);
    public List<RoleReadDto> getAllRoles();
}
