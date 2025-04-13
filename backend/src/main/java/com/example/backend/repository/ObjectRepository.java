package com.example.backend.repository;

import com.example.backend.database.DatabaseManager;
import com.example.backend.model.ObjectStatus;
import com.example.backend.model.ObjectType;
import com.example.backend.model.ReservableObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
@AllArgsConstructor
public class ObjectRepository {

    private DatabaseManager dm;

    private ObjectMapper objectMapper;

    private static final String OBJECTS = "Objects";

    public List<ReservableObject> findAllByType(ObjectType objectType) {
        List<ReservableObject> result = new ArrayList<>();
        try {
            result.addAll(dm.getDocumentsWhereEqualsTo(OBJECTS, "type", objectType, ReservableObject.class));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;

    }

    public boolean setStatus(String objectId, ObjectStatus objectStatus) {
        try {
            dm.updateDocumentFieldWithData(OBJECTS, objectId, "status", objectStatus.toString());
            System.out.println("Updated object with id = " + objectId + " with status: " + objectStatus);
            return true;
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean saveObject(ReservableObject object) {
        Map<String, Object> objectMap = objectMapper.convertValue(object, Map.class);

        try {
            dm.createDocumentWithData(OBJECTS, object.getId(), objectMap);
            System.out.println("Zapisano obiekt!");
            return true;
        } catch(Exception e) {
            return false;
        }
    }
}
