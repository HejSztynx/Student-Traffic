package com.example.backend.model;

import lombok.Data;

public record TimeStruct(
        Integer year,
        Integer month,
        Integer day,
        Integer hour,
        Integer minute
) {}

