package com.citizen.EngageRwanda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CitizenAuthResponse {
  private String name;
  private String email;
  private String role;
  private boolean success;
  private String message;
  private String token;
}