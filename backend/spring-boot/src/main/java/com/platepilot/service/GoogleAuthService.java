package com.platepilot.service;

import com.platepilot.model.User;
import com.platepilot.repository.UserRepository;
import com.platepilot.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public User findOrCreateGoogleUser(String googleId, String email, String firstName, String lastName) {
        // First, try to find by Google ID
        Optional<User> existingUser = userRepository.findByGoogleId(googleId);
        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        // If not found by Google ID, try to find by email
        Optional<User> userByEmail = userRepository.findByEmail(email);
        if (userByEmail.isPresent()) {
            User user = userByEmail.get();
            // Link Google account to existing user
            user.setGoogleId(googleId);
            user.setAuthProvider("GOOGLE");
            return userRepository.save(user);
        }

        // Create new user
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setGoogleId(googleId);
        newUser.setAuthProvider("GOOGLE");
        // passwordHash remains null for OAuth users

        return userRepository.save(newUser);
    }

    public String generateTokenForGoogleUser(User user) {
        return jwtUtil.generateToken(user.getEmail());
    }
}
