// getting real time data from an api

import axios from "axios";

const API_KEY = "29e0385a701b6841e68ca0c87c12cfb9";

export const indianCities = [
  "Kochi, Kerala",
  "Mumbai, Maharashtra",
  "Delhi, Capital",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamilnadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra",
  "Indore, Madhya Pradesh",
  "Thane, Maharashtra",
  "Thodupuzha, Kerala",
  "Alappuzha",
  "Baga, Goa",
  "Kottayam",
];

export const weatherImages = {
  clear: require("../../assets/app-images/clear-sky.png"),
  sunny: require("../../assets/app-images/sunny.png"),
  cloudy: require("../../assets/app-images/clouds.png"),
  overcastCloudy: require("../../assets/app-images/clear-clouds.png"),
  brokenCloud: require("../../assets/app-images/broken-clouds.png"),
  rain: require("../../assets/app-images/rain.png"),
  thunderstorm: require("../../assets/app-images/thunder.png"),
  snow: require("../../assets/app-images/snow.png"),
  mist: require("../../assets/app-images/mist.webp"),
  lightning: require("../../assets/app-images/lighting.png"),
  heavyRain: require("../../assets/app-images/heavy-rain.png"),
  lightRain: require("../../assets/app-images/rainy-cloud.png"),
};

export function getWeatherImageKey(
  description: string
): keyof typeof weatherImages {
  description = description.toLowerCase();
  if (description.includes("clear")) return "clear";
  if (description.includes("sunny")) return "sunny";
  if (description.includes("overcast cloud")) return "overcastCloudy";
  if (description.includes("broken cloud")) return "brokenCloud";
  if (description.includes("cloud")) return "cloudy";
  if (description.includes("moderate rain")) return "rain";
  if (description.includes("light rain")) return "lightRain";
  if (description.includes("heavy rain")) return "heavyRain";
  if (description.includes("thunderstorm")) return "thunderstorm";
  if (description.includes("snow")) return "snow";
  if (description.includes("mist") || description.includes("fog"))
    return "mist";
  if (description.includes("lightning")) return "lightning";

  return "clear";
}

export interface WeatherForecast {
  id: string;
  date: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface HourlyForecast {
  time: string;
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("en-US", options);
}

export function getDailyForecast(
  forecast: WeatherForecast[]
): WeatherForecast[] {
  const dailyForecast: WeatherForecast[] = [];
  const seenDates = new Set();

  for (const item of forecast) {
    const date = item.date.split(",")[1].trim();
    if (!seenDates.has(date)) {
      seenDates.add(date);
      dailyForecast.push({
        ...item,
        id: `daily-${item.date}`,
      });
    }
  }

  return dailyForecast;
}

export function getTodayForecast(weatherData: WeatherData): HourlyForecast[] {
  const today = new Date();
  const todayString = today.toDateString();

  return weatherData.forecast
    .filter((forecast) => {
      const forecastDate = new Date(forecast.date);
      return forecastDate.toDateString() === todayString;
    })
    .map((forecast, index) => {
      const forecastDate = new Date(forecast.date);
      return {
        id: `forecast-${index}-${forecastDate.getDate()}`,
        time: forecastDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: forecastDate.toDateString().slice(0, 10),
        temperature: forecast.temperature,
        description: forecast.description,
        icon: forecast.icon,
      };
    });
}

export interface WeatherData {
  dailyForecast: WeatherForecast[];
  city: string;
  currentWeather: WeatherForecast;
  forecast: WeatherForecast[];
  todayForecast: HourlyForecast[];
}

export async function getCityWeather(
  city: string
): Promise<WeatherData | null> {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},in&appid=${API_KEY}&units=metric`
    );
    const data = response.data;

    const forecast = data.list.map((item: any) => ({
      id: `hourly-${item.dt}`,
      date: new Date(item.dt * 1000).toDateString(),
      temperature: item.main.temp,
      description: item.weather[0].description,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      icon: item.weather[0].icon,
    }));

    const weatherData: WeatherData = {
      city: city,
      currentWeather: {
        id: `current-${data.list[0].dt}`,
        date: formatDate(data.list[0].dt),
        temperature: data.list[0].main.temp,
        description: data.list[0].weather[0].description,
        humidity: data.list[0].main.humidity,
        windSpeed: data.list[0].wind.speed,
        icon: data.list[0].weather[0].icon,
      },
      forecast: forecast,
      todayForecast: [],
      dailyForecast: [],
    };

    weatherData.todayForecast = getTodayForecast(weatherData);

    return weatherData;
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    return null;
  }
}

export async function getWeatherForCities(): Promise<WeatherData[]> {
  const weatherData: WeatherData[] = [];

  for (const city of indianCities) {
    const data = await getCityWeather(city);
    if (data) {
      weatherData.push(data);
    }
  }

  return weatherData;
}
