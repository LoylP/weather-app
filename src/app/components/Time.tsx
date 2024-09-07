"use client";
import React, { useState, useEffect } from 'react';
import { WeatherRespone } from '@/app/page';

const Time = ({ data }: { data?: WeatherRespone }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const getAdjustedHours = () => {
        let hours = currentTime.getHours();
        if (data && data.sys.country !== 'VN') {
            hours = (hours + 12) % 24;
        }
        return hours.toString().padStart(2, '0');
    };

    return (
        <div className='justify-items-center'>
            <div className='font-mono text-3xl text-center opacity-60'>
                {days[currentTime.getDay()]}, {currentTime.getDate()} {months[currentTime.getMonth()]}
            </div>
            <div className='font-sans text-7xl opacity-70'>
                {getAdjustedHours()}:{currentTime.getMinutes().toString().padStart(2, '0')}:{currentTime.getSeconds().toString().padStart(2, '0')}
            </div>
        </div>
    );
};

export default Time;