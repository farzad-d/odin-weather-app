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
const searchBox = document.getElementById("search-box");
let currentLocation = searchBox.dataset.currentLocation;
const loading = document.getElementById("loading");
const message = document.getElementById("message");

async function main() {
  message.textContent = "";
  currentLocation ||= "London";
  loading.classList.remove("hidden");

  try {
    const { default: getWeather } = await import("./weather.js");
    const weather = await getWeather(
      toTitleCase(currentLocation),
      currentUnitGroup
    );
    document.getElementById("cards").replaceChildren();

    for (let i = 0; i < 6; i++) {
      weather.setDay(i);
      cardCreator(weather);
    }
  } catch (err) {
    document.getElementById("cards").replaceChildren();
    message.textContent = err.message;
    console.error(err);
  } finally {
    loading.classList.add("hidden");
  }
}

// PROMISE-BASED VERSION
// function main() {
//   message.textContent = "";
//   currentLocation ||= "London";
//   loading.classList.remove("hidden");

//   return import("./weather.js")
//     .then((module) => {
//       const getWeather = module.default;
//       return getWeather(toTitleCase(currentLocation), currentUnitGroup);
//     })
//     .then((weather) => {
//       document.getElementById("cards").replaceChildren();
//       for (let i = 0; i < 6; i++) {
//         weather.setDay(i);
//         cardCreator(weather);
//       }
//     })
//     .catch((err) => {
//       document.getElementById("cards").replaceChildren();
//       message.textContent = err?.message || "Something went wrong!";
//       console.error(err);
//     })
//     .finally(() => {
//       loading.classList.add("hidden");
//     });
// }

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  currentLocation = formData.get("search-box");
  form.reset();
  main();
});

const unitRadios = document.querySelectorAll("input[name='unit-group']");
unitRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.checked) {
      currentUnitGroup = e.target.value;
      main();
    }
  });
});

main();
