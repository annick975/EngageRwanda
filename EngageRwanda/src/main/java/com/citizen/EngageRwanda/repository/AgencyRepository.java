package com.citizen.EngageRwanda.repository;

import com.citizen.EngageRwanda.entity.Agency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgencyRepository extends JpaRepository<Agency, Long> {
  Optional<Agency> findByName(String name);
}