package com.example.backend.model;

import lombok.Data;

@Data
public class OwnerDto {
    private Long ownerId;
    private String name;
    private String surname;
}
