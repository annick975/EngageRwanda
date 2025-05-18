package com.citizen.EngageRwanda.repository;

import com.citizen.EngageRwanda.entity.Admin;
import com.citizen.EngageRwanda.entity.Agency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
  Optional<Admin> findByUsername(String username);

  Optional<Admin> findByEmail(String email);

  List<Admin> findByAgency(Agency agency);
}