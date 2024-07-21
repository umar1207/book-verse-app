package bookverse.controller;

import bookverse.dto.role.RoleCreateDto;
import bookverse.dto.role.RoleReadDto;
import bookverse.service.role.RoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/role")
public class RoleController {
    @Autowired
    RoleService roleService;

    @GetMapping
    public ResponseEntity<?> getAllRoles() {
        List<RoleReadDto> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }

    @PostMapping
    public ResponseEntity<?> createRole(@Valid @RequestBody RoleCreateDto roleCreateDto){
        roleService.createRole(roleCreateDto);
        return ResponseEntity.ok("New Role Created");
    }
}
