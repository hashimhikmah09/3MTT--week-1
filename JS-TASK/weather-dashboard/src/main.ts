import "./style.css"
import { getCurrentWeather, getForecast } from "./weather"

const input = document.getElementById("cityInput") as HTMLInputElement
const button = document.getElementById("searchBtn") as HTMLButtonElement

const currentWeather = document.getElementById("currentWeather")!
const forecastContainer = document.getElementById("forecast")!
const error = document.getElementById("error")!
const recentList = document.getElementById("recentSearches")!

button.addEventListener("click", () => {
  const city = input.value.trim()
  if (!city) return

  loadWeather(city)
  saveRecent(city)
})

async function loadWeather(city: string) {

  try {

    error.textContent = ""

    const weather = await getCurrentWeather(city)

    currentWeather.innerHTML = `
      <div class="p-4 border rounded">
        <h2 class="font-bold text-lg">${weather.name}</h2>
        <p>Temp: ${weather.main.temp}°C</p>
        <p>Humidity: ${weather.main.humidity}%</p>
        <p>${weather.weather[0].description}</p>
      </div>
    `

    const forecast = await getForecast(city)

    forecastContainer.innerHTML = ""

    const daily = forecast.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    )

    daily.slice(0, 5).forEach(day => {

      forecastContainer.innerHTML += `
        <div class="bg-gray-200 p-2 rounded text-center">
          <p>${day.dt_txt.split(" ")[0]}</p>
          <p>${day.main.temp}°C</p>
        </div>
      `
    })

  } catch {

    error.textContent = "Invalid city name."

    currentWeather.innerHTML = ""
    forecastContainer.innerHTML = ""

  }
}
function saveRecent(city: string) {

  let searches: string[] =
    JSON.parse(localStorage.getItem("cities") || "[]")

  if (!searches.includes(city)) {
    searches.unshift(city)
  }

  searches = searches.slice(0, 5)

  localStorage.setItem("cities", JSON.stringify(searches))

  renderRecent()
}

function renderRecent() {

  const searches: string[] =
    JSON.parse(localStorage.getItem("cities") || "[]")

  recentList.innerHTML = ""

  searches.forEach(city => {

    const li = document.createElement("li")

    li.textContent = city
    li.className = "cursor-pointer"

    li.onclick = () => loadWeather(city)

    recentList.appendChild(li)

  })
}

renderRecent()
