package com.example.backend.repository;

import com.example.backend.database.DatabaseManager;
import com.example.backend.model.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.util.*;

@AllArgsConstructor
@Repository
public class ReservationRepository {
    private DatabaseManager dm;

    private ObjectMapper objectMapper;

    private static final String RESERVATIONS = "Reservations";


    public List<ReservationDto> getObjectReservationByIdAndDate(String id, LocalDate localDate) {
        return dm.getPralkaReservationsGivenDate(id, localDate);
    }

    public boolean addReservation(ReservationDto reservationDto) {
        Map<String, Object> reservationMap = objectMapper.convertValue(reservationDto, Map.class);

        try {
            dm.createDocumentWithData(RESERVATIONS, UUID.randomUUID().toString(), reservationMap);
            System.out.println("Zapisano rezerwację");
            return true;
        } catch(Exception e) {
            return false;
        }
    }
}
