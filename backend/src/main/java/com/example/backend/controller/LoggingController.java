package com.example.backend.controller;

import com.example.backend.database.DatabaseManager;
import com.example.backend.dtos.AuthRequest;
import com.example.backend.service.LoggingService;
import com.google.auto.value.AutoAnnotation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping("/login")
public class LoggingController {

    @Autowired
    LoggingService loggingService;


    @PostMapping("/auth")
    public ResponseEntity<String> auth(@RequestBody AuthRequest authRequest) {
        String username = authRequest.username();
        String passedPassword = authRequest.passedPassword();
        try {
            if (loggingService.auth(username, passedPassword)) {
                return ResponseEntity.ok("Auth successful");
            } else {
                return ResponseEntity.badRequest().body("Auth failed");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Auth failed");
        }
    }

}
