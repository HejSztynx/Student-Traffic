package com.example.backend.controller;

import com.example.backend.database.DatabaseManager;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@AllArgsConstructor
@RestController
@RequestMapping("/login")
public class LoggingController {

    private final DatabaseManager databaseManager;

//    @PostMapping("/auth")
//    public ResponseEntity<String> auth(@RequestParam String username, @RequestParam String password) {
//
//    }

}
