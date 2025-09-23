package com.example.backend.controller;
import com.example.backend.dto.RouteDataDto;
import com.example.backend.model.User;
import com.example.backend.service.RouteDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RouteDataController {

    private final RouteDataService routeDataService;

    public RouteDataController(RouteDataService routeDataService) {
        this.routeDataService = routeDataService;
    }

    @GetMapping("/data/{routeNumber}")
    public RouteDataDto getRouteData(@PathVariable String routeNumber) {
        return routeDataService.getUserRouteInformation(routeNumber);
    }
}
