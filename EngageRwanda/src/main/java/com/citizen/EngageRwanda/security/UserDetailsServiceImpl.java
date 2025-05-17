package com.citizen.EngageRwanda.security;

import com.citizen.EngageRwanda.entity.Admin;
import com.citizen.EngageRwanda.entity.Citizen;
import com.citizen.EngageRwanda.repository.AdminRepository;
import com.citizen.EngageRwanda.repository.CitizenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

  private final AdminRepository adminRepository;
  private final CitizenRepository citizenRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // First, try to find an admin with this username
    Optional<Admin> adminOptional = adminRepository.findByUsername(username);
    if (adminOptional.isPresent()) {
      Admin admin = adminOptional.get();
      return new User(
          admin.getUsername(),
          admin.getPassword(),
          Collections.singletonList(new SimpleGrantedAuthority(admin.getRole())));
    }

    // If not an admin, try to find a citizen with this email
    Optional<Citizen> citizenOptional = citizenRepository.findByEmail(username);
    if (citizenOptional.isPresent()) {
      Citizen citizen = citizenOptional.get();
      return new User(
          citizen.getEmail(),
          citizen.getPassword(),
          Collections.singletonList(new SimpleGrantedAuthority(citizen.getRole())));
    }

    throw new UsernameNotFoundException("User not found with username/email: " + username);
  }
}