package com.citizen.EngageRwanda.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StatusUpdateRequest {
  /**
   * Status of the complaint.
   * Possible values: "Pending", "In Progress", "Under Investigation", "Resolved",
   * "Rejected"
   */
  @NotBlank(message = "Status is required")
  private String status;

  /**
   * Response message from the admin/agency to the citizen
   */
  private String responseMessage;
}