package com.example.backend.database;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Getter
@Configuration
@Component
public class FirebaseConfig {

    @Value("${firebase.config.path}")
    private String firebaseConfigPath;

}
