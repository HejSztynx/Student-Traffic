package com.example.backend;

import com.example.backend.database_functionality.DatabaseManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        try {
            DatabaseManager databaseManager = new DatabaseManager("firestore-cred-file.json");
            System.out.println(databaseManager.getUserName("uniqueUser"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
