package com.example.backend.controller;

import com.example.backend.dto.AddressDto;
import com.example.backend.service.AddressService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/results")
    public List<AddressDto> searchResults(@RequestParam(required = false) String num, @RequestParam(required = false) String name, @RequestParam(required = false) String neighborhood) {
        return addressService.searchResults(num, name, neighborhood);
    }
}