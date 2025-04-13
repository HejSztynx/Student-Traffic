package com.example.backend.model;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ReservationDto {
    // private LocalDateTime start;
    // private LocalDateTime end;
    private Integer day;
    private Integer month;
    private Integer year;
    private Integer startHour;
    private Integer startMinute;
    private Integer endHour;
    private Integer endMinute;
    private String title;
    private OwnerDto owner;
    private String objectId;
}
