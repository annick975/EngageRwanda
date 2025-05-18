package com.citizen.EngageRwanda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
  private String username;
  private String email;
  private String role;
  private String agencyName;
  private boolean success;
  private String message;
  private String token;
}