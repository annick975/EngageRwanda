package com.citizen.EngageRwanda.service;

import com.citizen.EngageRwanda.dto.CitizenAuthResponse;
import com.citizen.EngageRwanda.dto.CitizenLoginRequest;
import com.citizen.EngageRwanda.dto.CitizenRegistrationRequest;
import com.citizen.EngageRwanda.dto.CitizenResponse;
import com.citizen.EngageRwanda.dto.ComplaintResponse;

import java.util.List;

public interface CitizenService {
  CitizenResponse registerCitizen(CitizenRegistrationRequest registrationRequest);

  CitizenAuthResponse authenticateCitizen(CitizenLoginRequest loginRequest);

  CitizenResponse getCitizenByEmail(String email);

  List<ComplaintResponse> getCitizenComplaints(String email);
}