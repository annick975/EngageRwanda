package com.citizen.EngageRwanda.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Agency {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true)
  private String name;

  @Column(length = 1000)
  private String description;

  @OneToMany(mappedBy = "agency", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Admin> admins = new ArrayList<>();

  @OneToMany(mappedBy = "assignedAgency", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Complaint> complaints = new ArrayList<>();
}