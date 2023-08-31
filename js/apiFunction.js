
const getWeatherData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.error.code === '1006') {
          alert('No location found. Please use a different location');
          return null; 
        }
        if (errorData.error.code === '9999') {
          const retryResponse = await fetch(url);
          if (!retryResponse.ok) {
            alert("Internal application error. Try again later.")
            return null;
          } 
          const data = await retryResponse.json();
          return data;
        } 
        alert(`Error: ${errorData.error.message}`);
        return null;
      }
      const data = await response.json();
      return data;

    } catch (err) {
      console.error(`Unexpected err: ${err}`);
      alert('An error occured. Please try again later');
      return null;
    }
};

export default getWeatherData;
