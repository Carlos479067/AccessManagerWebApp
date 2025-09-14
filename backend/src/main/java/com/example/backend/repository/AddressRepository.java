package com.example.backend.repository;

import com.example.backend.model.Address;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AddressRepository extends CrudRepository<Address, Integer> {

    List<Address> findByStreetNumberAndStreetNameContainingIgnoreCase(String num, String name);
    List<Address> findByNeighborhoodContainingIgnoreCase(String neighborhood);
    List<Address> findByRouteNumber(String route);
}
