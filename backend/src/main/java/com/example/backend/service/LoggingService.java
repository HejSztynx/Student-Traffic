package com.example.backend.service;

import com.example.backend.database.DatabaseManager;
import com.example.backend.model.OwnerDto;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoggingService {

    private static final String USER_TABLE_NAME = "Users";

    @Autowired
    DatabaseManager databaseManager;

    public boolean auth(String username, String passedPassword) throws Exception {
        if (databaseManager.doesDocumentExist(
                USER_TABLE_NAME, username
        )) {
            String userPassword = databaseManager.getDocumentData(
                    USER_TABLE_NAME, username, "password"
            );
            return userPassword.equals(passedPassword);
        }

        return false;
    }


    public OwnerDto getUser(String username) throws Exception {
        OwnerDto user = new OwnerDto();

        if (databaseManager.doesDocumentExist(USER_TABLE_NAME, username)) {
            String userId = username;
            String name = databaseManager.getDocumentData(USER_TABLE_NAME, username, "name");
            String surname = databaseManager.getDocumentData(USER_TABLE_NAME, username, "surname");

            user.setOwnerId(userId);
            user.setName(name);
            user.setSurname(surname);
        }

        return user;
    }
}
