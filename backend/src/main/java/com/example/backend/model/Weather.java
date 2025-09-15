package com.example.backend.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Weather {

    @JsonProperty("name")
    private String cityName;
    @JsonProperty("dt")
    private Long timestamp;
    @JsonProperty("weather")
    private List<WeatherCondition> weather;
    @JsonProperty("main")
    private Main main;

    public Weather() {

    }

    public Weather(String cityName, Long timestamp, List<WeatherCondition> weather) {
        this.cityName = cityName;
        this.timestamp = timestamp;
        this.weather = weather;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public List<WeatherCondition> getWeather() {
        return weather;
    }

    public void setWeather(List<WeatherCondition> weather) {
        this.weather = weather;
    }

    //------------------------------------------------------------------------

    public static class Main {
        @JsonProperty("temp")
        private double temperature;
        private String humidity;

        public Main(double temperature, String humidity) {
            this.temperature = temperature;
            this.humidity = humidity;
        }

        public double getTemperature() {
            return temperature;
        }

        public void setTemperature(double temperature) {
            this.temperature = temperature;
        }

        public String getHumidity() {
            return humidity;
        }

        public void setHumidity(String humidity) {
            this.humidity = humidity;
        }
    }

    //--------------------------------------------------------------------------

    public static class WeatherCondition {

        private String main;
        private String icon;

        public WeatherCondition(String main, String icon) {
            this.main = main;
            this.icon = icon;
        }

        public String getMain() {
            return main;
        }

        public void setMain(String main) {
            this.main = main;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }
    }
}
