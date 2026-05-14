package com.ecommerce.project.service;

import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.User;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.request.SignupRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void registerUser(SignupRequest request) {
        if (userRepository.existsByUserName(request.getUsername())){
            throw new RuntimeException("Username Already Taken! ");
        }
        if (userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already in use! ");
        }

        User user = new User();
        user.setUserName(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRoles(Set.of(userRole));
        userRepository.save(user);
    }
}
