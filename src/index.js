import "normalize.css";
import "./styles.css";
import cardCreator from "./ui.js";

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

let currentUnitGroup = "metric";

const unitRadios = document.querySelectorAll("input[name='unit-group']");
unitRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.checked) {
      currentUnitGroup = e.target.value;
      main();
    }
  });
});

const searchBox = document.getElementById("search-box");
let currentLocation = searchBox.dataset.currentLocation;

async function main() {
  currentLocation ||= "Shiraz";
  const { default: getWeather } = await import("./weather.js");
  const weather = await getWeather(
    toTitleCase(currentLocation),
    currentUnitGroup
  );
  document.getElementById("cards").replaceChildren();

  const message = document.getElementById("message");
  if (weather.error) {
    message.textContent = weather.error;
    return;
  } else {
    message.textContent = "";
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
  form.reset();
  main();
});
