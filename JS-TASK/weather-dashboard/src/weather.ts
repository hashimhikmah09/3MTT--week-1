import type { WeatherResponse, ForecastResponse } from "./types"

const API_KEY = "4756c83a848a5a360dec733f62c1fa25"

export async function getCurrentWeather(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )

  if (!res.ok) {
    throw new Error("City not found")
  }

  const data: WeatherResponse = await res.json()
  return data
}

export async function getForecast(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  )

  const data: ForecastResponse = await res.json()
  return data
}
