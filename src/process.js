export function processWeather(data) {
  return {
    location: data.resolvedAddress,
    temps: data.currentConditions.temp,
    description: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
  };
}
