export async function fetchWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  return response.json();
}
