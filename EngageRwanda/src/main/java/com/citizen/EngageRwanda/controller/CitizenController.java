package com.citizen.EngageRwanda.controller;

import com.citizen.EngageRwanda.dto.CitizenAuthResponse;
import com.citizen.EngageRwanda.dto.CitizenLoginRequest;
import com.citizen.EngageRwanda.dto.CitizenRegistrationRequest;
import com.citizen.EngageRwanda.dto.CitizenResponse;
import com.citizen.EngageRwanda.dto.ComplaintResponse;
import com.citizen.EngageRwanda.service.CitizenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/citizens")
@RequiredArgsConstructor
public class CitizenController {

  private final CitizenService citizenService;

  @PostMapping("/register")
  public ResponseEntity<CitizenResponse> registerCitizen(
      @Valid @RequestBody CitizenRegistrationRequest registrationRequest) {
    return new ResponseEntity<>(citizenService.registerCitizen(registrationRequest), HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<CitizenAuthResponse> loginCitizen(@Valid @RequestBody CitizenLoginRequest loginRequest) {
    return ResponseEntity.ok(citizenService.authenticateCitizen(loginRequest));
  }

  @GetMapping("/profile")
  @PreAuthorize("hasRole('CITIZEN')")
  public ResponseEntity<CitizenResponse> getCitizenProfile() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName(); // This is the email used during authentication
    return ResponseEntity.ok(citizenService.getCitizenByEmail(email));
  }

  @GetMapping("/complaints")
  @PreAuthorize("hasRole('CITIZEN')")
  public ResponseEntity<List<ComplaintResponse>> getCitizenComplaints() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();
    return ResponseEntity.ok(citizenService.getCitizenComplaints(email));
  }
}