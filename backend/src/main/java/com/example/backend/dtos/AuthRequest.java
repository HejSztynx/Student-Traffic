package com.example.backend.dtos;

public record AuthRequest (
    String username,
    String passedPassword
) {}
