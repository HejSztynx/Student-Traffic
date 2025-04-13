package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Announcement {
    private Long announcementId;
    private String description;
    private Long ownerId;
    private Double price;
    private String title;
    private String location;
}
