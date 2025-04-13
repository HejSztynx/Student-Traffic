package com.example.backend.database;

import java.io.InputStream;
import java.util.Map;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Getter
@Component
public class DatabaseManager {

    private Firestore databaseHandler;
    private CredentialFilePath credentialFilePath;

    @Autowired
    public DatabaseManager(CredentialFilePath credentialFilePath) throws Exception {
        this.credentialFilePath = credentialFilePath;
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream credentialFileStream = classLoader.getResourceAsStream(credentialFilePath.getFirebaseConfigPath());
        FirebaseOptions options = FirebaseOptions.builder().
                setCredentials(GoogleCredentials.fromStream(credentialFileStream)).build();
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        this.databaseHandler = FirestoreClient.getFirestore();

    }



    public boolean doesDocumentExist(
            String collectionName, String documentId
    )  {
        try {
            DocumentReference userDocumentReference = databaseHandler.collection(collectionName).document(documentId);
            return (userDocumentReference.get().get().exists());
        } catch (Exception e) {
            return false;
        }
    }
    

    public <T> T getDocumentData(
            String collectionName, String documentId, String fieldName
    ) throws Exception {
        DocumentReference userDocumentReference = this.databaseHandler.collection(collectionName).document(documentId);
        DocumentSnapshot snapshot;
        Map<String, Object> userData;
        try {
            if (!userDocumentReference.get().get().exists()) {
                System.out.println("There is no document with id " + documentId);
                throw new Exception("No document with id " + documentId);
            }

            snapshot = userDocumentReference.get().get();
            userData = snapshot.getData();
            return userData != null ? (T) userData.get(fieldName) : null;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


    public void createDocumentWithData(
            String collectionName, String documentId, Map<String, Object> fieldData
    ) throws Exception {
        CollectionReference collectionReference = this.databaseHandler.collection(collectionName);
        if (!collectionReference.document(documentId).get().get().exists()) {
            collectionReference.document(documentId).set(fieldData);
        }
    }


    public <ObjectType> void createDocumentWithData(
            String collectionName, String documentId, ObjectType object
    ) throws Exception {
        CollectionReference collectionReference = this.databaseHandler.collection(collectionName);
        if (!collectionReference.document(documentId).get().get().exists()) {
            collectionReference.document(documentId).set(object);
        }
    }


    public <T> void updateDocumentFieldWithData(
            String collectionName, String documentId, String fieldName, T newFieldData
    ) throws Exception {
        CollectionReference collectionReference = this.databaseHandler.collection(collectionName);
        if (!collectionReference.document(documentId).get().get().exists()) {
            collectionReference.document(documentId).update(fieldName, newFieldData);
        }
    }


    public void updateDocumentData(
            String collectionName, String documentId, Map<String, Object> fieldData
    ) throws Exception {
        CollectionReference collectionReference = this.databaseHandler.collection(collectionName);
        if (!collectionReference.document(documentId).get().get().exists()) {
            collectionReference.document(documentId).set(fieldData);
        }
    }


//    public <T> List<T> getDocumentsWhereEqualsTo(
//            String collectionName, String field, Object value, Class<T> type
//    ) throws Exception {
//        List<T> result = new ArrayList<>();
//        ApiFuture<QuerySnapshot> future = databaseHandler.collection(collectionName)
//                .whereEqualTo(field, value)
//                .get();
//
//        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
//
//        for (QueryDocumentSnapshot doc : documents) {
//            T obj = doc.toObject(type);
//            result.add(obj);
//        }
//
//        return result;
//    }

    public <T> Query getDocumentsWhereFieldsEqualTo(
            String collectionName, String field, T desiredFieldValue
    ) throws Exception {
        CollectionReference collectionReference = databaseHandler.collection(collectionName);

        return collectionReference.whereEqualTo(field, desiredFieldValue);

    }


}
