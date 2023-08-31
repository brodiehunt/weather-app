

const getWeatherData = async () => {
  
    const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=5751146771b54199bce54112232108&q=london&days=3");
    return response.json();
  
};

export default getWeatherData;
