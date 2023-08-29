import getWeatherData from "./apiFunction.js"
import { displayCurrentWeather } from './domFunctions.js';

const formatData = async (units) => {
  const {tempUnit, speedUnit, rainUnit } = units;

  const data = await getWeatherData();
  const currentWeatherData = getCurrentData(data, units);
  displayCurrentWeather(currentWeatherData);
  
  
}

const getCurrentData = (data, units) => {
  const {tempUnit, speedUnit, rainUnit } = units;
  const currentData = data.current;
  
  const {sunrise} = data.forecast.forecastday[0].astro;
  const {sunset} = data.forecast.forecastday[0].astro;

  const { condition: {text}, humidity, uv, wind_dir, wind_degree} = currentData;
  const temp = (tempUnit === 'c') ? currentData.temp_c : currentData.temp_f;
  const tempLow = (tempUnit === 'c') ? data.forecast.forecastday[0].day.mintemp_c : data.forecast.forecastday[0].day.mintemp_f;
  const tempHigh = (tempUnit === 'c') ? data.forecast.forecastday[0].day.maxtemp_c : data.forecast.forecastday[0].day.maxtemp_f;
  const dewPoint = (tempUnit === 'c') ? data.forecast.forecastday[0].hour[0].dewpoint_c : data.forecast.forecastday[0].hour[0].dewpoint_f;
  const feelslike = (tempUnit === 'c') ? currentData.feelslike_c : currentData.feelslike_f;
  const precip = (rainUnit === 'mm') ? currentData.precip_mm : currentData.precip_in;
  const totalPrecip = (rainUnit === 'mm') ? data.forecast.forecastday[0].day.totalprecip_mm : data.forecast.forecastday[0].day.totalprecip_mm;
  const wind = (speedUnit === 'kph') ? currentData.wind_kph : currentData.wind_mph;
  const location = data.location.name;
  const extractedData = {
    text,
    humidity,
    dewPoint,
    uv,
    wind_dir,
    wind_degree,
    temp,
    tempLow,
    tempHigh,
    feelslike,
    precip,
    totalPrecip,
    wind,
    location,
    sunrise,
    sunset
  }
  return extractedData;
}

export {
  formatData
}