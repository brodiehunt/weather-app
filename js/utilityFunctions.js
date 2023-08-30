import getWeatherData from "./apiFunction.js"
import { displayCurrentWeather, 
        display24HourWeather, 
        display24HourWind, 
        display24HourPrecip,
        display24HourUv,
        display24HourHumidity,
        display3DayForecast 
      } from './domFunctions.js';

const formatData = async (units) => {
  const {tempUnit, speedUnit, rainUnit } = units;

  const data = await getWeatherData();
  const currentWeatherData = extractCurrentData(data, units);
  // const next24HourData = extract24HourWeather(data, units);
  // const next24HourWind = extract24HourWind(data, units);
  // const next24HourPrecip = extract24HourPrecip(data, units);
  // const next24HourUv = extract24HourUv(data);
  const next24HourHumidity = extract24HourHumidity(data, units);
  const next3DayData = extract3DayData(data, units);
  console.log(next3DayData);

  
  displayCurrentWeather(currentWeatherData);
  // display24HourWeather(next24HourData);
  // display24HourWind(next24HourWind);
  // display24HourPrecip(next24HourPrecip);
  // display24HourUv(next24HourUv);
  display24HourHumidity(next24HourHumidity);
  display3DayForecast(next3DayData);

  return data;
  
}

const extractCurrentData = (data, units) => {
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

const extract3DayData = (data, units) => {
  const { tempUnit, rainUnit } = units;
  const forecastDayData = data.forecast.forecastday;

  const neededData = forecastDayData.map((singleDay) => {
    const singleDayData = {};
    const { day: {maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, avgtemp_c, avgtemp_f,
    totalprecip_mm, totalprecip_in, avghumidity, uv, condition: {text, icon}},
    astro: { sunrise, sunset}} = singleDay;
    
    if (tempUnit === 'c') {
      singleDayData.maxTemp = maxtemp_c;
      singleDayData.minTemp = mintemp_c;
      singleDayData.avgTemp = avgtemp_c
    } else {
      singleDayData.maxTemp = maxtemp_f;
      singleDayData.minTemp = mintemp_f;
      singleDayData.avgTemp = avgtemp_f;
    }


    singleDayData.precip = (rainUnit === 'mm') ? totalprecip_mm : totalprecip_in;
    singleDayData.precipUnit = rainUnit;
    singleDayData.humidity = avghumidity;
    singleDayData.uv = uv;
    if (uv < 3) {
      singleDayData.uvDescription = 'Low';
    } else if (uv < 6) {
      singleDayData.uvDescription = 'Moderate';
    } else if (uv < 8) {
      singleDayData.uvDescription = "High"
    } else if (uv < 10) {
      singleDayData.uvDescription = "Very High";
    } else {
      singleDayData.uvDescription = "Extreme";
    }
    singleDayData.iconPath = getIconPath(icon);
    singleDayData.condition = text;
    singleDayData.sunset = sunset.slice(1, 5);
    singleDayData.sunrise = sunrise.slice(1, 5);
    return singleDayData;
  })
  return neededData;
}

const extract24HourWeather = (data, units) => {
  const { tempUnit } = units
  const forecastDayData = data.forecast.forecastday;
  const next24Hours = extractHourSegments(forecastDayData)
  
  const neededData = next24Hours.map((obj) => {
    let neededObj = {};
    // need to pull out the time, icon path, temp, text
    const {time, condition: { text, icon }, temp_c, temp_f} = obj;
    // time in format 00:00;
    neededObj.time = time.slice(time.length - 5);
    neededObj.text = text;
    // path in format '/night/398.png'
    neededObj.path = getIconPath(icon);
  
    neededObj.temp = (tempUnit === 'c') ? temp_c : temp_f;
    return neededObj;
  })

  return neededData;
  
}

// 24 hour wind data
const extract24HourWind = (data, units) => {
  const { speedUnit } = units
  const forecastDayData = data.forecast.forecastday;
  const next24Hours = extractHourSegments(forecastDayData);
  const neededData = next24Hours.map((obj) => {
    let windData = {};

    const { wind_mph, wind_kph, wind_dir, time } = obj;
    windData.wind = (speedUnit === 'kph') ? wind_kph : wind_mph;
    windData.windDir = wind_dir;
    windData.time = time.slice(time.length - 5);
    windData.unit = speedUnit;
    return windData;
  })

  return neededData;
}

// 24 hour precipitation data
const extract24HourPrecip = (data, units) => {
  const {rainUnit} = units;
  const forecastDayData = data.forecast.forecastday;
  const next24Hours = extractHourSegments(forecastDayData);
  const neededData = next24Hours.map((obj) => {
    const precipData = {};
    const {precip_mm, precip_in, time} = obj;
    precipData.time = time.slice(time.length -5);
    precipData.precip = (rainUnit === 'mm') ? precip_mm : precip_in;
    precipData.unit = rainUnit;
    return precipData;
  })
  return neededData;
}

// 24 hour UV data 
const extract24HourUv = (data) => {
  const forecastDayData = data.forecast.forecastday;
  const next24Hours = extractHourSegments(forecastDayData);
  const neededData = next24Hours.map((obj) => {
    const uvData = {};
    const { uv, time } = obj;
    uvData.time = time.slice(time.length - 5);
    uvData.uv = uv;
    if (uv < 3) {
      uvData.description = 'Low';
    } else if (uv < 6) {
      uvData.description = 'Moderate';
    } else if (uv < 8) {
      uvData.description = "High"
    } else if (uv < 10) {
      uvData.description = "Very High";
    } else {
      uvData.description = "Extreme";
    }
    return uvData;
  })
  return neededData;
}

// 24 hour humidity 
const extract24HourHumidity = (data, units) => {
  const { tempUnit } = units;
  const forecastDayData = data.forecast.forecastday;
  const next24Hours = extractHourSegments(forecastDayData);
  const neededData = next24Hours.map((obj) => {
    const humidityData = {};
    const { time, humidity, dewpoint_c, dewpoint_f } = obj;
    humidityData.time = time.slice(time.length -5);
    humidityData.humidity = humidity;
    humidityData.dewpoint = (tempUnit === 'c') ? dewpoint_c : dewpoint_f;
    return humidityData;
  })
  return neededData;
}



// pass this function 'forecastday' array
const extractHourSegments = (data) => {
  // current hour (also index we need)
  const { hour } = getCurrentTime();
  // console.log('hour extract', hour)
  
  // extract 48 hours worth of data
  const today24Hours = data[0].hour;
  const tomorrow24Hours = data[1].hour;
  // get data from now to end of the day
  const restOfToday = today24Hours.splice(hour, today24Hours.length);
  // get data from start of tomorrow to 24 hours from now
  const startOfTomorrow = tomorrow24Hours.splice(0, hour);
  // array of next 24 hours of data over two days
  const next24Hours = restOfToday.concat(startOfTomorrow);
  
  return next24Hours
}

// builds icon src path based on url provided
const getIconPath = (url) => {
  const lastIndex = url.lastIndexOf('/');
    const secondLastIndex = url.lastIndexOf('/', lastIndex - 1);
    let path = url.slice(secondLastIndex);
    path = `./imgs${path}`;
    return path;
}

// Gets current time
const getCurrentTime = () => {
  const now = new Date();
  
  const dayOfWeek = now.toLocaleString('en-US', { weekday: 'short' });
  const month = now.toLocaleString('en-US', { month: 'short' });  
  const day = now.getDate();
  const dateString = `${dayOfWeek} ${day} ${month}`;
  const hour = now.getHours();
  
  return {hour, dateString};
}



export {
  formatData
}