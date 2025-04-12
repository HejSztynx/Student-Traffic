package com.example.backend.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReservationDto {
    private LocalDate start;
    private LocalDate end;
    private String title;
    private OwnerDto owner;
    private Long objectId;
}
