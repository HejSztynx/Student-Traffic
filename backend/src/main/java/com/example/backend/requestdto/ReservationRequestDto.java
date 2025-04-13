package com.example.backend.requestdto;

import com.example.backend.model.OwnerDto;

public record ReservationRequestDto(
        String objectId,
        String title,
        OwnerDto ownerDto,
        Integer day,
        Integer month,
        Integer year,
        Integer hour

){
}
