package com.citizen.EngageRwanda.service.impl;

import com.citizen.EngageRwanda.dto.AgencyDto;
import com.citizen.EngageRwanda.entity.Agency;
import com.citizen.EngageRwanda.repository.AgencyRepository;
import com.citizen.EngageRwanda.service.AgencyService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AgencyServiceImpl implements AgencyService {

  private final AgencyRepository agencyRepository;

  @Override
  public AgencyDto createAgency(AgencyDto agencyDto) {
    Agency agency = new Agency();
    agency.setName(agencyDto.getName());
    agency.setDescription(agencyDto.getDescription());

    Agency savedAgency = agencyRepository.save(agency);

    return mapToDto(savedAgency);
  }

  @Override
  public AgencyDto getAgencyById(Long id) {
    Agency agency = agencyRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Agency not found with ID: " + id));

    return mapToDto(agency);
  }

  @Override
  public AgencyDto getAgencyByName(String name) {
    Agency agency = agencyRepository.findByName(name)
        .orElseThrow(() -> new EntityNotFoundException("Agency not found with name: " + name));

    return mapToDto(agency);
  }

  @Override
  public List<AgencyDto> getAllAgencies() {
    List<Agency> agencies = agencyRepository.findAll();

    return agencies.stream()
        .map(this::mapToDto)
        .collect(Collectors.toList());
  }

  private AgencyDto mapToDto(Agency agency) {
    AgencyDto agencyDto = new AgencyDto();
    agencyDto.setId(agency.getId());
    agencyDto.setName(agency.getName());
    agencyDto.setDescription(agency.getDescription());

    return agencyDto;
  }
}