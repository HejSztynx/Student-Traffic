package com.example.backend.controller;

import com.example.backend.model.EventDto;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@AllArgsConstructor
@RequestMapping("/events")
public class EventCreationController {

    @Autowired
    private EventService eventService;

    @PostMapping("/add_event")
    public String addEvent(@RequestBody EventDto event) {

    }

}
