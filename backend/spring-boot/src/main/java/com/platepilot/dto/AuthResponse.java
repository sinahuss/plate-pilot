package com.platepilot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String token;
}

