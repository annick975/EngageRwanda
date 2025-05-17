package com.citizen.EngageRwanda.service;

import com.citizen.EngageRwanda.dto.AgencyDto;

import java.util.List;

public interface AgencyService {
  AgencyDto createAgency(AgencyDto agencyDto);

  AgencyDto getAgencyById(Long id);

  AgencyDto getAgencyByName(String name);

  List<AgencyDto> getAllAgencies();
}