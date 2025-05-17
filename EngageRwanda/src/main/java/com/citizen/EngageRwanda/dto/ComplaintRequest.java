package com.citizen.EngageRwanda.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ComplaintRequest {

  @NotBlank(message = "Name is required")
  private String name;

  @NotBlank(message = "Email is required")
  @Email(message = "Please provide a valid email")
  private String email;

  @NotBlank(message = "Category is required")
  private String category;

  @NotBlank(message = "Description is required")
  private String description;

  @NotBlank(message = "Agency is required")
  private String agencyName;

  // Optional - will be used if the complaint is submitted by a logged-in citizen
  private String citizenEmail;
}