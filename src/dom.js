function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export function bindSearchForm(onSearch) {
  const form = document.querySelector("#search-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#location");
    onSearch(input.value.trim());
  });
}

export function renderWeather(weather, unit) {
  const container = document.querySelector("#weather");
  container.textContent = "";

  const card = document.createElement("div");
  card.classList.add("weather-card");

  const title = document.createElement("h2");
  title.textContent = weather.location;

  const temp = document.createElement("p");
  temp.classList.add("temp");
  const value = unit === "C" ? weather.temps : toFahrenheit(weather.temps);
  temp.textContent = `${Math.round(value)} °${unit}`;

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = weather.description;

  card.append(title, temp, description);
  container.appendChild(card);

  if (weather.iconSrc) {
    const img = document.createElement("img");
    img.src = weather.iconSrc;
    img.alt = weather.description;
    img.classList.add("weather-icon");
    card.prepend(img);
  }
}

export function bindUnitToggle(onToggle) {
  document.querySelector("#unit-toggle").addEventListener("click", onToggle);
}

export function setToggleLabel(unit) {
  const next = unit === "C" ? "F" : "C";
  document.querySelector("#unit-toggle").textContent = `Afficher en °${next}`;
}

export function showError(message) {
  const box = document.querySelector("#error");
  box.textContent = message;
}

export function clearWeather() {
  document.querySelector("#weather").textContent = "";
}

export function setTheme(icon) {
  document.body.className = icon ? `weather-${icon}` : "";
}

export function applyTheme(icon) {
  document.body.classList.add(`weather-${icon}`);
}
