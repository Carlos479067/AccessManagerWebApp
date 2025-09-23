package com.example.backend.dto;

public class UserDto {

    private String authorizedEin;
    private String firstName;
    private String lastName;
    private String routeNumber;

    public UserDto(String authorizedEin, String firstName, String lastName, String routeNumber) {
        this.authorizedEin = authorizedEin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.routeNumber = routeNumber;
    }

    public UserDto() {

    }

    public String getAuthorizedEin() {
        return authorizedEin;
    }

    public void setAuthorizedEin(String authorizedEin) {
        this.authorizedEin = authorizedEin;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRouteNumber() {
        return routeNumber;
    }

    public void setRouteNumber(String routeNumber) {
        this.routeNumber = routeNumber;
    }
}
