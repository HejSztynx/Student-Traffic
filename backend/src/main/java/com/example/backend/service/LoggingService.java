package com.example.backend.service;

import com.example.backend.database.DatabaseManager;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// @AllArgsConstructor
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


}
