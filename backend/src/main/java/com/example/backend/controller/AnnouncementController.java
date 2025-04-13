package com.example.backend.controller;

import com.example.backend.model.AnnouncementDto;
import com.example.backend.service.AnnouncementService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/announcements")
public class AnnouncementController {

    @Autowired
    AnnouncementService announcementService;

    @GetMapping()
    public ResponseEntity<List<AnnouncementDto>> getAnnouncements() {
        List<AnnouncementDto> announcements = announcementService.getAllAnnouncements();

        return ResponseEntity.ok().body(announcements);
    }

    @PostMapping("/post")
    public ResponseEntity<String> postAnnouncement(@RequestBody AnnouncementDto announcement) {
        boolean isSuccessful = announcementService.addAnnouncement(announcement);

        if (isSuccessful) {
            return ResponseEntity.ok("Posted announcement successfully");
        } else {
            return ResponseEntity.badRequest().body("Something went wrong");
        }
    }

}
