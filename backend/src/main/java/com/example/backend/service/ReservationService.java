package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.ReservationRepository;
import com.example.backend.requestdto.ReservationRequestDto;
import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.google.cloud.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class ReservationService {

    private ReservationRepository reservationRepository;

    public boolean reserve(ReservationRequestDto reservationRequestDto) {
         String objectId = reservationRequestDto.objectId();

        Integer startHour = reservationRequestDto.hour();
        Integer endHour = startHour + 2;

        ReservationDto reservationDto = new ReservationDto(
                reservationRequestDto.day(),
                reservationRequestDto.month(),
                reservationRequestDto.year(),
                startHour,
                endHour,
                reservationRequestDto.title(),
                reservationRequestDto.ownerDto(),
                objectId
        );

        return reservationRepository.addReservation(reservationDto);
    }
}
