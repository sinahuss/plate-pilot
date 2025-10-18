package com.platepilot.controller;

import com.platepilot.dto.AuthResponse;
import com.platepilot.model.User;
import com.platepilot.service.GoogleAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class GoogleAuthController {

    private final GoogleAuthService googleAuthService;

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleAuth(@RequestBody Map<String, String> googleData) {
        try {
            String googleId = googleData.get("googleId");
            String email = googleData.get("email");
            String firstName = googleData.get("firstName");
            String lastName = googleData.get("lastName");

            if (googleId == null || email == null) {
                return ResponseEntity.badRequest().build();
            }

            User user = googleAuthService.findOrCreateGoogleUser(googleId, email, firstName, lastName);
            String token = googleAuthService.generateTokenForGoogleUser(user);

            AuthResponse response = new AuthResponse(
                    user.getId().toString(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    token
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
