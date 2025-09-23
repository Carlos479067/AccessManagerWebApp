package com.example.backend.service;
import com.example.backend.dto.RouteDataDto;
import com.example.backend.model.RouteData;
import com.example.backend.repository.RouteDataRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class RouteDataService {

    private final RouteDataRepository routeDataRepository;

    public RouteDataService(RouteDataRepository routeDataRepository) {
        this.routeDataRepository = routeDataRepository;
    }

    public RouteDataDto getUserRouteInformation(String routeNumber) {
        // Retrieve EIN from database
        RouteData routeData = routeDataRepository.findByRouteNumber(routeNumber);
        //Check if userEin is in database
        if(routeData == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "EIN not found");
        }
        // Create dto object and map route data to it
        RouteDataDto dto = mapRouteData(routeData);
        return dto;
    }

    public RouteDataDto mapRouteData(RouteData routeData) {
        RouteDataDto routeDataDto = new RouteDataDto();

        routeDataDto.setAuthorizedEin(routeData.getAuthorizedEin().getAuthorizedEin());
        routeDataDto.setFlats(routeData.getFlats());
        routeDataDto.setParcels(routeData.getParcels());
        routeDataDto.setSpurs(routeData.getSpurs());
        routeDataDto.setDpsCount(routeData.getDpsCount());
        routeDataDto.setClockInTime(routeData.getClockInTime());
        routeDataDto.setClockBackToOffice(routeData.getClockBackToOffice());
        routeDataDto.setClockOutTime(routeData.getClockOutTime());
        routeDataDto.setClockToStreet(routeData.getClockToStreet());
        routeDataDto.setTotalPackages(routeData.getTotalPackages());
        routeDataDto.setEstimatedOfficeTime(routeData.getEstimatedOfficeTime());
        routeDataDto.setEstimatedReturnTime(routeData.getEstimatedReturnTime());

        return routeDataDto;
    }
}
