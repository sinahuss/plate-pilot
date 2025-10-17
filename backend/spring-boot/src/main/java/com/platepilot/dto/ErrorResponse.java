package com.platepilot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    
    private ErrorDetails error;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ErrorDetails {
        private String code;
        private String message;
        private Map<String, String> details;
        private String timestamp;
    }
    
    public ErrorResponse(String code, String message) {
        this.error = new ErrorDetails(code, message, null, Instant.now().toString());
    }
    
    public ErrorResponse(String code, String message, Map<String, String> details) {
        this.error = new ErrorDetails(code, message, details, Instant.now().toString());
    }
}

