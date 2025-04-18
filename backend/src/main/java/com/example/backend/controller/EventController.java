package com.example.backend.controller;

import com.example.backend.dtos.NewEventRequest;
import com.example.backend.model.*;
import com.example.backend.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RequestMapping("/events")
@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/add_event")
    public ResponseEntity<String> addEvent(@RequestBody NewEventRequest event) {
        System.out.println("A");
        TimeStruct startTime = new TimeStruct(
                event.year(), event.month(), event.day(),
                event.startHour(), event.startMinute()
        );
        TimeStruct endTime = new TimeStruct(
                event.year(), event.month(), event.day(),
                event.endHour(), event.endMinute()
        );
        String title = event.title();
        String description = event.description();
        Integer playersNeeded = event.playersNeeded();
        OwnerDto ownerDto = event.ownerDto();
        ObjectType objectType = event.objectType();
        try {
            if (eventService.addEvent(startTime, endTime, title, description, playersNeeded, ownerDto, objectType)) {
                return ResponseEntity.ok("Event created successfully");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to create event");
        }

        return ResponseEntity.badRequest().body("Failed to create event");

    }

    @PostMapping
    public List<EventDto> fetchEvents(@RequestBody PullEventPrompt pullEventPrompt) {
        try {
            List<EventDto> fetchedEvents = eventService.fetchEventsForPrompt(pullEventPrompt);
            return fetchedEvents;
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }

        // return new ArrayList<>();
    }

}
