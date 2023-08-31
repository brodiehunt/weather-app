
const nightOrDay = (val) => {
  const body = document.querySelector('body');
  const logo = document.querySelector('.logo');
  if (val) {
    body.classList.remove('night');
    logo.src = "/imgs/logo-icon-day.png";
  } else {
    body.classList.add('night');
    logo.src = "/imgs/logo-icon-night.png";
  }
}
const displayCurrentWeather = (data) => {
  // location 
  const currentLocation = document.getElementById('location');
  currentLocation.innerText = data.location;

  // temp 
  const currentTemp = document.getElementById('current-temp');
  currentTemp.innerText = data.temp;
  const currentDesc = document.getElementById('current-desc');
  currentDesc.innerText = data.text;
  const currentLow = document.getElementById('current-low');
  currentLow.innerText = data.tempLow;
  const currentHigh = document.getElementById('current-high');
  currentHigh.innerText = data.tempHigh;

  // Uv
  const currentUV = document.getElementById('current-uv');
  const measure = document.getElementById('current-uv-measure');
  const uvStatement = document.getElementById('uv-statement');
  const indicator = document.querySelector('.indicator');
  currentUV.innerText = data.uv;
  let uvDesc;
  let statement;
  if (data.uv < 3) {
    uvDesc = 'Low';
    statement = "Enjoy the outdoors"
  } else if (data.uv >= 3 && data.uv < 6) {
    uvDesc = 'Moderate';
    statement = 'Wear sun protection!';
  } else if (data.uv >= 6 && data.uv < 8) {
    uvDesc = 'High';
    statement = 'Reduce exposure 10am-4pm';
  } else if (data.uv >= 8 && data.uv < 11) {
    uvDesc = 'Very High';
    statement = 'Very High risk for sun damage';
  } else {
    uvDesc = 'Extreme';
    statement = "Stay Inside!"
  }
  measure.innerText = uvDesc;
  uvStatement.innerText = statement;
  const indicatorScale = data.uv / 14 *100;
  indicator.style.left = `${indicatorScale}%`;

  // humidity
  const currentHumidity = document.getElementById('current-humidity');
  const currentDewpoint = document.getElementById('current-dewpoint');
  currentHumidity.innerText = data.humidity;
  currentDewpoint.innerText = data.dewPoint;

  // sunset 
  const currentSunset = document.getElementById('current-sunset');
  const currentSunrise = document.getElementById('current-sunrise');
  currentSunset.innerText = data.sunset;
  currentSunrise.innerText = data.sunrise;

  // precipitation 
  const currentPrecipitation = document.getElementById('current-precip');
  const currentRainUnitSpan = document.getElementById('current-rain-unit');
  const totalPrecipitation = document.getElementById('current-today-precip');
  currentPrecipitation.innerText = data.precip;
  currentRainUnitSpan.innerText = data.precipUnit;
  totalPrecipitation.innerText = `${data.totalPrecip} ${data.precipUnit}`;
  
  // wind 
  const currentWindDir = document.getElementById('current-wind-dir');
  const currentWindSpeed = document.getElementById('current-wind-speed');
  const directionArrow = document.querySelector('.arrow');
  currentWindDir.innerText = data.wind_dir;
  currentWindSpeed.innerText = `${data.wind} ${data.windUnit}`;
  directionArrow.style.transform = `translate(-50%, -50%) rotate(${data.wind_degree}deg)`;

  // feels like 
  const currentFeelslike = document.getElementById('current-feelslike');
  const feelslikeStatement = document.getElementById('feelslike-statement');
  currentFeelslike.innerText = data.feelslike;
  let feelsStatement;
  if (data.feelslike > data.temp) {
    feelsStatement = 'Feels hotter than it is.'
  } else if (data.feelslike === data.temp) {
    feelsStatement = 'Feels Exactly how it is.'
  } else {
    feelsStatement = 'Feels colder than it is.'
  }
  feelslikeStatement.innerText = feelsStatement;
}

// 24 hour condition data display
const display24HourWeather = (data) => {
  const itemContainer = document.querySelector('.item-container');
  itemContainer.innerHTML = '';
  data.forEach((item) => {
    const hourItem = document.createElement('div');
    hourItem.classList.add('hour-item');

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');
    timeDiv.innerText = item.time;
    
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const icon = document.createElement('img');
    icon.classList.add('icon');
    icon.src = item.path;

    const tempEl = document.createElement('p');
    tempEl.classList.add('temp');
    tempEl.innerText = `${item.temp}°`;

    const descriptionEl = document.createElement('p');
    descriptionEl.classList.add('description');
    descriptionEl.innerText = item.text;

    hourItem.appendChild(timeDiv);
    hourItem.appendChild(infoDiv);
    infoDiv.appendChild(icon);
    infoDiv.appendChild(tempEl);
    infoDiv.appendChild(descriptionEl);
    itemContainer.appendChild(hourItem);
  })
}

// 24 hour wind data display
const display24HourWind = (data) => {
  const itemContainer = document.querySelector('.item-container');
  itemContainer.innerHTML = '';
  data.forEach((item) => {
    const hourItem = document.createElement('div');
    hourItem.classList.add('hour-item');

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');
    timeDiv.innerText = item.time;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const windDirEl = document.createElement('p');
    windDirEl.classList.add('wind-direction');
    windDirEl.innerText = item.windDir;

    const windSpeedEl = document.createElement('p');
    windSpeedEl.classList.add('wind-speed');
    windSpeedEl.innerText = `${item.wind} ${item.unit}`;

    hourItem.appendChild(timeDiv);
    hourItem.appendChild(infoDiv);
    infoDiv.appendChild(windDirEl);
    infoDiv.appendChild(windSpeedEl);
    itemContainer.appendChild(hourItem);
  });
}

// 24 hours precipitation data display
const display24HourPrecip = (data) => {
  const itemContainer = document.querySelector('.item-container');
  itemContainer.innerHTML = '';
  data.forEach((item) => {
    const hourItem = document.createElement('div');
    hourItem.classList.add('hour-item');

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');
    timeDiv.innerText = item.time;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const precipEl = document.createElement('p');
    precipEl.classList.add('precipitation');
    precipEl.innerText = `${item.precip}`;

    const measurementEl = document.createElement('span');
    measurementEl.classList.add('measurement');
    measurementEl.innerText = item.unit;
    

    hourItem.appendChild(timeDiv);
    hourItem.appendChild(infoDiv);
    infoDiv.appendChild(precipEl);
    precipEl.appendChild(measurementEl);
    itemContainer.appendChild(hourItem);
  });
}

// 24 hours UV data display
const display24HourUv = (data) => {
  const itemContainer = document.querySelector('.item-container');
  itemContainer.innerHTML = '';
  data.forEach((item) => {
    const hourItem = document.createElement('div');
    hourItem.classList.add('hour-item');

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');
    timeDiv.innerText = item.time;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const uvEl = document.createElement('p');
    uvEl.classList.add('UV');
    uvEl.innerText = `${item.uv}`;

    const descriptionEl = document.createElement('p');
    descriptionEl.classList.add('UV-description');
    descriptionEl.innerText = item.description;
    

    hourItem.appendChild(timeDiv);
    hourItem.appendChild(infoDiv);
    infoDiv.appendChild(uvEl);
    infoDiv.appendChild(descriptionEl);
    itemContainer.appendChild(hourItem);
  });
}

// 24 hour humidity data display
const display24HourHumidity = (data) => {
  const itemContainer = document.querySelector('.item-container');
  itemContainer.innerHTML = '';
  data.forEach((item) => {
    const hourItem = document.createElement('div');
    hourItem.classList.add('hour-item');

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');
    timeDiv.innerText = item.time;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const humidityEl = document.createElement('p');
    humidityEl.classList.add('humidity');
    humidityEl.innerText = `${item.humidity}`;
    
    const measurementEl = document.createElement('span');
    measurementEl.classList.add('measurement');
    measurementEl.innerText = '%';

    const dewpointEl = document.createElement('p');
    dewpointEl.classList.add('UV-description');
    dewpointEl.innerText = `Dew point is ${item.dewpoint}`;
    

    hourItem.appendChild(timeDiv);
    hourItem.appendChild(infoDiv);
    infoDiv.appendChild(humidityEl);
    humidityEl.appendChild(measurementEl);
    infoDiv.appendChild(dewpointEl);
    itemContainer.appendChild(hourItem);
  });
}

// build single day forcecast
const displaySingleDayForecast = (data) => {
  const dayItem = document.createElement('div');
  dayItem.classList.add('day-item');

  const itemTitle = document.createElement('h3');
  itemTitle.innerText = 'title';
  dayItem.appendChild(itemTitle);

  const flexContainer = document.createElement('div');
  flexContainer.classList.add('flex-row-container');
  dayItem.appendChild(flexContainer);
  const conditionContainer = document.createElement('div');
  conditionContainer.classList.add('condition', 'inline-container');

  // condition
  const conditionIcon = document.createElement('img');
  conditionIcon.src = data.iconPath;

  const conditionDescription = document.createElement('p');
  conditionDescription.classList.add('description');
  conditionDescription.innerText = data.condition;

  conditionContainer.appendChild(conditionIcon);
  conditionContainer.appendChild(conditionDescription);
  flexContainer.appendChild(conditionContainer);

  // temp
  const tempContainer = document.createElement('div');
  tempContainer.classList.add('temperature', 'inline-container');

  const tempIcon = document.createElement('img');
  tempIcon.src = "./imgs/thermometer.png";

  const tempAv = document.createElement('p');
  tempAv.classList.add('temp-av', 'main');
  tempAv.innerText = `${data.avgTemp}°`;

  const tempMax = document.createElement('p');
  tempMax.classList.add('max');
  tempMax.innerText = `Max: ${data.maxTemp}°`;

  const tempMin = document.createElement('p');
  tempMin.classList.add('min');
  tempMin.innerText = `Min: ${data.minTemp}°`;

  tempContainer.appendChild(tempIcon);
  tempContainer.appendChild(tempAv);
  tempContainer.appendChild(tempMin);
  tempContainer.appendChild(tempMax);
  flexContainer.appendChild(tempContainer);

  // Precipitation
  const precipContainer = document.createElement('div');
  precipContainer.classList.add('precipitation', 'inline-container');
  
  const precipIcon = document.createElement('img');
  precipIcon.src = "./imgs/water.png";

  const precipAv = document.createElement('p');
  precipAv.classList.add('precip-av', 'main');
  precipAv.innerText = data.precip;

  const precipMeasure = document.createElement('span');
  precipMeasure.classList.add('measurement');
  precipMeasure.innerText = data.precipUnit;

  precipContainer.appendChild(precipIcon);
  precipContainer.appendChild(precipAv);
  precipAv.appendChild(precipMeasure);

  flexContainer.appendChild(precipContainer)

  // humidity
  const humidityContainer = document.createElement('div');
  humidityContainer.classList.add('inline-container', 'humidity');
  
  const humidityIcon = document.createElement('img');
  humidityIcon.src = "./imgs/humidity.png";

  const humidityAv = document.createElement('p');
  humidityAv.classList.add('humidity-av', 'main');
  humidityAv.innerText = data.humidity;

  const humidityMeasure = document.createElement('span');
  humidityMeasure.classList.add('measurement');
  humidityMeasure.innerText = '%';

  humidityContainer.appendChild(humidityIcon);
  humidityContainer.appendChild(humidityAv);
  humidityAv.appendChild(humidityMeasure);
  flexContainer.appendChild(humidityContainer);

  // UV
  const uvContainer = document.createElement('div');
  uvContainer.classList.add('UV-index', 'inline-container');
  
  const uvIcon = document.createElement('img');
  uvIcon.src = "./imgs/sun.png";

  const uvAv = document.createElement('p');
  uvAv.classList.add('main', 'UV-av');
  uvAv.innerText = data.uv;

  const uvDescription = document.createElement('p');
  uvDescription.classList.add('descr');
  uvDescription.innerText = data.uvDescription;

  uvContainer.appendChild(uvIcon);
  uvContainer.appendChild(uvAv);
  uvContainer.appendChild(uvDescription);
  flexContainer.appendChild(uvContainer);

  // sunrise 
  const sunriseContainer = document.createElement('div');
  sunriseContainer.classList.add('sunrise', 'inline-container');

  const sunriseIcon = document.createElement('img');
  sunriseIcon.src = "./imgs/sunrise.png";

  const sunrise = document.createElement('p');
  sunrise.classList.add('time', 'main');
  sunrise.innerText = data.sunrise;

  sunriseContainer.appendChild(sunriseIcon);
  sunriseContainer.appendChild(sunrise);
  

  // sunset
  const sunsetContainer = document.createElement('div');
  sunsetContainer.classList.add('sunset', 'inline-container');

  const sunsetIcon = document.createElement('img');
  sunsetIcon.src = "./imgs/sunset.png";

  const sunset = document.createElement('p');
  sunset.classList.add('time', 'main');
  sunset.innerText = data.sunset;

  sunsetContainer.appendChild(sunsetIcon);
  sunsetContainer.appendChild(sunset);
  
  const sunsriseSetContainer = document.createElement('div');
  sunsriseSetContainer.appendChild(sunriseContainer);
  sunsriseSetContainer.appendChild(sunsetContainer);
  flexContainer.appendChild(sunsriseSetContainer);

  return dayItem;

}

// build 3 day Forecast display
const display3DayForecast = (data) => {
  const forecastContainer = document.querySelector('.day-container');
  forecastContainer.innerHTML = '';
  const title = document.createElement('h2');
  title.classList.add('title');
  title.innerText = '3 Day Forecast';
  forecastContainer.appendChild(title);
  data.forEach((day) => {
    const dayDiv = displaySingleDayForecast(day);
    forecastContainer.appendChild(dayDiv);
  })
}

export {
  displayCurrentWeather,
  display24HourWeather,
  display24HourWind,
  display24HourPrecip,
  display24HourUv,
  display24HourHumidity,
  display3DayForecast,
  nightOrDay
}