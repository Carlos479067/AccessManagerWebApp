package com.example.backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String authorizedEin;
    private String firstName;
    private String lastName;
    private String routeNumber;

    public User(String authorizedEin, String firstName, String lastName, String routeNumber) {
        this.authorizedEin = authorizedEin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.routeNumber = routeNumber;
    }

    public User() {

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
