package com.example.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class RouteData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String routeNumber;
    private int dpsCount;
    private int flats;
    private int parcels;
    private int spurs;
    private int totalPackages;
    // Get both date and time
    private LocalDateTime clockInTime;
    private LocalDateTime clockToStreet;
    private LocalDateTime clockBackToOffice;
    private LocalDateTime clockOutTime;
    private LocalDateTime estimatedOfficeTime;
    private LocalDateTime estimatedReturnTime;

    public RouteData(Long id, LocalDateTime estimatedReturnTime, LocalDateTime estimatedOfficeTime, LocalDateTime clockOutTime, LocalDateTime clockBackToOffice, LocalDateTime clockToStreet, LocalDateTime clockInTime, int totalPackages, int spurs, int parcels, int flats, int dpsCount, String routeNumber) {
        this.id = id;
        this.estimatedReturnTime = estimatedReturnTime;
        this.estimatedOfficeTime = estimatedOfficeTime;
        this.clockOutTime = clockOutTime;
        this.clockBackToOffice = clockBackToOffice;
        this.clockToStreet = clockToStreet;
        this.clockInTime = clockInTime;
        this.totalPackages = totalPackages;
        this.spurs = spurs;
        this.parcels = parcels;
        this.flats = flats;
        this.dpsCount = dpsCount;
        this.routeNumber = routeNumber;
    }

    public RouteData() {

    }

    public String getRouteNumber() {
        return routeNumber;
    }

    public void setRouteNumber(String routeNumber) {
        this.routeNumber = routeNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getEstimatedReturnTime() {
        return estimatedReturnTime;
    }

    public void setEstimatedReturnTime(LocalDateTime estimatedReturnTime) {
        this.estimatedReturnTime = estimatedReturnTime;
    }

    public LocalDateTime getEstimatedOfficeTime() {
        return estimatedOfficeTime;
    }

    public void setEstimatedOfficeTime(LocalDateTime estimatedOfficeTime) {
        this.estimatedOfficeTime = estimatedOfficeTime;
    }

    public LocalDateTime getClockOutTime() {
        return clockOutTime;
    }

    public void setClockOutTime(LocalDateTime clockOutTime) {
        this.clockOutTime = clockOutTime;
    }

    public LocalDateTime getClockBackToOffice() {
        return clockBackToOffice;
    }

    public void setClockBackToOffice(LocalDateTime clockBackToOffice) {
        this.clockBackToOffice = clockBackToOffice;
    }

    public LocalDateTime getClockToStreet() {
        return clockToStreet;
    }

    public void setClockToStreet(LocalDateTime clockToStreet) {
        this.clockToStreet = clockToStreet;
    }

    public LocalDateTime getClockInTime() {
        return clockInTime;
    }

    public void setClockInTime(LocalDateTime clockInTime) {
        this.clockInTime = clockInTime;
    }

    public int getTotalPackages() {
        return totalPackages;
    }

    public void setTotalPackages(int totalPackages) {
        this.totalPackages = totalPackages;
    }

    public int getSpurs() {
        return spurs;
    }

    public void setSpurs(int spurs) {
        this.spurs = spurs;
    }

    public int getParcels() {
        return parcels;
    }

    public void setParcels(int parcels) {
        this.parcels = parcels;
    }

    public int getFlats() {
        return flats;
    }

    public void setFlats(int flats) {
        this.flats = flats;
    }

    public int getDpsCount() {
        return dpsCount;
    }

    public void setDpsCount(int dpsCount) {
        this.dpsCount = dpsCount;
    }

}
