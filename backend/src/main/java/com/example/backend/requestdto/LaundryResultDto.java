package com.example.backend.requestdto;

import com.example.backend.model.ReservableObject;

import java.util.List;
import java.util.Map;

public record LaundryResultDto(
        String id,
        Map<String, String> reservations
) {
}
