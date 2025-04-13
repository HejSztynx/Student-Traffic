package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private Integer day;
    private Integer month;
    private Integer year;
    private Integer start;
    private Integer end;
    private String title;
    private OwnerDto owner;
    private String objectId;
}
