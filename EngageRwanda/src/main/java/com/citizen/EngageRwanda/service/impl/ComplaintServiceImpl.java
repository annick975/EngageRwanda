package com.citizen.EngageRwanda.service.impl;

import com.citizen.EngageRwanda.dto.ComplaintRequest;
import com.citizen.EngageRwanda.dto.ComplaintResponse;
import com.citizen.EngageRwanda.dto.StatusUpdateRequest;
import com.citizen.EngageRwanda.entity.Agency;
import com.citizen.EngageRwanda.entity.Citizen;
import com.citizen.EngageRwanda.entity.Complaint;
import com.citizen.EngageRwanda.repository.AgencyRepository;
import com.citizen.EngageRwanda.repository.CitizenRepository;
import com.citizen.EngageRwanda.repository.ComplaintRepository;
import com.citizen.EngageRwanda.service.ComplaintService;
import com.citizen.EngageRwanda.util.TicketGenerator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

  private final ComplaintRepository complaintRepository;
  private final AgencyRepository agencyRepository;
  private final CitizenRepository citizenRepository;

  @Override
  public ComplaintResponse createComplaint(ComplaintRequest complaintRequest) {
    Agency agency = agencyRepository.findByName(complaintRequest.getAgencyName())
        .orElseThrow(() -> new EntityNotFoundException("Agency not found: " + complaintRequest.getAgencyName()));

    Complaint complaint = new Complaint();
    complaint.setName(complaintRequest.getName());
    complaint.setEmail(complaintRequest.getEmail());
    complaint.setCategory(complaintRequest.getCategory());
    complaint.setDescription(complaintRequest.getDescription());
    complaint.setAssignedAgency(agency);
    complaint.setStatus("Pending");
    complaint.setTicketId(TicketGenerator.generateTicketId());
    complaint.setCreatedAt(LocalDateTime.now());

    // Link to citizen if the complaint is submitted by a logged-in user
    if (StringUtils.hasText(complaintRequest.getCitizenEmail())) {
      Citizen citizen = citizenRepository.findByEmail(complaintRequest.getCitizenEmail())
          .orElse(null);
      complaint.setCitizen(citizen);
    }

    Complaint savedComplaint = complaintRepository.save(complaint);
    return mapToDto(savedComplaint);
  }

  @Override
  public ComplaintResponse getComplaintByTicketId(String ticketId) {
    Complaint complaint = complaintRepository.findByTicketId(ticketId)
        .orElseThrow(() -> new EntityNotFoundException("Complaint not found with ticket ID: " + ticketId));
    return mapToDto(complaint);
  }

  @Override
  public List<ComplaintResponse> getComplaintsByAgency(String agencyName) {
    Agency agency = agencyRepository.findByName(agencyName)
        .orElseThrow(() -> new EntityNotFoundException("Agency not found: " + agencyName));

    List<Complaint> complaints = complaintRepository.findByAssignedAgency(agency);
    return complaints.stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  @Override
  public ComplaintResponse updateComplaintStatus(Long complaintId, StatusUpdateRequest statusUpdateRequest) {
    Complaint complaint = complaintRepository.findById(complaintId)
        .orElseThrow(() -> new EntityNotFoundException("Complaint not found with ID: " + complaintId));

    complaint.setStatus(statusUpdateRequest.getStatus());
    complaint.setResponseMessage(statusUpdateRequest.getResponseMessage());
    complaint.setUpdatedAt(LocalDateTime.now());

    Complaint updatedComplaint = complaintRepository.save(complaint);
    return mapToDto(updatedComplaint);
  }

  @Override
  public List<ComplaintResponse> getAllComplaints() {
    List<Complaint> complaints = complaintRepository.findAll();
    return complaints.stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  private ComplaintResponse mapToDto(Complaint complaint) {
    return ComplaintResponse.builder()
        .id(complaint.getId())
        .ticketId(complaint.getTicketId())
        .name(complaint.getName())
        .email(complaint.getEmail())
        .category(complaint.getCategory())
        .description(complaint.getDescription())
        .agencyName(complaint.getAssignedAgency().getName())
        .status(complaint.getStatus())
        .createdAt(complaint.getCreatedAt())
        .updatedAt(complaint.getUpdatedAt())
        .responseMessage(complaint.getResponseMessage())
        .build();
  }
}