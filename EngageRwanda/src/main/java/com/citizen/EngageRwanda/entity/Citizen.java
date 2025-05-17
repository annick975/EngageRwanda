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
public class Citizen {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @Column(unique = true)
  private String email;

  private String password;

  private String role = "ROLE_CITIZEN";

  @OneToMany(mappedBy = "citizen", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Complaint> complaints = new ArrayList<>();
}