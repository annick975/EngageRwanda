package com.citizen.EngageRwanda.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String ticketId;
  private String name;
  private String email;
  private String category;

  @Column(length = 2000)
  private String description;

  @ManyToOne
  @JoinColumn(name = "agency_id")
  private Agency assignedAgency;

  @ManyToOne
  @JoinColumn(name = "citizen_id")
  private Citizen citizen;

  private String status = "Pending";
  private LocalDateTime createdAt = LocalDateTime.now();
  private LocalDateTime updatedAt;

  @Column(length = 2000)
  private String responseMessage;
}