package com.example.backend.repository;
import com.example.backend.model.RouteData;
import org.springframework.data.repository.CrudRepository;

public interface RouteDataRepository extends CrudRepository<RouteData, Long> {

    RouteData findByRouteNumber(String routeNumber);
}
