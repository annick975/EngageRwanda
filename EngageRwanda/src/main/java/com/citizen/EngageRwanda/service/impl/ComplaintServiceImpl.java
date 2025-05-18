package com.citizen.EngageRwanda.service.impl;

import com.citizen.EngageRwanda.dto.ComplaintRequest;
import com.citizen.EngageRwanda.dto.ComplaintResponse;
import com.citizen.EngageRwanda.dto.StatusUpdateRequest;
import com.citizen.EngageRwanda.entity.Admin;
import com.citizen.EngageRwanda.entity.Agency;
import com.citizen.EngageRwanda.entity.Citizen;
import com.citizen.EngageRwanda.entity.Complaint;
import com.citizen.EngageRwanda.repository.AdminRepository;
import com.citizen.EngageRwanda.repository.AgencyRepository;
import com.citizen.EngageRwanda.repository.CitizenRepository;
import com.citizen.EngageRwanda.repository.ComplaintRepository;
import com.citizen.EngageRwanda.service.ComplaintService;
import com.citizen.EngageRwanda.util.TicketGenerator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
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
  private final AdminRepository adminRepository;

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
  public ComplaintResponse getComplaintByTicketIdForCitizen(String ticketId, String citizenEmail) {
    // Find the citizen by email
    Citizen citizen = citizenRepository.findByEmail(citizenEmail)
        .orElseThrow(() -> new EntityNotFoundException("Citizen not found with email: " + citizenEmail));

    // Find the complaint by ticket ID
    Complaint complaint = complaintRepository.findByTicketId(ticketId)
        .orElseThrow(() -> new EntityNotFoundException("Complaint not found with ticket ID: " + ticketId));

    // Verify that this complaint belongs to the citizen
    if (complaint.getCitizen() == null || !complaint.getCitizen().getId().equals(citizen.getId())) {
      throw new AccessDeniedException("You are not authorized to view this complaint");
    }

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

  @Override
  public List<ComplaintResponse> getComplaintsForAdminAgency(String adminUsername) {
    // Find the admin by email
    Admin admin = adminRepository.findByEmail(adminUsername)
        .orElseThrow(() -> new EntityNotFoundException("Admin not found with email: " + adminUsername));

    // Get the agency of the admin
    Agency agency = admin.getAgency();
    if (agency == null) {
      throw new EntityNotFoundException("Admin is not associated with any agency");
    }

    // Get complaints for this agency
    List<Complaint> complaints = complaintRepository.findByAssignedAgency(agency);

    return complaints.stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  @Override
  public ComplaintResponse updateComplaintStatusByAdmin(Long complaintId, StatusUpdateRequest statusUpdateRequest,
      String adminUsername) {
    // Find the admin by email
    Admin admin = adminRepository.findByEmail(adminUsername)
        .orElseThrow(() -> new EntityNotFoundException("Admin not found with email: " + adminUsername));

    // Get the agency of the admin
    Agency adminAgency = admin.getAgency();
    if (adminAgency == null) {
      throw new EntityNotFoundException("Admin is not associated with any agency");
    }

    // Find the complaint
    Complaint complaint = complaintRepository.findById(complaintId)
        .orElseThrow(() -> new EntityNotFoundException("Complaint not found with ID: " + complaintId));

    // Check if the complaint belongs to the admin's agency
    if (!complaint.getAssignedAgency().getId().equals(adminAgency.getId())) {
      throw new AccessDeniedException("You are not authorized to update complaints for this agency");
    }

    // Update the complaint
    complaint.setStatus(statusUpdateRequest.getStatus());
    complaint.setResponseMessage(statusUpdateRequest.getResponseMessage());
    complaint.setUpdatedAt(LocalDateTime.now());

    Complaint updatedComplaint = complaintRepository.save(complaint);
    return mapToDto(updatedComplaint);
  }

  @Override
  public ComplaintResponse getComplaintByTicketIdForAdmin(String ticketId, String adminUsername) {
    // Find the admin by email
    Admin admin = adminRepository.findByEmail(adminUsername)
        .orElseThrow(() -> new EntityNotFoundException("Admin not found with email: " + adminUsername));

    // Get the agency of the admin
    Agency adminAgency = admin.getAgency();
    if (adminAgency == null) {
      throw new EntityNotFoundException("Admin is not associated with any agency");
    }

    // Find the complaint by ticket ID
    Complaint complaint = complaintRepository.findByTicketId(ticketId)
        .orElseThrow(() -> new EntityNotFoundException("Complaint not found with ticket ID: " + ticketId));

    // Check if the complaint belongs to the admin's agency
    if (!complaint.getAssignedAgency().getId().equals(adminAgency.getId())) {
      throw new AccessDeniedException("You are not authorized to view complaints for this agency");
    }

    return mapToDto(complaint);
  }

  @Override
  public ComplaintResponse updateComplaintStatusByTicketId(String ticketId, StatusUpdateRequest statusUpdateRequest,
      String adminUsername) {
    // Find the admin by email
    Admin admin = adminRepository.findByEmail(adminUsername)
        .orElseThrow(() -> new EntityNotFoundException("Admin not found with email: " + adminUsername));

    // Get the agency of the admin
    Agency adminAgency = admin.getAgency();
    if (adminAgency == null) {
      throw new EntityNotFoundException("Admin is not associated with any agency");
    }

    // Find the complaint by ticket ID
    Complaint complaint = complaintRepository.findByTicketId(ticketId)
        .orElseThrow(() -> new EntityNotFoundException("Complaint not found with ticket ID: " + ticketId));

    // Check if the complaint belongs to the admin's agency
    if (!complaint.getAssignedAgency().getId().equals(adminAgency.getId())) {
      throw new AccessDeniedException("You are not authorized to update complaints for this agency");
    }

    // Update the complaint
    complaint.setStatus(statusUpdateRequest.getStatus());
    complaint.setResponseMessage(statusUpdateRequest.getResponseMessage());
    complaint.setUpdatedAt(LocalDateTime.now());

    Complaint updatedComplaint = complaintRepository.save(complaint);
    return mapToDto(updatedComplaint);
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
        .fromRegisteredCitizen(complaint.getCitizen() != null)
        .build();
  }
}