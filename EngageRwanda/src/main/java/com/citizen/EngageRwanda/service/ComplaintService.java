package com.citizen.EngageRwanda.service;

import com.citizen.EngageRwanda.dto.ComplaintRequest;
import com.citizen.EngageRwanda.dto.ComplaintResponse;
import com.citizen.EngageRwanda.dto.StatusUpdateRequest;

import java.util.List;

public interface ComplaintService {
  ComplaintResponse createComplaint(ComplaintRequest complaintRequest);

  ComplaintResponse getComplaintByTicketId(String ticketId);

  List<ComplaintResponse> getComplaintsByAgency(String agencyName);

  ComplaintResponse updateComplaintStatus(Long complaintId, StatusUpdateRequest statusUpdateRequest);

  List<ComplaintResponse> getAllComplaints();
}