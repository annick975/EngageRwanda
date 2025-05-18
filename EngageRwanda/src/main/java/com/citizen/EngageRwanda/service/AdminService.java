package com.citizen.EngageRwanda.service;

import com.citizen.EngageRwanda.dto.AdminDto;

import java.util.List;

public interface AdminService {
  AdminDto createAdmin(AdminDto adminDto);

  AdminDto getAdminById(Long id);

  AdminDto getAdminByUsername(String username);

  AdminDto getAdminByEmail(String email);

  List<AdminDto> getAdminsByAgency(String agencyName);
}