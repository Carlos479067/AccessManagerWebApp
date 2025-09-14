package com.example.backend.dto;

public class AddressDto {

    private String streetNumber;
    private String streetName;
    private String cityName;
    private String zipCode;
    private String gateCode;
    private String mailRoomCode;
    private String locker_code;
    private String routeNumber;
    private String neighborhood;


    public AddressDto() {

    }

    public AddressDto(String streetNumber, String streetName, String cityName, String zipCode, String gateCode, String mailRoomCode, String locker_code, String routeNumber, String neighborhood) {
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.cityName = cityName;
        this.zipCode = zipCode;
        this.gateCode = gateCode;
        this.mailRoomCode = mailRoomCode;
        this.locker_code = locker_code;
        this.routeNumber = routeNumber;
        this.neighborhood = neighborhood;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getGateCode() {
        return gateCode;
    }

    public String getRouteNumber() {
        return routeNumber;
    }

    public void setRouteNumber(String routeNumber) {
        this.routeNumber = routeNumber;
    }

    public void setGateCode(String gateCode) {
        this.gateCode = gateCode;
    }

    public String getLocker_code() {
        return locker_code;
    }

    public void setLocker_code(String locker_code) {
        this.locker_code = locker_code;
    }

    public String getMailRoomCode() {
        return mailRoomCode;
    }

    public void setMailRoomCode(String mailRoomCode) {
        this.mailRoomCode = mailRoomCode;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }
}