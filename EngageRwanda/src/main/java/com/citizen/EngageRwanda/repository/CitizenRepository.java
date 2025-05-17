package com.citizen.EngageRwanda.repository;

import com.citizen.EngageRwanda.entity.Citizen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CitizenRepository extends JpaRepository<Citizen, Long> {
  Optional<Citizen> findByEmail(String email);

  boolean existsByEmail(String email);
}