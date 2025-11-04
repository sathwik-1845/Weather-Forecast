// src/WeatherAPI.js
export default class WeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "http://api.weatherapi.com/v1/current.json";
  }

  async getWeather(city) {
    try {
      const response = await fetch(
        `${this.baseUrl}?q=${city}&key=d2017d90d0a74a18be1152652252910&aqi=yes`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      return {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
