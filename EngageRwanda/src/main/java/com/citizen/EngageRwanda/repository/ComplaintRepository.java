package com.citizen.EngageRwanda.repository;

import com.citizen.EngageRwanda.entity.Agency;
import com.citizen.EngageRwanda.entity.Citizen;
import com.citizen.EngageRwanda.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
  Optional<Complaint> findByTicketId(String ticketId);

  List<Complaint> findByAssignedAgency(Agency agency);

  List<Complaint> findByStatus(String status);

  List<Complaint> findByEmail(String email);

  List<Complaint> findByCitizen(Citizen citizen);
}