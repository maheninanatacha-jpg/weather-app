import "./style.css";
import { fetchWeather } from "./api.js";
import { processWeather } from "./process.js";
import {
  bindSearchForm,
  bindUnitToggle,
  renderWeather,
  setToggleLabel,
  showError,
  clearWeather,
  setTheme,
  applyTheme,
} from "./dom.js";
import { getIcon } from "./icons.js";

let currentWeather = null;
let unit = "C";

function refresh() {
  console.log("refresh :", currentWeather, unit);
  setTheme(currentWeather?.icon);
  applyTheme(currentWeather?.icon);
  if (currentWeather) {
    renderWeather(currentWeather, unit);
    setTheme(null);
  }
}

bindSearchForm(async (location) => {
  console.log("A. recherche :", location);
  try {
    const data = await fetchWeather(location);
    console.log("B. données reçues");
    const weather = processWeather(data);
    console.log("C. données traitées :", weather);
    const iconSrc = await getIcon(weather.icon);
    console.log("D. icône :", iconSrc);
    currentWeather = { ...weather, iconSrc };
    applyTheme(currentWeather.icon);
    showError("");
    refresh();
  } catch (error) {
    console.log("E. ERREUR :", error);
    currentWeather = null;
    clearWeather();
    showError("Lieu introuvable. Vérifie l'orthographe et réessaie.");
  }
});

bindUnitToggle(() => {
  unit = unit === "C" ? "F" : "C";
  setToggleLabel(unit);
  refresh(); // un seul appel : retire le doublon
});
