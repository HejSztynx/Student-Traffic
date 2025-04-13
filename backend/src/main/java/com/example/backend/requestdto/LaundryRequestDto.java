package com.example.backend.requestdto;

import java.time.LocalDate;

public record LaundryRequestDto(
        Integer floor,
        LocalDate localDate
) {
}
