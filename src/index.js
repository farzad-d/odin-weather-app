import "normalize.css";
import "./styles.css";

const API_KEY = "27JLA8N2LVW4F2667X4PCYQDZ";

async function getWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  } catch (err) {
    console.error("Failed!", err);
  }
}

getWeather("london");

//* https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london/?key=27JLA8N2LVW4F2667X4PCYQDZ
