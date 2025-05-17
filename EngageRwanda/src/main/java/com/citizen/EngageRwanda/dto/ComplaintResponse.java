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

  /**
   * Status of the complaint.
   * Possible values: "Pending", "In Progress", "Under Investigation", "Resolved",
   * "Rejected"
   */
  private String status;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  /**
   * Response message from the admin/agency to the citizen
   */
  private String responseMessage;

  /**
   * Flag indicating if the complaint was submitted by a registered citizen
   */
  @Builder.Default
  private boolean fromRegisteredCitizen = false;
}