package com.example.backend.controller;

import com.example.backend.model.ReservableObject;
import com.example.backend.requestdto.ReservationRequestDto;
import com.example.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping()
    ResponseEntity<String> reserve(@RequestBody ReservationRequestDto reservationRequestDto) {
        if (reservationService.reserve(reservationRequestDto)) {
            return ResponseEntity.ok("fajne fajne");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("jakis blad");
    }
}
