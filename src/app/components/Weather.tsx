"use client";
import Image from 'next/image';
import React from 'react';
import { WeatherRespone } from '@/app/page';

const Weather = ({ data }: {
    data: WeatherRespone
}) => {
    return (
        <div className='relative flex flex-col justify-between max-w-[500px] w-full h-[85vh] m-auto p-4 text-gray-300 z-10'>
            <div className='relative flex mx-auto pt-10'>
                <div className='flex flex-col items-center'>
                    <Image
                        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt='/'
                        width='100'
                        height='100'
                    />
                    <p className='mx-10 text-2xl'>{data.weather[0].main}</p>
                </div>
                <p className='text-9xl'>{(data.main.temp - 273.15).toFixed(0)}&#176;</p>  
            </div>
            <div className='bg-black/40 relative p-8 rounded-md'>
                <p className='text-2xl text-center pb-6'>Weather in {data.name}</p>
                <div className='flex justify-between text-center'>
                    <div>
                        <p className='font-bold text-2xl'>{(data.main.feels_like - 273.15).toFixed(0)}&#176;</p>
                        <p className='text-xl'>Feels Like</p>
                    </div>
                    <div>
                        <p className='font-bold text-2xl'>{data.main.humidity}%</p>
                        <p className='text-xl'>Humidity</p>
                    </div>
                    <div>
                        <p className='font-bold text-2xl'>{data.wind.speed.toFixed(0)} MPH</p>
                        <p className='text-xl'>Winds</p>
                    </div>
                </div>
            </div>    
        </div>
    );
  };
  
  export default Weather;