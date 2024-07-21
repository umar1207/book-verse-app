package bookverse.service.role;

import bookverse.dto.role.RoleCreateDto;
import bookverse.dto.role.RoleReadDto;
import bookverse.entity.Role;
import bookverse.exception.general.EntityAlreadyExistsException;
import bookverse.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public void createRole(RoleCreateDto roleCreateDto) {
        Role checkRole = roleRepository.findByRoleName(roleCreateDto.getRoleName());
        if (checkRole != null) {
            throw new EntityAlreadyExistsException("Role Already exists : " + roleCreateDto.getRoleName());
        }
        Role newRole = new Role();
        newRole.setRoleName(roleCreateDto.getRoleName());
        roleRepository.save(newRole);
    }

    @Override
    public List<RoleReadDto> getAllRoles() {
        List<RoleReadDto> allRoles = new ArrayList<>();
        List<Role> roles = roleRepository.findAll();
        for(Role role: roles){
            RoleReadDto roleReadDto = new RoleReadDto(role.getRoleId(), role.getRoleName());
            allRoles.add(roleReadDto);
        }
        return allRoles;
    }
}
