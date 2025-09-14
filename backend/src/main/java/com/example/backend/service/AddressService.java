package com.example.backend.service;

import com.example.backend.dto.AddressDto;
import com.example.backend.model.Address;
import com.example.backend.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public List<AddressDto> routeResults(String route) {
        List<Address> addresses = addressRepository.findByRouteNumber(route);
        List<AddressDto> addressDto = new ArrayList<>();

        for(Address a : addresses) {
            addressDto.add(mapAddress(a));
        }
        return addressDto;
    }

    public List<AddressDto> searchResults(String num, String name, String neighborhood) {

        // Initialize new list
        List<AddressDto> addressDto = new ArrayList<>();

        if(num != null && !num.isEmpty() && name != null && !name.isEmpty()) {
            // Fetch address from repository
            List<Address> streetNumAndName = addressRepository.findByStreetNumberAndStreetNameContainingIgnoreCase(num, name);
            // loop through addresses
            for(Address a : streetNumAndName) {
                // converts each address to dto and stores in list
                addressDto.add(mapAddress(a));
            }
            return addressDto;
        } else if(neighborhood != null && !neighborhood.isEmpty()) {
            List<Address> neighborhoodOnly = addressRepository.findByNeighborhoodContainingIgnoreCase(neighborhood);
            for(Address a : neighborhoodOnly) {
                addressDto.add(mapAddress(a));
            }
            return addressDto;
        }


        return addressDto;
    }

    public AddressDto mapAddress(Address address) {
        AddressDto addressDto = new AddressDto();

        addressDto.setStreetNumber(address.getStreetNumber());
        addressDto.setStreetName(address.getStreetName());
        addressDto.setCityName(address.getCityName());
        addressDto.setZipCode(address.getZipCode());
        addressDto.setGateCode(address.getGateCode());
        addressDto.setMailRoomCode(address.getMailRoomCode());
        addressDto.setLocker_code(address.getLocker_code());
        addressDto.setRouteNumber(address.getRouteNumber());
        addressDto.setNeighborhood(address.getNeighborhood());

        return addressDto;
    }
}