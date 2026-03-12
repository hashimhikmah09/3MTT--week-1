export interface WeatherResponse {
  name: string
  main: {
    temp: number
    humidity: number
  }
  weather: {
    description: string
  }[]
}

export interface ForecastItem {
  dt_txt: string
  main: {
    temp: number
  }
}

export interface ForecastResponse {
  list: ForecastItem[]
}
