"use client";
import Image from "next/image";
import Head from "next/head";
import axios from 'axios'
import { useState } from "react";
import {BsSearch} from 'react-icons/bs'
import cityData from '/home/nguyenhoangphuc-22521129/project/weather-app/static/filtered_cities.json';
import Weather from "./components/Weather";
import logo from '/home/nguyenhoangphuc-22521129/project/weather-app/static/weather.gif'

export default function Home() {

  const [city, setCity] = useState('Tỉnh An Giang') // Set default city
  const [weather, setWeather] = useState('')
  const [loading, setLoading] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f5c7892a21bf36712b2ac5363097941`
  // const time = new Date();
  // console.log("time", time)
  //@ts-ignore  
  const fetchWeather = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.get(url)
      .then((response) => {
        setWeather(response.data)
        // console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]"></div>
      <Image 
        src='https://p1.pxfuel.com/preview/541/660/987/above-the-clouds-clouds-plane-view.jpg'
        layout='fill'
        objectFit='cover'
        alt="Weather background"
        priority
      />

      <div className="absolute top-4 left-4 z-10">
        <Image 
          src={logo} 
          alt='Weather logo' 
          className="rounded-xl border-2 border-black" 
          width={110} 
          height={110} 
        />
      </div>

      {/* Search */}
      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10'>
          <form
            onSubmit={fetchWeather}
            className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'
          >
            <input
                onChange={(e) => setCity(e.target.value)}
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
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>

        {weather.main && <Weather data={weather} />}
    </div>
  );
}
