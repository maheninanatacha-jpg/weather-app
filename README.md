# Weather App

A fast, minimal weather application. Search any city or country, see current conditions, switch between °C and °F instantly, and watch the page adapt its look to the weather.

**[Live demo](https://YOUR-USERNAME.github.io/weather-app/)** · Built with vanilla JavaScript, Webpack 5 and the Visual Crossing Weather API.

![Weather App screenshot](./screenshot.png)

## Features

- **Location search** for any city or country, with tolerance for small typos (handled by the API).
- **°C / °F toggle** that converts locally, so switching units never triggers a new network request.
- **Dynamic theming:** the page background changes according to current conditions (rain, clear sky, cloudy…).
- **Weather icons** loaded on demand with dynamic imports; unknown conditions degrade gracefully to a card without an icon.
- **User-friendly error handling:** invalid locations and failed requests show a clear message instead of a broken page, and stale results are cleared.

## Tech stack

| Area | Tools |
|---|---|
| Language | JavaScript (ES modules, `async`/`await`, `fetch`) |
| Build | Webpack 5 with separate `common` / `dev` / `prod` configs (`webpack-merge`) |
| Code quality | ESLint, Prettier |
| Data | [Visual Crossing Timeline Weather API](https://www.visualcrossing.com/weather-api/) |
| Hosting | GitHub Pages |

## Architecture

The code is split by responsibility, so each file has one reason to change.

```
src/
├── index.js     Application flow: wires events, state and rendering together
├── api.js       Network layer: calls the API and validates the HTTP response
├── process.js   Data layer: reduces the large API payload to a small, app-specific object
├── dom.js       View layer: the only module that touches the DOM
├── icons.js     Loads weather icons with dynamic imports
└── style.css
```

### Key design decisions

- **Separation of concerns.** The API, data-processing and rendering code never depend on each other directly. Only `index.js` coordinates them, which keeps coupling low and makes each part replaceable.
- **A normalization layer.** `process.js` converts the raw API response into a small object (location, temperature, description, icon). If the API provider changes, only this file needs to be updated.
- **Single source of truth for units.** Temperatures are stored in Celsius and converted only at render time, so the unit toggle is instant and cannot get out of sync with the data.
- **Explicit HTTP error handling.** `fetch` does not reject on 4xx/5xx responses, so the API layer checks `response.ok` and throws, letting the UI handle failures in one place.
- **Consistent state.** On a failed search, the previous weather, theme and icon are cleared, so the interface never shows contradictory information.

## Getting started

**Prerequisites:** Node.js 18 or later and npm.

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/weather-app.git
cd weather-app

# 2. Install dependencies
npm install

# 3. Start the development server (http://localhost:8080)
npm run dev
```

### Other scripts

| Command | Description |
|---|---|
| `npm run build` | Production build into `dist/` |
| `npm run deploy` | Publishes `dist/` to the `gh-pages` branch |
| `npx eslint .` | Lints the code |
| `npx prettier . --check` | Checks formatting |

### API access

The app uses the Visual Crossing Timeline API. If your usage requires an API key, create a free account on their website and set the key in `src/api.js`. Free keys are rate-limited, and anything bundled into a front-end app is visible to users, so never reuse a paid or sensitive key here.

## Roadmap

- [ ] Loading indicator while a request is in flight
- [ ] Multi-day forecast (the data is already returned by the API)
- [ ] Remember the last searched location and unit with `localStorage`
- [ ] Unit tests for the data-processing and conversion functions

## Credits

- Weather data provided by [Visual Crossing](https://www.visualcrossing.com/).
- Weather icons: YOUR-ICON-SOURCE (add the author and license if required).

Built as part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.

## Author

**YOUR NAME** · [GitHub](https://github.com/YOUR-USERNAME) · [LinkedIn](https://www.linkedin.com/in/YOUR-PROFILE/)
