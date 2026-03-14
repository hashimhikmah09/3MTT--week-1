import "./style.css"
import { getCurrentWeather, getForecast } from "./weather"

const input = document.getElementById("cityInput") as HTMLInputElement
const button = document.getElementById("searchBtn") as HTMLButtonElement

const currentWeather = document.getElementById("currentWeather")!
const forecastContainer = document.getElementById("forecast")!
const error = document.getElementById("error")!
const recentList = document.getElementById("recentSearches")!

// Search button click
button.addEventListener("click", () => {
  const city = input.value.trim()
  if (!city) return
  loadWeather(city)
  saveRecent(city)
})

// Load weather & forecast
async function loadWeather(city: string) {
  try {
    error.textContent = ""
    const weather = await getCurrentWeather(city)

    currentWeather.innerHTML = `
      <div class="p-4 border rounded bg-white shadow">
        <h2 class="font-bold text-xl mb-1">${weather.name}</h2>
        <p>Temp: ${weather.main.temp}°C</p>
        <p>Humidity: ${weather.main.humidity}%</p>
        <p class="capitalize">${weather.weather[0].description}</p>
      </div>
    `

    const forecast = await getForecast(city)
    forecastContainer.innerHTML = ""

    const daily = forecast.list.filter(item => item.dt_txt.includes("12:00:00"))
    daily.slice(0, 5).forEach(day => {
      forecastContainer.innerHTML += `
        <div class="bg-blue-100 p-3 rounded shadow text-center flex flex-col items-center">
          <p class="font-semibold">${day.dt_txt.split(" ")[0]}</p>
          <p class="text-lg">${day.main.temp}°C</p>
          <p class="capitalize">${day.weather[0].description}</p>
        </div>
      `
    })

  } catch (err: unknown) {
    if (err instanceof Error) error.textContent = err.message
    else error.textContent = "Invalid city name"

    currentWeather.innerHTML = ""
    forecastContainer.innerHTML = ""
  }
}

// Save recent searches to localStorage
function saveRecent(city: string) {
  let searches: string[] = JSON.parse(localStorage.getItem("cities") || "[]")
  if (!searches.includes(city)) searches.unshift(city)
  searches = searches.slice(0, 5)
  localStorage.setItem("cities", JSON.stringify(searches))
  renderRecent()
}

// Delete city from recent searches
function deleteRecent(city: string) {
  let searches: string[] = JSON.parse(localStorage.getItem("cities") || "[]")
  searches = searches.filter(c => c !== city)
  localStorage.setItem("cities", JSON.stringify(searches))
  renderRecent()
}

// Render recent searches with delete for most recent
function renderRecent() {
  const searches: string[] = JSON.parse(localStorage.getItem("cities") || "[]")
  recentList.innerHTML = ""

  searches.forEach((city, index) => {
    const li = document.createElement("li")
    li.className = "flex items-center gap-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"

    // City name clickable
    const citySpan = document.createElement("span")
    citySpan.textContent = city
    citySpan.className = "cursor-pointer flex-1"
    citySpan.onclick = () => loadWeather(city)

    li.appendChild(citySpan)

    // Add delete button for most recent city
    if (index === 0) {
      const deleteBtn = document.createElement("button")
      deleteBtn.textContent = "✕"
      deleteBtn.className = "text-red-500 hover:text-red-700 font-bold"
      deleteBtn.onclick = (e) => {
        e.stopPropagation() // prevent triggering loadWeather
        deleteRecent(city)
      }
      li.appendChild(deleteBtn)
    }

    recentList.appendChild(li)
  })
}

// Load last searched city on page load
const searches: string[] = JSON.parse(localStorage.getItem("cities") || "[]")
if (searches.length > 0) loadWeather(searches[0])
renderRecent()
