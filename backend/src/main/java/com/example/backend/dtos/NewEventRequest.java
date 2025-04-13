package com.example.backend.dtos;

import com.example.backend.model.ObjectType;
import com.example.backend.model.OwnerDto;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

// @Data
public record NewEventRequest (
    Integer day,
    Integer month,
    Integer year,
    Integer startHour,
    Integer startMinute,
    Integer endHour,
    Integer endMinute,
    String title,
    String description,
    // Integer joinedPlayers,
    Integer playersNeeded,
    OwnerDto ownerDto,
    ObjectType objectType
) {}
