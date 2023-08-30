

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
  const totalPrecipitation = document.getElementById('current-today-precip');
  currentPrecipitation.innerText = data.precip;
  totalPrecipitation.innerText = data.totalPrecip;
  
  // wind 
  const currentWindDir = document.getElementById('current-wind-dir');
  const currentWindSpeed = document.getElementById('current-wind-speed');
  const directionArrow = document.querySelector('.arrow');
  currentWindDir.innerText = data.wind_dir;
  currentWindSpeed.innerText = data.wind;
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

const displaySingleDayForecast = () => {

}

const display3DayForecast = () => {

}

const changeTemperatureMeasurement = (newTempMes) => {

}

const changeSpeedMeasurement = (newSpeedMes) => {

}

const changeRainMeasurement = (newRainMes) => {

}


export {
  displayCurrentWeather,
  display24HourWeather,
  display24HourWind,
  display24HourPrecip,
  display24HourUv,
  display24HourHumidity
}