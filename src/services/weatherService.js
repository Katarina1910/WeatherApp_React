import { myaxios as axios } from "../axios";
const APP_ID = "1e7865138195e54c519c2d44051b15b0";

export function findCoordinates(countryCode, city) {
  return axios.get(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "," +
      countryCode +
      "&appId=" +
      APP_ID
  );
}

export function getTemperatureFiveDays(lat, lon, unit) {
  return axios.get(
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=" +
      unit +
      "&appId=" +
      APP_ID
  );
}
