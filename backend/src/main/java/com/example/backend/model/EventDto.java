package com.example.backend.model;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class EventDto {
//    private LocalDateTime startTime;
//    private LocalDateTime endTime;
    private String eventId;

    private Integer year;
    private Integer month;
    private Integer day;

    private Integer startHour;
    private Integer startMinute;

    private Integer endHour;
    private Integer endMinute;

    private String reservationId;
    private String title;
    private String description;
    private Integer joinedPlayers;
    private Integer playersNeeded;

    private ObjectType objectId;
}
