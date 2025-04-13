package com.example.backend;

import com.example.backend.database.DatabaseManager;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class BackendApplication implements CommandLineRunner {

    private final DatabaseManager databaseManager;

    @Autowired
    public BackendApplication(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String[] args) throws Exception {
        // String name = databaseManager.getDocumentData("Users", "46e11608-a5e1-414b-8333-3e2d245677ff", "name");
        // System.out.println(name);

//        HashMap<String, Object> hashMap = new HashMap<>();
//        hashMap.put("name", "Jan");
//        hashMap.put("surname", "Masternak");
//        databaseManager.createDocumentWithData(
//                "Users",
//                "janmast",
//                hashMap
//        );

    }

}
