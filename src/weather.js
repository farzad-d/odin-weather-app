const API_KEY = "27JLA8N2LVW4F2667X4PCYQDZ";

async function getWeather(location, unit) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}&unitGroup=${unit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City ${location} not found!`);
    }
    const data = await response.json();
    return {
      location: data.address,
      date: data.days[0].datetime,
      temp: data.days[0].temp,
      conditions: data.days[0].conditions,
      humidity: data.days[0].humidity,
      icon: data.days[0].icon,
      unit,
      setDay(num) {
        this.date = data.days[num].datetime;
        this.temp = data.days[num].temp;
        this.conditions = data.days[num].conditions;
        this.humidity = data.days[num].humidity;
        this.icon = data.days[num].icon;
      },
    };
  } catch (err) {
    console.error("Failed to fetch weather data:", err.message);
    throw err;
  }
}

// PROMISE-BASED VERSION
// function getWeather(location, unit) {
//   const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}&unitGroup=${unit}`;

//   return fetch(url)
//     .then((response) => {
//       if (!response.ok) throw new Error(`City ${location} not found!`);
//       return response.json();
//     })
//     .then((data) => {
//       return {
//         location: data.address,
//         date: data.days[0].datetime,
//         temp: data.days[0].temp,
//         conditions: data.days[0].conditions,
//         humidity: data.days[0].humidity,
//         icon: data.days[0].icon,
//         unit,
//         setDay(num) {
//           this.date = data.days[num].datetime;
//           this.temp = data.days[num].temp;
//           this.conditions = data.days[num].conditions;
//           this.humidity = data.days[num].humidity;
//           this.icon = data.days[num].icon;
//         },
//       };
//     })
//     .catch((err) => {
//       throw err;
//     });
// }

export default getWeather;

// SAMPLE API JSON
//* https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london/?key=27JLA8N2LVW4F2667X4PCYQDZ&unitGroup=metric
