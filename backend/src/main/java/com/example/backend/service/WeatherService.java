package com.example.backend.service;

import com.example.backend.model.Weather;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${openweather.api.key}")
    private String apiKey;

    public WeatherService() {

    }

    public Weather getWeather() {

        RestTemplate restTemplate = new RestTemplate();
        // Weather object to map JSON response to weather
        Weather weather = new Weather();

        //Build url with apiKey and hardcode city since it will stay the same
        String getUrl = "https://api.openweathermap.org/data/2.5/weather?q=San Antonio&appid=" + apiKey + "&units=imperial";

        //Send the GET request
        weather = restTemplate.getForObject(getUrl, Weather.class);

        //Check if API sent unusable data
        if(weather == null) {
            throw new RuntimeException("Bad Response");
        }

        return weather;
    }
}
