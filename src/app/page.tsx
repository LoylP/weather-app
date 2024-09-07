"use client";
import Image from "next/image";
import axios from 'axios'
import { useState, useEffect } from "react";
import {BsSearch} from 'react-icons/bs'
import cityData from 'static/filtered_cities.json';
import Weather from "./components/Weather";
import logo from 'static/weather.gif'
import Loading from "./components/Loading"
import day from 'static/day.gif'
import sunset from 'static/sunset.gif'
import night from 'static/night.gif'
import rainy from 'static/rainy.gif'
import Time from "./components/Time";

interface WeatherMain {
  feels_like: number
  humidity: number
  temp: number
}

interface WeatherWind {
  speed: number
}

interface WeatherSys {
  country: string
}

export interface WeatherRespone {
  name: string
  main: WeatherMain
  wind: WeatherWind
  weather: Array<
    {
      description: string
      main: string
      icon: string
    }
  >
  sys: WeatherSys
}

export default function Home() {
  const [city, setCity] = useState<string>('') // Set default city
  const [weather, setWeather] = useState<WeatherRespone>()
  const [loading, setLoading] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);


  const getBackgroundImage = () => {
    let hour = currentTime.getHours();
    if (weather && weather.sys.country !== 'VN') {
      hour = (hour + 12) % 24;
    }
    
    if (weather?.weather[0].main === 'Rain') return rainy;
    if (hour >= 4 && hour < 17) return day;
    if (hour >= 17 && hour < 19) return sunset;
    return night;
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f5c7892a21bf36712b2ac5363097941`
  const fetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) return; // Prevent fetching with empty city name
    setLoading(true);
    try {
      const response = await axios.get(url);
      setWeather(response.data);
      console.log(weather)
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return <Loading/>
  } else {
    return (
      <div className="relative h-screen w-full">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 z-[1]"></div>
        <Image 
          src={getBackgroundImage()}
          layout='fill'
          objectFit='cover'
          alt="Weather background"
          priority
        />
  
        <div className="absolute top-4 right-4 z-10 hidden md:block">
          <Image 
            src={logo} 
            alt='Weather logo' 
            className="rounded-xl border-2 border-black" 
            width={110} 
            height={110} 
          />
        </div>
        <div className="absolute top-8 left-6 z-10 hidden md:block">
          <Time data={weather} />
        </div>
  
        {/* Search */}
        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10'>
            <form
              onSubmit={fetchWeather}
              className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'
            >
              <input
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  className='bg-transparent border-none text-white focus:outline-none text-2xl w-full'
                  type='text'
                  placeholder='Search city'
                  list="city-list"
                />
                <datalist id="city-list">
                  {cityData.map((city) => (
                    <option key={city.id} value={city.name} />
                  ))}
                </datalist>
              <button type="submit">
                <BsSearch size={20} />
              </button>
            </form>
          </div>
          
          {weather && weather.main && <Weather data={weather} />}
      </div>
    );
  }  
}