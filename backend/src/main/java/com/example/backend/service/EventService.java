package com.example.backend.service;

import com.example.backend.database.DatabaseManager;
import com.example.backend.model.*;
import com.google.cloud.firestore.Filter;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.UUID;

// @AllArgsConstructor
@Service
public class EventService {

    private static final String USERS_TABLE_NAME = "Users";
    private static final String EVENT_TABLE_NAME = "Events";
    private static final String RESERVATIONS_TABLE_NAME = "Reservations";
    private static final String OBJECTS_TABLE_NAME = "Objects";

    @Autowired
    DatabaseManager databaseManager;

    private String createReservationTiedToEvent(
            TimeStruct startTime, TimeStruct endTime,
            String title, OwnerDto owner, String objectId
    ) throws Exception {
        if (databaseManager.doesDocumentExist(OBJECTS_TABLE_NAME, objectId)) {
            return "";
        }

        List<QueryDocumentSnapshot> queryResults  =
                databaseManager.getDatabaseHandler().
                collection(RESERVATIONS_TABLE_NAME).
                whereEqualTo("objectId", objectId).
                whereEqualTo("year", startTime.year()).
                whereEqualTo("month", startTime.month()).
                whereEqualTo("day", startTime.day()).
                where(
                        Filter.or(
                            Filter.and(
                                Filter.lessThanOrEqualTo("start", startTime.hour()),
                                Filter.greaterThanOrEqualTo("end", startTime.hour())
                            ),
                            Filter.and(
                                Filter.lessThanOrEqualTo("start", endTime.hour()),
                                Filter.greaterThanOrEqualTo("end", endTime.hour())
                            )
                        )
                )
                .get().get().getDocuments();

        HashMap<String, Object> documentCreationMap = new HashMap<>();
        documentCreationMap.put("year", startTime.year());
        documentCreationMap.put("month", startTime.month());
        documentCreationMap.put("day", startTime.day());
        documentCreationMap.put("hour", startTime.hour());
        documentCreationMap.put("objectId", objectId);
        documentCreationMap.put("owner", owner);
        documentCreationMap.put("title", title + " - tied reservation");

        if (!queryResults.isEmpty()) {return "";}
        Random random = new Random();
        String reservationId = title + "-_-" + owner.getOwnerId() + "_" + startTime.year() + "-" + startTime.month()
                + "-" + startTime.day() + "-" + startTime.hour() + random.nextInt(14);
        databaseManager.createDocumentWithData(
                RESERVATIONS_TABLE_NAME,
                reservationId,
                documentCreationMap
        );

        return reservationId;

    }


    public boolean addEvent(
            TimeStruct startTime, TimeStruct endTime,
            String title, String description,
            Integer playersNeeded,
            OwnerDto ownerDto, ObjectType objectType
    ) throws Exception {
        System.out.println("B");
        if (databaseManager.doesDocumentExist(USERS_TABLE_NAME, ownerDto.getOwnerId())) {
            System.out.println("C");
            if (objectType.isOfReservableType() && objectType.isEventAdjacent()) {
                System.out.println("D");
                try {
                    String reservationId = createReservationTiedToEvent(
                            startTime, endTime, title, ownerDto, objectType.name()
                    );
                    System.out.println("D");

                    if (!reservationId.isEmpty()) {
                        HashMap<String, Object> creationMap = new HashMap<>();
                        creationMap.put("year", startTime.year());
                        creationMap.put("month", startTime.month());
                        creationMap.put("day", startTime.day());
                        creationMap.put("hour", startTime.hour());
                        creationMap.put("title", title);
                        creationMap.put("description", description);
                        creationMap.put("playersNeeded", playersNeeded);
                        creationMap.put("joinedPlayers", 1);
                        creationMap.put("reservationId", reservationId);
                        creationMap.put("objectId", objectType.name());
//                        for (Object k : creationMap.keySet()) {
//                            System.out.println(k + ": " + creationMap.get(k));
//                        }

                        databaseManager.createDocumentWithData(
                                EVENT_TABLE_NAME, UUID.randomUUID().toString(), creationMap
                        );

                        System.out.println("E");

                        return true;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            } else if (objectType.isEventAdjacent()) {
                HashMap<String, Object> creationMap = new HashMap<>();
                creationMap.put("year", startTime.year());
                creationMap.put("month", startTime.month());
                creationMap.put("day", startTime.day());
                creationMap.put("hour", startTime.hour());
                creationMap.put("title", title);
                creationMap.put("description", description);
                creationMap.put("playersNeeded", playersNeeded);
                creationMap.put("joinedPlayers", 1);
                creationMap.put("reservationId", "");
                creationMap.put("objectId", objectType.name());

                databaseManager.createDocumentWithData(
                        EVENT_TABLE_NAME, UUID.randomUUID().toString(), creationMap
                );
            }
        }

        return false;
    }

    public List<EventDto> fetchEventsForPrompt(
            PullEventPrompt pullEventPrompt
    ) throws Exception {
        List<EventDto> fetchedEntries =
                databaseManager.getDatabaseHandler().collection(EVENT_TABLE_NAME).
                        whereEqualTo("year", pullEventPrompt.year()).
                        whereEqualTo("month", pullEventPrompt.month()).
                        whereEqualTo("day", pullEventPrompt.day()).
                        whereEqualTo("objectId", pullEventPrompt.objectId()).
                        get().get().getDocuments().stream().map(
                                (queryDocumentSnapshot) -> {
                                    EventDto eventDto = queryDocumentSnapshot.toObject(EventDto.class);
                                    // eventDto.setObjectType(pullEventPrompt.objectId());
                                    return eventDto;
                                }
                        ).toList();

        return fetchedEntries;
    }

}
