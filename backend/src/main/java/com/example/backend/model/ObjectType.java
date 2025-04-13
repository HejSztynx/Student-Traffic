package com.example.backend.model;

public enum ObjectType {
    WASHER,
    DRYER,
    FOOTBALL,
    BASKETBALL,
    VOLLEYBALL,
    GYM,
    NON_EXISTENT;

    public boolean isOfReservableType() {
        return !(this == NON_EXISTENT);
    }

    public boolean isEventAdjacent() {
        return !(this == WASHER || this == DRYER);
    }
}