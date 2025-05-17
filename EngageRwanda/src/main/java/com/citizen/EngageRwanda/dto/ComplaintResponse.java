package com.citizen.EngageRwanda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintResponse {
  private Long id;
  private String ticketId;
  private String name;
  private String email;
  private String category;
  private String description;
  private String agencyName;
  private String status;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private String responseMessage;
}