package com.example.backend.database;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Getter
@Configuration
@Component
public class CredentialFilePath {

    @Value("${firebase.config.path}")
    private String firebaseConfigPath;

}