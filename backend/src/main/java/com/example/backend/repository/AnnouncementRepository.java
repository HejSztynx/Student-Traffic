package com.example.backend.repository;

import com.example.backend.database.DatabaseManager;
import com.example.backend.model.Announcement;
import com.example.backend.model.AnnouncementDto;
import com.example.backend.model.ReservableObject;
import com.example.backend.model.ReservationDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Repository
@AllArgsConstructor
public class AnnouncementRepository {

    private DatabaseManager dm;

    private ObjectMapper objectMapper;

    private static final String OBJECTS = "Annoucements";

    public List<AnnouncementDto> fetchAnnouncements() {
        List<AnnouncementDto> result = new ArrayList<>();
        List<QueryDocumentSnapshot> databaseResponse = new ArrayList<>();

        try {
            databaseResponse = dm.getAllDocumentsFromCollection("Annoucements");
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (QueryDocumentSnapshot doc : databaseResponse) {
            AnnouncementDto obj = doc.toObject(AnnouncementDto.class);
            result.add(obj);
        }

        return result;
    }

    public boolean saveAnnouncement(AnnouncementDto announcement) {
        Map<String, Object> objectMap = objectMapper.convertValue(announcement, Map.class);

        try {
            dm.createDocumentWithData(OBJECTS, String.valueOf(UUID.randomUUID()), objectMap);
            System.out.println("Zapisano obiekt!");
            return true;
        } catch(Exception e) {
            return false;
        }
    }
}
