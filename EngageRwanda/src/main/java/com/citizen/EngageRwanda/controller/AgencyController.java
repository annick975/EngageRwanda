package com.citizen.EngageRwanda.controller;

import com.citizen.EngageRwanda.dto.AgencyDto;
import com.citizen.EngageRwanda.service.AgencyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/agencies")
@RequiredArgsConstructor
public class AgencyController {

  private final AgencyService agencyService;

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<AgencyDto> createAgency(@Valid @RequestBody AgencyDto agencyDto) {
    return new ResponseEntity<>(agencyService.createAgency(agencyDto), HttpStatus.CREATED);
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<AgencyDto> getAgencyById(@PathVariable Long id) {
    return ResponseEntity.ok(agencyService.getAgencyById(id));
  }

  @GetMapping("/name/{name}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<AgencyDto> getAgencyByName(@PathVariable String name) {
    return ResponseEntity.ok(agencyService.getAgencyByName(name));
  }

  @GetMapping("/list")
  public ResponseEntity<List<AgencyDto>> getAllAgencies() {
    return ResponseEntity.ok(agencyService.getAllAgencies());
  }
}