package com.example.backend.model;

import lombok.Data;

@Data
public class EventDto {
    private Long eventId;
    private Long reservationId;
    private String title;
    private String description;
    private Integer joinedPlayers;
    private Integer playersNeeded;
}
