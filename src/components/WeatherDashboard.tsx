import { useState, useEffect } from "react";
import { Cloud, Sun, Droplets, Wind, Thermometer, CloudRain, CloudSun, MapPin } from "lucide-react";

type WeatherData = {
  temp: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: typeof Sun;
  forecast: { day: string; temp: number; icon: typeof Sun; condition: string }[];
  farmTip: string;
};

const mockWeather: WeatherData = {
  temp: 32,
  humidity: 68,
  windSpeed: 12,
  condition: "Partly Cloudy",
  icon: CloudSun,
  forecast: [
    { day: "Tomorrow", temp: 34, icon: Sun, condition: "Sunny" },
    { day: "Wed", temp: 30, icon: CloudRain, condition: "Rain" },
    { day: "Thu", temp: 28, icon: CloudRain, condition: "Heavy Rain" },
    { day: "Fri", temp: 31, icon: CloudSun, condition: "Partly Cloudy" },
    { day: "Sat", temp: 33, icon: Sun, condition: "Clear" },
  ],
  farmTip: "Light rain expected Wednesday — ideal for transplanting seedlings. Hold off on pesticide spraying until Thursday.",
};

export default function WeatherDashboard() {
  const [weather] = useState<WeatherData>(mockWeather);
  const [location, setLocation] = useState("Pune, Maharashtra");

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-sky to-primary p-6 text-primary-foreground">
        <div className="flex items-center gap-2 mb-4 text-sm opacity-90">
          <MapPin className="size-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold">{weather.temp}°C</div>
            <div className="text-lg mt-1 opacity-90">{weather.condition}</div>
          </div>
          <weather.icon className="size-20 opacity-80" />
        </div>
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <Droplets className="size-4" />
            <span className="text-sm">{weather.humidity}% Humidity</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="size-4" />
            <span className="text-sm">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* Farm Tip */}
      <div className="mx-4 -mt-4 bg-sun-light border border-sun/30 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <span className="text-lg">🌾</span>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Farming Tip</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{weather.farmTip}</p>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-2">
          {weather.forecast.map((day) => (
            <div key={day.day} className="bg-card border rounded-xl p-3 text-center">
              <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
              <day.icon className="size-6 mx-auto mb-2 text-sky" />
              <div className="text-sm font-semibold">{day.temp}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        <div className="bg-card border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="size-4 text-destructive" />
            <span className="text-xs font-medium text-muted-foreground">Soil Temp (est.)</span>
          </div>
          <div className="text-xl font-bold">28°C</div>
          <div className="text-xs text-primary mt-1">Good for most crops</div>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="size-4 text-sky" />
            <span className="text-xs font-medium text-muted-foreground">Rain Chance</span>
          </div>
          <div className="text-xl font-bold">75%</div>
          <div className="text-xs text-sky mt-1">Wednesday peak</div>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="size-4 text-sun" />
            <span className="text-xs font-medium text-muted-foreground">UV Index</span>
          </div>
          <div className="text-xl font-bold">6</div>
          <div className="text-xs text-sun mt-1">High — cover seedlings</div>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="size-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Irrigation Need</span>
          </div>
          <div className="text-xl font-bold">Low</div>
          <div className="text-xs text-primary mt-1">Rain covers demand</div>
        </div>
      </div>
    </div>
  );
}
