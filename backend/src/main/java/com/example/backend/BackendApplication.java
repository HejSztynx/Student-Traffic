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
import java.util.List;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class BackendApplication implements CommandLineRunner {

    private final DatabaseManager dbManager;

    @Autowired
    public BackendApplication(DatabaseManager dbManager) {
        this.dbManager = dbManager;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String[] args) throws IOException {
        Firestore db = dbManager.getDb();

        ApiFuture<QuerySnapshot> query = db.collection("Users").get();
        try {
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            System.out.println("siema" + documents.size());
            for (QueryDocumentSnapshot doc : documents) {
                System.out.println("ID: " + doc.getId());
                System.out.println("Dane: " + doc.getData());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
