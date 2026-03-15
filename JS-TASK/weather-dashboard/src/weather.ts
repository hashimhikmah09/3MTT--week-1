// Import TypeScript types that define the structure of the API responses
// These types help TypeScript understand the shape of the data returned
// from the weather API.
import type { WeatherResponse, ForecastResponse } from "./types"


// API key used to authenticate requests to the OpenWeather API

const API_KEY = "4756c83a848a5a360dec733f62c1fa25 "


/**
 * Fetches the current weather data for a specific city.
 *
 * This function sends a request to the OpenWeather API
 * and retrieves weather information such as temperature,
 * humidity, and weather description.
 *
 * @param city - The name of the city to fetch weather data for
 * @returns Promise containing the current weather data
 * @throws Error if the city is not found or the request fails
 */
export const getCurrentWeather = async (city: string): Promise<WeatherResponse> => {

  // Send request to the OpenWeather API
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )

  // Check if the request was successful
  // If not, throw an error that will be handled in the UI
  if (!res.ok) {
    throw new Error("City not found")
  }

  // Convert the API response to JSON and type it as WeatherResponse
  const data: WeatherResponse = await res.json()

  // Return the weather data
  return data
}



/**
 * Fetches the 5-day weather forecast for a specific city.
 *
 * The OpenWeather forecast API returns weather data in
 * 3-hour intervals for the next 5 days.
 *
 * @param city - The name of the city to fetch forecast data for
 * @returns Promise containing forecast weather data
 */
export const getForecast = async (city: string): Promise<ForecastResponse> => {

  // Send request to the OpenWeather forecast API
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  )

  if (!res.ok) {
    throw new Error("Forecast data not available")
  }

  // Convert the API response to JSON
  const data: ForecastResponse = await res.json()

  // Return forecast data
  return data
}
