
const getWeatherData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        let errorData = await response.json();

        switch (errorData.error.code) {
          case '1006':
            alert('No location found. Please use a different location');
            break;
          case '9999':
            let retryResponse = await fetch(url);
            if (!retryResponse.ok) {
              alert("Internal application error. Try again later.")
            } else {
              let data = await retryResponse.json();
              return data;
            }
          break;
          default:
            alert(`Error: ${errorData.error.message}`);
            break
        };

      } else {
        let data = await response.json();
        return data;
      }
    } catch (err) {
      console.error(`Unexpected err: ${err}`);
      alert('An error occured. Please try again later');
    }
    

    
  
  
};

export default getWeatherData;
