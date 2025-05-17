package com.citizen.EngageRwanda.service.impl;

import com.citizen.EngageRwanda.dto.CitizenAuthResponse;
import com.citizen.EngageRwanda.dto.CitizenLoginRequest;
import com.citizen.EngageRwanda.dto.CitizenRegistrationRequest;
import com.citizen.EngageRwanda.dto.CitizenResponse;
import com.citizen.EngageRwanda.dto.ComplaintResponse;
import com.citizen.EngageRwanda.entity.Citizen;
import com.citizen.EngageRwanda.entity.Complaint;
import com.citizen.EngageRwanda.repository.CitizenRepository;
import com.citizen.EngageRwanda.repository.ComplaintRepository;
import com.citizen.EngageRwanda.security.JwtUtils;
import com.citizen.EngageRwanda.service.CitizenService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CitizenServiceImpl implements CitizenService {

  private final CitizenRepository citizenRepository;
  private final ComplaintRepository complaintRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtils jwtUtils;

  @Override
  public CitizenResponse registerCitizen(CitizenRegistrationRequest registrationRequest) {
    if (citizenRepository.existsByEmail(registrationRequest.getEmail())) {
      throw new EntityExistsException("Email is already registered");
    }

    Citizen citizen = new Citizen();
    citizen.setName(registrationRequest.getName());
    citizen.setEmail(registrationRequest.getEmail());
    citizen.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
    citizen.setRole("ROLE_CITIZEN");

    Citizen savedCitizen = citizenRepository.save(citizen);

    return mapToCitizenResponse(savedCitizen);
  }

  @Override
  public CitizenAuthResponse authenticateCitizen(CitizenLoginRequest loginRequest) {
    Citizen citizen = citizenRepository.findByEmail(loginRequest.getEmail())
        .orElseThrow(() -> new EntityNotFoundException("No account found with this email"));

    if (!passwordEncoder.matches(loginRequest.getPassword(), citizen.getPassword())) {
      throw new BadCredentialsException("Invalid email or password");
    }

    // Create UserDetails for JWT token generation
    UserDetails userDetails = new User(
        citizen.getEmail(),
        citizen.getPassword(),
        Collections.singletonList(new SimpleGrantedAuthority(citizen.getRole())));

    // Generate JWT token
    String token = jwtUtils.generateToken(userDetails);

    return CitizenAuthResponse.builder()
        .name(citizen.getName())
        .email(citizen.getEmail())
        .role(citizen.getRole())
        .success(true)
        .message("Login successful")
        .token(token)
        .build();
  }

  @Override
  public CitizenResponse getCitizenByEmail(String email) {
    Citizen citizen = citizenRepository.findByEmail(email)
        .orElseThrow(() -> new EntityNotFoundException("No account found with this email"));

    return mapToCitizenResponse(citizen);
  }

  @Override
  public List<ComplaintResponse> getCitizenComplaints(String email) {
    Citizen citizen = citizenRepository.findByEmail(email)
        .orElseThrow(() -> new EntityNotFoundException("No account found with this email"));

    List<Complaint> complaints = complaintRepository.findByCitizen(citizen);

    return complaints.stream()
        .map(this::mapToComplaintResponse)
        .collect(Collectors.toList());
  }

  private CitizenResponse mapToCitizenResponse(Citizen citizen) {
    return CitizenResponse.builder()
        .id(citizen.getId())
        .name(citizen.getName())
        .email(citizen.getEmail())
        .role(citizen.getRole())
        .build();
  }

  private ComplaintResponse mapToComplaintResponse(Complaint complaint) {
    return ComplaintResponse.builder()
        .id(complaint.getId())
        .ticketId(complaint.getTicketId())
        .name(complaint.getName())
        .email(complaint.getEmail())
        .category(complaint.getCategory())
        .description(complaint.getDescription())
        .agencyName(complaint.getAssignedAgency().getName())
        .status(complaint.getStatus())
        .createdAt(complaint.getCreatedAt())
        .updatedAt(complaint.getUpdatedAt())
        .responseMessage(complaint.getResponseMessage())
        .build();
  }
}