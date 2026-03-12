# Weather Dashboard App

A simple Weather Dashboard built with **TypeScript** and **Tailwind CSS** that allows users to search for a city and view current weather conditions along with a 5-day forecast.

---

## Features

* Search for weather by city name
* Display **current temperature, humidity, and weather conditions**
* Show a **5-day weather forecast**
* Error handling for invalid city names
* Recent searches saved using **localStorage**
* Responsive UI styled with **Tailwind CSS**
* Type safety using **TypeScript interfaces**

---

## Technologies Used

* TypeScript
* Tailwind CSS
* Vite
* OpenWeatherMap API
* HTML5
* LocalStorage

---

## Project Structure

```
weather-dashboard
│
├── index.html
├── README.md
├── tailwind.config.js
├── package.json
│
└── src
    ├── main.ts
    ├── weather.ts
    ├── types.ts
    └── style.css
```

---

## Installation and Setup

### 1. Clone the repository


### 2. Navigate to the project directory

```
cd weather-dashboard
```

### 3. Install dependencies

```
npm install
```

### 4. Run the development server

```
npm run dev
```

Open the browser and visit:

```
http://localhost:5173
```

---

## API Configuration

This project uses the **OpenWeatherMap API**.

1. Create a free account at https://openweathermap.org/
2. Generate an API key.
3. Replace the placeholder in `weather.ts`:

```
const API_KEY = "YOUR_API_KEY";
```

---

## How It Works

1. The user enters a city name in the search bar.
2. The application sends a request to the OpenWeatherMap API.
3. Current weather and forecast data are returned.
4. The data is displayed dynamically in the UI.
5. The searched city is saved in **localStorage** for quick access later.

---

## Bonus Feature

Recent searches are stored in the browser using **localStorage**, allowing users to quickly access previously searched cities.

---

## Future Improvements

* Add weather icons
* Add loading spinner
* Improve responsive design
* Add geolocation to detect the user's location
* Add dark mode

---

## Author

**Hikmah Hashim**
