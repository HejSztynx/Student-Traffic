package com.example.backend.database_functionality;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Map;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

public class DatabaseManager {

    private final Firestore databaseHandler;

    public DatabaseManager(String credentialFilePath) throws Exception {
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream credentialFileStream = classLoader.getResourceAsStream(credentialFilePath);
        FirebaseOptions options = FirebaseOptions.builder().
                setCredentials(GoogleCredentials.fromStream(credentialFileStream)).build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        this.databaseHandler = FirestoreClient.getFirestore();

    }

    public String getUserName(String userId) {
        DocumentReference userDocumentReference = this.databaseHandler.collection("Users").document(userId);
        DocumentSnapshot snapshot;
        Map<String, Object> userData;
        try {
            if (!userDocumentReference.get().get().exists()) {
                System.out.println("There is no user with id " + userId);
                throw new Exception("No user with id " + userId);
            }

            snapshot = userDocumentReference.get().get();
            userData = snapshot.getData();
            return userData != null ? (String) userData.get("name") : null;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }

}
