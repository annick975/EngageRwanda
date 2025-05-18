package com.citizen.EngageRwanda.service;

import com.citizen.EngageRwanda.dto.ComplaintRequest;
import com.citizen.EngageRwanda.dto.ComplaintResponse;
import com.citizen.EngageRwanda.dto.StatusUpdateRequest;

import java.util.List;

public interface ComplaintService {
  ComplaintResponse createComplaint(ComplaintRequest complaintRequest);

  ComplaintResponse getComplaintByTicketId(String ticketId);

  ComplaintResponse getComplaintByTicketIdForCitizen(String ticketId, String citizenEmail);

  List<ComplaintResponse> getComplaintsByAgency(String agencyName);

  ComplaintResponse updateComplaintStatus(Long complaintId, StatusUpdateRequest statusUpdateRequest);

  List<ComplaintResponse> getAllComplaints();

  List<ComplaintResponse> getComplaintsForAdminAgency(String adminUsername);

  ComplaintResponse updateComplaintStatusByAdmin(Long complaintId, StatusUpdateRequest statusUpdateRequest,
      String adminUsername);

  ComplaintResponse getComplaintByTicketIdForAdmin(String ticketId, String adminUsername);

  ComplaintResponse updateComplaintStatusByTicketId(String ticketId, StatusUpdateRequest statusUpdateRequest,
      String adminUsername);
}