package com.citizen.EngageRwanda.controller;

import com.citizen.EngageRwanda.dto.AdminDto;
import com.citizen.EngageRwanda.dto.AuthResponse;
import com.citizen.EngageRwanda.dto.LoginRequest;
import com.citizen.EngageRwanda.security.JwtUtils;
import com.citizen.EngageRwanda.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final AdminService adminService;
  private final JwtUtils jwtUtils;

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
    try {
      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              loginRequest.getEmail(),
              loginRequest.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);
      UserDetails userDetails = (UserDetails) authentication.getPrincipal();

      String jwt = jwtUtils.generateToken(userDetails);

      AdminDto admin = adminService.getAdminByEmail(userDetails.getUsername());

      return ResponseEntity.ok(AuthResponse.builder()
          .username(admin.getUsername())
          .email(admin.getEmail())
          .role("ADMIN")
          .agencyName(admin.getAgencyName())
          .success(true)
          .message("Login successful")
          .token(jwt)
          .build());

    } catch (AuthenticationException e) {
      return ResponseEntity.ok(AuthResponse.builder()
          .success(false)
          .message("Invalid email or password")
          .build());
    }
  }

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> registerAdmin(@Valid @RequestBody AdminDto adminDto) {
    try {
      AdminDto createdAdmin = adminService.createAdmin(adminDto);

      return ResponseEntity.ok(AuthResponse.builder()
          .username(createdAdmin.getUsername())
          .email(createdAdmin.getEmail())
          .role("ADMIN")
          .agencyName(createdAdmin.getAgencyName())
          .success(true)
          .message("Admin registered successfully")
          .build());

    } catch (Exception e) {
      return ResponseEntity.ok(AuthResponse.builder()
          .success(false)
          .message(e.getMessage())
          .build());
    }
  }
}