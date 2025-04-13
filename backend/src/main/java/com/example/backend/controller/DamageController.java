package com.example.backend.controller;

import com.example.backend.model.ObjectStatus;
import com.example.backend.repository.ObjectRepository;
import com.example.backend.service.ObjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/damage")
public class DamageController {

    private ObjectService objectService;

    @PostMapping("/report")
    public ResponseEntity<String> report(@RequestParam String objectId) {
        if (objectService.changeStatus(objectId, ObjectStatus.DAMAGED)) {
            return ResponseEntity.ok("zgłoszono usterke");
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(400)).body("sigma");
    }

    @PostMapping("/fix")
    public ResponseEntity<String> fix(@RequestParam String objectId) {
        if (objectService.changeStatus(objectId, ObjectStatus.HEALTHY)) {
            return ResponseEntity.ok("naprawiono usterke");
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(400)).body("sigma");
    }
}
