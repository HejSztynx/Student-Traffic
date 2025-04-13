package com.example.backend.controller;

import com.example.backend.model.ObjectType;
import com.example.backend.model.ReservableObject;
import com.example.backend.requestdto.LaundryRequestDto;
import com.example.backend.requestdto.LaundryResultDto;
import com.example.backend.service.ObjectService;
import com.example.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/objects")
public class ObjectController {

    private final ObjectService objectService;

    @Autowired
    public ObjectController(ObjectService objectService) {
        this.objectService = objectService;
    }

    @GetMapping()
    ResponseEntity<List<ReservableObject>> getAllByType(@RequestParam ObjectType objectType) {
        List<ReservableObject> objects = objectService.getAllByType(objectType);
        return ResponseEntity.ok(objects);
    }

    @PostMapping("/laundry")
    ResponseEntity<List<LaundryResultDto>> getAllLaundryObjectsByFloor(@RequestBody LaundryRequestDto laundryRequestDto) {
        List<LaundryResultDto> objects = objectService.getAllLaundryReservationByFloor(
                laundryRequestDto.localDate(), laundryRequestDto.floor()
        );
        return ResponseEntity.ok(objects);
    }
}
