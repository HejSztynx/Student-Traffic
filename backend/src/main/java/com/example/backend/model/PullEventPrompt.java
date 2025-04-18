package com.example.backend.model;

public record PullEventPrompt(
        Integer year,
        Integer month,
        Integer day,
        ObjectType objectId
)
{

}
