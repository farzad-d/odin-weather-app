import getWeatherIcon from "./icons.js";

function dateHandler(weatherDate) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const toISO = (date) => date.toISOString().split("T")[0];
  const todayISO = toISO(today);
  const tomorrowISO = toISO(tomorrow);

  if (weatherDate === todayISO) return "Today";
  if (weatherDate === tomorrowISO) return "Tomorrow";
  return weatherDate;
}

function cardCreator(weatherData) {
  const cards = document.getElementById("cards");
  const card = document.createElement("div");
  card.classList.add("card");
  cards.appendChild(card);

  const icon = document.createElement("svg");
  icon.innerHTML = getWeatherIcon(weatherData);
  card.appendChild(icon);

  const weatherInfo = document.createElement("ul");
  weatherInfo.id = "weather-info";
  card.appendChild(weatherInfo);

  const location = document.createElement("li");
  location.textContent = weatherData.location;

  const date = document.createElement("li");
  date.textContent = dateHandler(weatherData.date);

  let unit = "°C";
  if (weatherData.unit === "us") unit = "°F";

  const temp = document.createElement("li");
  temp.textContent = `Temp: ${weatherData.temp} ${unit}`;

  const humidity = document.createElement("li");
  humidity.textContent = `Humidity: ${weatherData.humidity}%`;

  const conditions = document.createElement("li");
  conditions.textContent = weatherData.conditions;

  weatherInfo.append(location, date, temp, humidity, conditions);
}

export default cardCreator;
