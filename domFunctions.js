

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
  console.log(data);
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
  console.log('done')
  
}


export {
  displayCurrentWeather
}