# WelKoln Prototype

First clickable prototype for the Requirements Engineering project.

## Run

Open `index.html` directly in a browser, or run a small local server:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

## Structure

```text
assets/
  welkoln-logo.svg
src/
  app.js
  styles.css
  data/
    mockData.js
index.html
PLAN_MOCK_UP.md
```

## Prototype Notes

- The Traveller and Business sections are in the same mobile app.
- The Admin dashboard is planned as a separate web dashboard, not yet built in this first prototype.
- The map is a dummy static map with a live-location marker near the Cologne Cathedral.
- For a later real map, Leaflet with OpenStreetMap tiles is the safest no-key option. Mapbox or Google Maps would need API keys.
- The red and white visual theme is inspired by Cologne public transport and DB/KVB-style clarity, without copying official logos.
