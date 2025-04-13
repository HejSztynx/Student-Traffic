package com.example.backend.service;


import com.example.backend.model.AnnouncementDto;
import com.example.backend.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AnnouncementService {

    @Autowired
    AnnouncementRepository repository;

    public List<AnnouncementDto> getAllAnnouncements() {
        return repository.fetchAnnouncements();
    }

    public boolean addAnnouncement(AnnouncementDto announcement) {
        return repository.saveAnnouncement(announcement);
    }
}
