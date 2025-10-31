import "normalize.css";
import "./styles.css";
import cardCreator from "./ui.js";

const searchBox = document.getElementById("search-box");
let currentLocation = searchBox.dataset.currentLocation;

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function main() {
  currentLocation ||= "Shiraz";
  const { default: getWeather } = await import("./weather.js");
  const weather = await getWeather(toTitleCase(currentLocation), "metric");
  document.getElementById("cards").replaceChildren();

  if (weather.error) {
    const errorMessage = document.createElement("div");
    errorMessage.id = "error-massage";
    errorMessage.textContent = weather.error;
    document.querySelector("body").appendChild(errorMessage);
    return;
  }

  for (let i = 0; i < 6; i++) {
    weather.setDay(i);
    cardCreator(weather);
  }
}

main();

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  currentLocation = formData.get("search-box");
  main();
});
