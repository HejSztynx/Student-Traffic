package com.example.backend.service;

import com.example.backend.model.ObjectStatus;
import com.example.backend.model.ObjectType;
import com.example.backend.model.ReservableObject;
import com.example.backend.model.ReservationDto;
import com.example.backend.repository.ObjectRepository;
import com.example.backend.repository.ReservationRepository;
import com.example.backend.requestdto.LaundryResultDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@AllArgsConstructor
@Service
public class ObjectService {

    private ObjectRepository objectRepository;

    private ReservationRepository reservationRepository;

    public List<ReservableObject> getAllByType(ObjectType objectType) {
        List<ReservableObject> objects = objectRepository.findAllByType(objectType);
        System.out.println(objects);
        return objects;
    }

    private List<ReservableObject> getAllLaundryByFloor(Integer floor) {
        List<ReservableObject> laundryObjects = objectRepository.findAllByType(ObjectType.WASHER);
        List<ReservableObject> dryers = objectRepository.findAllByType(ObjectType.DRYER);
        laundryObjects.addAll(dryers);

        return laundryObjects.stream()
                .filter(o -> {
                    String[] parts = o.getId().split("-");
                    return Integer.parseInt(parts[2]) == floor;
                })
                .toList();
    }

    public List<LaundryResultDto> getAllLaundryReservationByFloor(LocalDate localDate, Integer floor) {
        List<ReservableObject> allLaundry = getAllLaundryByFloor(floor);
        List<LaundryResultDto> result = new ArrayList<>();

        for (ReservableObject laundryObject : allLaundry) {
            List<ReservationDto> objectReservations =
                    reservationRepository.getObjectReservationByIdAndDate(laundryObject.getId(), localDate);
            Map<String, String> map = generateReservationMap(objectReservations, localDate);
            result.add(new LaundryResultDto(laundryObject.getId(), map));
        }
        return result;
    }

    public boolean changeStatus(String objectId, ObjectStatus objectStatus) {
        return objectRepository.setStatus(objectId, objectStatus);
    }

    private Map<String, String> generateReservationMap(
            List<ReservationDto> reservations, LocalDate date) {

        List<LocalTime> slots = List.of(
                LocalTime.of(6, 0),
                LocalTime.of(8, 0),
                LocalTime.of(10, 0),
                LocalTime.of(12, 0),
                LocalTime.of(14, 0),
                LocalTime.of(16, 0),
                LocalTime.of(18, 0),
                LocalTime.of(20, 0),
                LocalTime.of(22, 0)
        );

        Map<String, String> result = new LinkedHashMap<>();

        for (LocalTime slotTime : slots) {
            LocalDateTime slotStart = date.atTime(slotTime);
            LocalDateTime slotEnd = slotStart.plusHours(2);

            boolean isReserved = reservations.stream().anyMatch(res ->


                    res.getStart() == slotStart.getHour()
            );

            String timeKey = slotTime.format(DateTimeFormatter.ofPattern("H:mm"));
            result.put(timeKey, isReserved ? "reserved" : "free");
        }

        return result;
    }

    public boolean createObject(String objectId, ObjectType objectType) {
        ReservableObject object = new ReservableObject(
                objectId,
                "nazwa",
                ObjectStatus.HEALTHY,
                objectType
        );
        return objectRepository.saveObject(object);
    }
}
