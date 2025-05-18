package com.citizen.EngageRwanda.config;

import com.citizen.EngageRwanda.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  @Value("${cors.allowed-origins:*}")
  private String allowedOrigins;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests(auth -> {
          // Public endpoints
          auth.requestMatchers("/api/v1/auth/**").permitAll();
          auth.requestMatchers("/api/v1/citizens/register").permitAll();
          auth.requestMatchers("/api/v1/citizens/login").permitAll();
          auth.requestMatchers("/api/v1/complaints").permitAll();
          auth.requestMatchers("/api/v1/complaints/track/**").permitAll();
          auth.requestMatchers("/api/v1/agencies/list").permitAll();

          // Citizen-only endpoints
          auth.requestMatchers("/api/v1/complaints/authenticated").hasRole("CITIZEN");
          auth.requestMatchers("/api/v1/citizens/profile").hasRole("CITIZEN");
          auth.requestMatchers("/api/v1/citizens/complaints").hasRole("CITIZEN");

          // Admin-only endpoints
          auth.requestMatchers("/api/v1/admin/**").hasRole("ADMIN");
          auth.requestMatchers("/api/v1/complaints/admin/**").hasRole("ADMIN");

          // Any other endpoint requires authentication
          auth.anyRequest().authenticated();
        })
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    // Parse comma-separated origins
    if ("*".equals(allowedOrigins)) {
      configuration.setAllowedOriginPatterns(List.of("*"));
    } else {
      configuration.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
    }

    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
    configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }
}