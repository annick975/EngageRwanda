package com.citizen.EngageRwanda.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgencyDto {
  private Long id;

  @NotBlank(message = "Agency name is required")
  private String name;

  private String description;
}