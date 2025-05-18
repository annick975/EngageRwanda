package com.citizen.EngageRwanda.controller;

import com.citizen.EngageRwanda.dto.ComplaintRequest;
import com.citizen.EngageRwanda.dto.ComplaintResponse;
import com.citizen.EngageRwanda.dto.StatusUpdateRequest;
import com.citizen.EngageRwanda.service.ComplaintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/complaints")
@RequiredArgsConstructor
public class ComplaintController {

  private final ComplaintService complaintService;

  @PostMapping
  public ResponseEntity<ComplaintResponse> createComplaint(@Valid @RequestBody ComplaintRequest complaintRequest) {
    return new ResponseEntity<>(complaintService.createComplaint(complaintRequest), HttpStatus.CREATED);
  }

  @PostMapping("/authenticated")
  @PreAuthorize("hasRole('CITIZEN')")
  public ResponseEntity<ComplaintResponse> createAuthenticatedComplaint(
      @Valid @RequestBody ComplaintRequest complaintRequest) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    complaintRequest.setCitizenEmail(authentication.getName());
    return new ResponseEntity<>(complaintService.createComplaint(complaintRequest), HttpStatus.CREATED);
  }

  @GetMapping("/track/{ticketId}")
  public ResponseEntity<ComplaintResponse> getComplaintByTicketId(@PathVariable String ticketId) {
    return ResponseEntity.ok(complaintService.getComplaintByTicketId(ticketId));
  }

  @GetMapping(path = {"/citizen/track/{ticketId}"})
  @PreAuthorize("hasRole('CITIZEN')")
  public ResponseEntity<ComplaintResponse> getComplaintByTicketIdForCitizen(@PathVariable String ticketId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String citizenEmail = authentication.getName();
    return ResponseEntity.ok(complaintService.getComplaintByTicketIdForCitizen(ticketId, citizenEmail));
  }

  @GetMapping("/api/v1/citizen/track/{ticketId}")
  @PreAuthorize("hasRole('CITIZEN')")
  public ResponseEntity<ComplaintResponse> getComplaintByTicketIdForCitizenAlt(@PathVariable String ticketId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String citizenEmail = authentication.getName();
    return ResponseEntity.ok(complaintService.getComplaintByTicketIdForCitizen(ticketId, citizenEmail));
  }

  @GetMapping("/admin/complaints")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<ComplaintResponse>> getComplaintsForMyAgency() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String adminEmail = authentication.getName();
    return ResponseEntity.ok(complaintService.getComplaintsForAdminAgency(adminEmail));
  }

  @GetMapping("/admin/ticket/{ticketId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ComplaintResponse> getComplaintByTicketIdAdmin(@PathVariable String ticketId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String adminEmail = authentication.getName();
    return ResponseEntity.ok(complaintService.getComplaintByTicketIdForAdmin(ticketId, adminEmail));
  }

  @PutMapping("/admin/{complaintId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ComplaintResponse> updateComplaintStatus(
      @PathVariable Long complaintId,
      @Valid @RequestBody StatusUpdateRequest statusUpdateRequest) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String adminEmail = authentication.getName();
    return ResponseEntity.ok(complaintService.updateComplaintStatusByAdmin(
        complaintId,
        statusUpdateRequest,
        adminEmail));
  }

  @PutMapping("/admin/ticket/{ticketId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ComplaintResponse> updateComplaintStatusByTicketId(
      @PathVariable String ticketId,
      @Valid @RequestBody StatusUpdateRequest statusUpdateRequest) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String adminEmail = authentication.getName();
    return ResponseEntity.ok(complaintService.updateComplaintStatusByTicketId(
        ticketId,
        statusUpdateRequest,
        adminEmail));
  }
}