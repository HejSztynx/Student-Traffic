package com.example.backend.controller;

import com.example.backend.database.DatabaseManager;
import com.example.backend.dtos.AuthRequest;
import com.example.backend.model.OwnerDto;
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
    private LoggingService loggingService;


    @PostMapping("/auth")
    public ResponseEntity<?> auth(@RequestBody AuthRequest authRequest) {
        String username = authRequest.username();
        String passedPassword = authRequest.passedPassword();
        try {
            if (loggingService.auth(username, passedPassword)) {

                OwnerDto user = loggingService.getUser(username);

                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.badRequest().body("Auth failed");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Auth failed");
        }
    }

}
