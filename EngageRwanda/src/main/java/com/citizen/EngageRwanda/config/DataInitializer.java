package com.citizen.EngageRwanda.config;

import com.citizen.EngageRwanda.entity.Admin;
import com.citizen.EngageRwanda.entity.Agency;
import com.citizen.EngageRwanda.repository.AdminRepository;
import com.citizen.EngageRwanda.repository.AgencyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

  private final AgencyRepository agencyRepository;
  private final AdminRepository adminRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    if (agencyRepository.count() == 0) {
      initAgencies();
    }

    if (adminRepository.count() == 0) {
      initAdmins();
    }
  }

  private void initAgencies() {
    List<Agency> agencies = Arrays.asList(
        createAgency("RIB", "Rwanda Investigation Bureau"),
        createAgency("MINADEF", "Ministry of Defense"),
        createAgency("MINEDUC", "Ministry of Education"),
        createAgency("MININFRA", "Ministry of Infrastructure"),
        createAgency("MINICT", "Ministry of ICT and Innovation"),
        createAgency("RMB", "Rwanda Media Board"));

    agencyRepository.saveAll(agencies);
  }

  private Agency createAgency(String name, String description) {
    Agency agency = new Agency();
    agency.setName(name);
    agency.setDescription(description);
    return agency;
  }

  private void initAdmins() {
    Agency rib = agencyRepository.findByName("RIB").orElseThrow();
    Agency minadef = agencyRepository.findByName("MINADEF").orElseThrow();
    Agency mineduc = agencyRepository.findByName("MINEDUC").orElseThrow();

    Admin ribAdmin = new Admin();
    ribAdmin.setUsername("rib_admin");
    ribAdmin.setPassword(passwordEncoder.encode("password"));
    ribAdmin.setRole("ROLE_ADMIN");
    ribAdmin.setAgency(rib);

    Admin minadefAdmin = new Admin();
    minadefAdmin.setUsername("minadef_admin");
    minadefAdmin.setPassword(passwordEncoder.encode("password"));
    minadefAdmin.setRole("ROLE_ADMIN");
    minadefAdmin.setAgency(minadef);

    Admin mineducAdmin = new Admin();
    mineducAdmin.setUsername("mineduc_admin");
    mineducAdmin.setPassword(passwordEncoder.encode("password"));
    mineducAdmin.setRole("ROLE_ADMIN");
    mineducAdmin.setAgency(mineduc);

    adminRepository.saveAll(Arrays.asList(ribAdmin, minadefAdmin, mineducAdmin));
  }
}