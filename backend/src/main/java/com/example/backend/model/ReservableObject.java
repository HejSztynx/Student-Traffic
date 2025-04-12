package com.example.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservableObject {
    private Long id;
    private String name;
    private ObjectStatus status;
    private ObjectType type;
}
