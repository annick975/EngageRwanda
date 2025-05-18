package com.citizen.EngageRwanda.service.impl;

import com.citizen.EngageRwanda.dto.AdminDto;
import com.citizen.EngageRwanda.entity.Admin;
import com.citizen.EngageRwanda.entity.Agency;
import com.citizen.EngageRwanda.repository.AdminRepository;
import com.citizen.EngageRwanda.repository.AgencyRepository;
import com.citizen.EngageRwanda.service.AdminService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

  private final AdminRepository adminRepository;
  private final AgencyRepository agencyRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public AdminDto createAdmin(AdminDto adminDto) {
    Agency agency = agencyRepository.findByName(adminDto.getAgencyName())
        .orElseThrow(() -> new EntityNotFoundException("Agency not found: " + adminDto.getAgencyName()));

    // Check if email already exists
    if (adminRepository.findByEmail(adminDto.getEmail()).isPresent()) {
      throw new IllegalArgumentException("Email already in use: " + adminDto.getEmail());
    }

    Admin admin = new Admin();
    admin.setUsername(adminDto.getUsername());
    admin.setEmail(adminDto.getEmail());
    admin.setPassword(passwordEncoder.encode(adminDto.getPassword()));
    admin.setAgency(agency);
    admin.setRole("ROLE_ADMIN");

    Admin savedAdmin = adminRepository.save(admin);

    return mapToDto(savedAdmin);
  }

  @Override
  public AdminDto getAdminById(Long id) {
    Admin admin = adminRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Admin not found with ID: " + id));

    return mapToDto(admin);
  }

  @Override
  public AdminDto getAdminByUsername(String username) {
    Admin admin = adminRepository.findByUsername(username)
        .orElseThrow(() -> new EntityNotFoundException("Admin not found with username: " + username));

    return mapToDto(admin);
  }

  @Override
  public AdminDto getAdminByEmail(String email) {
    Admin admin = adminRepository.findByEmail(email)
        .orElseThrow(() -> new EntityNotFoundException("Admin not found with email: " + email));

    return mapToDto(admin);
  }

  @Override
  public List<AdminDto> getAdminsByAgency(String agencyName) {
    Agency agency = agencyRepository.findByName(agencyName)
        .orElseThrow(() -> new EntityNotFoundException("Agency not found: " + agencyName));

    List<Admin> admins = adminRepository.findByAgency(agency);

    return admins.stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  private AdminDto mapToDto(Admin admin) {
    AdminDto adminDto = new AdminDto();
    adminDto.setId(admin.getId());
    adminDto.setUsername(admin.getUsername());
    adminDto.setEmail(admin.getEmail());
    adminDto.setAgencyName(admin.getAgency().getName());
    // Do not map the password back to DTO for security reasons

    return adminDto;
  }
}