package com.example.backend.service;

import com.example.backend.dto.AddressDto;
import com.example.backend.model.Address;
import com.example.backend.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address addAddress(AddressDto addressDto) {

        Address address = new Address();

        if(addressDto.getCityName() == null || addressDto.getZipCode() == null || addressDto.getRouteNumber() == null) {
            throw new IllegalArgumentException("City name, Zip code, and Route number are required");
        }

        address.setStreetNumber(addressDto.getStreetNumber());
        address.setStreetName(addressDto.getStreetName());
        address.setCityName(addressDto.getCityName());
        address.setZipCode(addressDto.getZipCode());
        address.setGateCode(addressDto.getGateCode());
        address.setLocker_code(addressDto.getLocker_code());
        address.setMailRoomCode(addressDto.getMailRoomCode());
        address.setNeighborhood(addressDto.getNeighborhood());
        address.setRouteNumber(addressDto.getRouteNumber());

        addressRepository.save(address);
        return address;
    }

    public Address deleteAddress(AddressDto addressDto) {
        // hold the address that gets deleted
        Address deletedAddress = null;

        if(!addressDto.getStreetNumber().isEmpty() && !addressDto.getStreetName().isEmpty()) {
            // Find all addresses in repository that match the street number and name
            List<Address> removeAddr = addressRepository.findByStreetNumberAndStreetNameContainingIgnoreCase(addressDto.getStreetNumber(), addressDto.getStreetName());
            // Throw exception if no matches found in database
            if(removeAddr.isEmpty()) {
                throw new NoSuchElementException("No matching address found for deletion");
            }
            // Get the first match from the list
            deletedAddress = removeAddr.get(0);
            // Delete address from database
            addressRepository.delete(deletedAddress);
        } else if (!addressDto.getNeighborhood().isEmpty()) {
            // Find all addresses in repository that match neighborhood name
            List<Address> removeNeighborhood = addressRepository.findByNeighborhoodContainingIgnoreCase(addressDto.getNeighborhood());
            // Throw exception if no matches found in database
            if(removeNeighborhood.isEmpty()) {
                throw new NoSuchElementException("No matching neighborhood found for deletion");
            }
            // Get the first match from the list
            deletedAddress = removeNeighborhood.get(0);
            // Delete address from database
            addressRepository.delete(deletedAddress);
        }
        return deletedAddress;
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