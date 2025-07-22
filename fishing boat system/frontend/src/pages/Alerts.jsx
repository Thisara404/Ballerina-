import { useState, useEffect } from "react";
import Navibar from "../components/Navbar";
import Leftbar from "../components/Sidebar";
import Foot from "../components/Footer";
import Search_icon from "../assets/images/search.png";
import Snowy from "../assets/images/snowy.png";
import Sun from "../assets/images/sun.png";
import Cloudy from "../assets/images/cloudy.png";
import Cloudy1 from "../assets/images/cloudy1.png";
import HumidityIcon from "../assets/images/weather.png";
import WindIcon from "../assets/images/wind-power.png";

const WeatherComponent = ({ onFishingStatusChange }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(localStorage.getItem("defaultCity") || "Gampaha");
  const [defaultCity, setDefaultCity] = useState(localStorage.getItem("defaultCity") || "Gampaha");

  const allIcons = {
    "01d": Sun,
    "01n": Sun,
    "02d": Cloudy,
    "02n": Cloudy,
    "03d": Cloudy,
    "03n": Cloudy,
    "04d": Cloudy,
    "04n": Cloudy,
    "09d": Cloudy1,
    "09n": Cloudy1,
    "10d": Cloudy1,
    "10n": Cloudy1,
    "13d": Snowy,
    "13n": Snowy,
  };

  const evaluateFishingConditions = (weather) => {
    const isWindGood = weather.windspeed < 5;
    const isTempGood = weather.temperature >= 10 && weather.temperature <= 30;
    
    const weatherCode = Object.keys(allIcons).find(
      key => allIcons[key] === weather.icon
    );
    
    const isWeatherGood = !weatherCode?.includes("13") && 
                         !weatherCode?.includes("09") && 
                         !weatherCode?.includes("10");  
    
    const isSafe = isWindGood && isTempGood && isWeatherGood;
    
    // Store the status in localStorage
    localStorage.setItem("fishingStatus", isSafe ? "Safe" : "Unsafe");
    onFishingStatusChange(isSafe ? "Safe" : "Unsafe");

    if (isSafe) {
      return {
        suitable: true,
        message: "Good conditions for fishing! 🎣",
        details: "Low winds, comfortable temperature, and clear weather make it ideal for fishing.",
        className: "bg-green-600"
      };
    } else {
      let issues = [];
      if (!isWindGood) issues.push("high winds");
      if (!isTempGood) issues.push(weather.temperature < 10 ? "too cold" : "too hot");
      if (!isWeatherGood) issues.push("unfavorable weather conditions");
      
      return {
        suitable: false,
        message: "Not ideal for fishing ⚠️",
        details: `Challenging conditions due to ${issues.join(", ")}.`,
        className: "bg-red-600"
      };
    }
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name.");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);

      if (!response.ok) {
        alert("City not found. Please enter a valid city name.");
        return;
      }

      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || Sun;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching the weather data. Please try again.");
    }
  };

  const handleSearch = () => {
    search(city);
  };

  const setAsDefaultCity = () => {
    setDefaultCity(city);
    localStorage.setItem("defaultCity", city);
    alert(`Default city set to ${city}`);
  };

  const handleSetDefaultCity = () => {
    setCity(defaultCity);
    search(defaultCity);
  };

  useEffect(() => {
    search(defaultCity);
  }, [defaultCity]);

  return (
    <div className="flex flex-col items-center p-10 rounded-lg bg-gradient-to-r from-[#030454] to-[#00a5fd] max-w-sm mx-auto">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-12 rounded-full pl-6 text-black bg-gray-200 w-64 text-lg outline-none"
        />
        <img
          src={Search_icon}
          alt="Search"
          className="w-12 p-3 bg-white rounded-full cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      <button
        onClick={setAsDefaultCity}
        className="mt-4 bg-gradient-to-r from-[#0d843e] to-[#cbc805] text-white px-3 py-2 w-full rounded-full font-medium"
      >
        Set as Default City
      </button>

      <button
        onClick={handleSetDefaultCity}
        className="mt-2 bg-gradient-to-r from-[#0b7e33] to-[#f1be04] text-white px-3 py-2 w-full rounded-full font-medium"
      >
        Use Default City ({defaultCity})
      </button>

      {weatherData && (
        <div className="flex flex-col items-center mt-8">
          <img
            src={weatherData.icon}
            alt="Weather Icon"
            className="w-28 mb-8"
          />
          <p className="text-white text-6xl font-bold mb-2">
            {weatherData.temperature}°C
          </p>
          <p className="text-white text-lg">{weatherData.location}</p>
          <div className="flex flex-col items-start mt-4">
            <div className="flex items-center mb-2">
              <img src={HumidityIcon} alt="Humidity" className="w-6 h-6 mr-2" />
              <p className="text-white text-lg">
                Humidity: {weatherData.humidity}%
              </p>
            </div>
            <div className="flex items-center mb-4">
              <img src={WindIcon} alt="Wind Speed" className="w-6 h-6 mr-2" />
              <p className="text-white text-lg">
                Wind Speed: {weatherData.windspeed} m/s
              </p>
            </div>
          </div>

          {weatherData && (
            <div className="w-full mt-4">
              <div className={`p-4 rounded-lg ${evaluateFishingConditions(weatherData).className}`}>
                <h3 className="text-white text-xl font-bold mb-2">
                  {evaluateFishingConditions(weatherData).message}
                </h3>
                <p className="text-white text-sm">
                  {evaluateFishingConditions(weatherData).details}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Alerts = () => {
  // Initialize state with value from localStorage
  const [fishingStatus, setFishingStatus] = useState(
    localStorage.getItem("fishingStatus") || "Unknown"
  );

  const handleFishingStatusChange = (status) => {
    setFishingStatus(status);
    localStorage.setItem("fishingStatus", status);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navibar />
        <div className="flex flex-grow mt-16 bg-gray-200">
          <Leftbar fishingStatus={fishingStatus} />
          <div className="flex-grow p-6 bg-gray-200 sm:ml-64 flex flex-col">
            <h1 className="text-4xl font-extrabold">Safety Alert</h1>
            <WeatherComponent onFishingStatusChange={handleFishingStatusChange} />
          </div>
        </div>
        <div className="mt-auto sm:ml-64">
          <Foot />
        </div>
      </div>
    </>
  );
};

export default Alerts;

