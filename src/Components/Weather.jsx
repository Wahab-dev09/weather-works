import React from 'react'
import './Weather.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());
    const errors = {};
    if (!formObj.location) {
      errors.location = "Location is required";
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      setLocation(formObj.location);
      e.target.reset();
    }
  };
  useEffect(() => {
    if (location) {
      fetchWeather(location);
    }
  }, [location]);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const fetchWeather = async (location) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`
      );
      setLoading(true);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const weatherObj = await response.json();
      setWeatherData(weatherObj);
    } catch (error) {
      console.error("Fetch weather data failed:", error);
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };

  const getDynamicStyles = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return {
          backgroundImage: `${import.meta.env.BASE_URL}sun.webp`,
          imagePosition: { top: '-40px', right: '0', width: '90px' },
          background : 'linear-gradient(to bottom right, #ddc780, #e99f8b)',
          main: ['#1a1a1a','#242424','#313131']
        };
      case 'partly cloudy':
        return {
          backgroundImage: `${import.meta.env.BASE_URL}partlycloudy.webp`,
          imagePosition: { top: '-38px', left: '-17px', transform: 'rotateY(180deg)', width: '120px' },
          background : 'linear-gradient(to bottom right, #93a6ff,#fdca87)',
          main: ['#1a1a1a','#242424','#313131']
        };
      case 'rain':case 'light drizzle':case 'patchy light rain with thunder':case 'moderate or heavy rain shower':case 'moderate or heavy rain with thunder':
        return {
          backgroundImage: `${import.meta.env.BASE_URL}rain.webp`,
          imagePosition: { top: '-45px', right: '-17px', width: '120px' },
          background : 'linear-gradient(to bottom right, #93a6ff, #5688ca)',
          main: ['#1a1a1a','#242424','#313131']
        };
      case 'light rain':case 'patchy light rain':case 'light rain shower':case 'moderate rain':case 'patchy rain nearby':case 'moderate rain at times':
        return {
          backgroundImage: `${import.meta.env.BASE_URL}lightrain.webp`,
          imagePosition: { top: '-50px', right: '-20px', width: '120px' },
          background : 'linear-gradient(to bottom right, #88c7fa, #8f9ef1)',
          main: ['#1a1a1a','#242424','#313131']
        };
      case 'clear':
        return {
          backgroundImage: '',
          imagePosition: '',
          background : 'linear-gradient(to bottom right, #677ddd,#bbfff9)',
          main: ['#1a1a1a','#242424','#313131']
        };
      case 'mist':case 'fog':case 'freezing fog':case 'cloudy':
        return {
          backgroundImage: `${import.meta.env.BASE_URL}mist.webp`,
          imagePosition: { top: '-54px', right: '-10px', width: '140px' },
          background : 'linear-gradient(to bottom right, #756de0, #bbd8ff)',
          main: ['#1a1a1a','#242424','#313131']
        };
      case 'overcast':
        return {
          backgroundImage: `${import.meta.env.BASE_URL}overcast.webp`,
          imagePosition: { top: '-60px', right: '0', width: '130px' },
          background : 'linear-gradient(to bottom right, #1b1b1b, #2e2e2e)',
          main: ['white','#c9c9c9','#b8b8b8']
        };
      case 'heavy snow':case 'blizzard':case 'moderate snow':case 'light snow':case 'light snow showers':case 'moderate or heavy snow showers':
        return {
          backgroundImage: `${import.meta.env.BASE_URL}snow.webp`,
          imagePosition: { top: '-50px', left: '-10px', width: '120px' },
          background : 'linear-gradient(to bottom right, #677ddd, #bbd8ff)',
          main: ['#1a1a1a','#242424','#313131']
        };
      default:
        return {
          backgroundImage: '',
          imagePosition: { top: '', left: '' },
          background : 'linear-gradient(to bottom right, #677ddd, #bbd8ff)',
          main: ['#1a1a1a','#242424','#313131']
        };
    }
  };

  const dynamicStyles = weatherData ? getDynamicStyles(weatherData.current.condition.text) : {
    backgroundImage: '',
    background : 'linear-gradient(to bottom right, #677ddd, #bbd8ff)',
    main: ['#1a1a1a','#242424','#313131']
  };

  const { backgroundImage, background,main } = dynamicStyles;
  const animateWeatherChange = {opacity: 1, background: weatherData ? getDynamicStyles(weatherData.current.condition.text).background : 'linear-gradient(to bottom right, #677ddd, #bbd8ff)',};
  const specificHours = [3, 6, 9, 12, 15, 18, 21];
  return (
      <motion.div
        initial={{ opacity: 1, background: 'linear-gradient(to bottom right, #677ddd, #bbd8ff)' }}
        animate={animateWeatherChange}
        transition={{ duration: 0.6 }}
        className="App"
        style={{background: background}}
      >
      <div className="app-inner-frame">
        <div className="box1">
          <form onSubmit={HandleSubmit}>
            <input className={`${error.location ? "red" : "ok"}`} type="text" placeholder='Enter Location' name='location' />
            <button type='submit' value='submit'><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill={main[1]}><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg></button>
          </form>
          {loading?<div className="loader"><div className="circle"></div><div className="circle"></div><div className="circle"></div></div> : weatherData ? (
            <>
              <div className="location"><span style={{color: main[0]}}>{weatherData.location.name},</span><span style={{color: main[0]}}>{weatherData.location.country}</span></div>
              <div className="temperature"><span style={{color: main[0]}}>{weatherData.current.temp_c}° C</span></div>
              <div className="condition"><motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.2 }} style={{color: main[1]}}>{weatherData.current.condition.text}</motion.span><img decoding='async' fetchpriority='high' style={{ opacity: 0.75 ,position: 'absolute', ...getDynamicStyles(weatherData?.current.condition.text).imagePosition }} src={backgroundImage} alt="" /></div>
              <div className="day-date"><span style={{color: main[2]}}>Weather Works</span><span style={{color: main[2]}}>Date : {weatherData.location.localtime.split(' ')[0]}</span></div>
            </>
          ) : (
            <div className='loading-search'>Search any region</div>
          )}
          <div className="reports">
            <div><div><p style={{color: main[0]}}>Cloud</p><svg xmlns="http://www.w3.org/2000/svg" height='23' width='23' fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={main[0]}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg></div><div className="rep-text">{weatherData ? <span style={{color: main[1]}}>{weatherData.current.cloud} %</span> : <span>--</span>}</div></div>
            <div><div><p style={{color: main[0]}}>Humidity</p><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" strokeWidth="1.6" viewBox="0 0 24 24" fill={main[0]}><path d="M12 22c4.636 0 8-3.468 8-8.246C20 7.522 12.882 2.4 12.579 2.185a1 1 0 0 0-1.156-.001C11.12 2.397 4 7.503 4 13.75 4 18.53 7.364 22 12 22zm-.001-17.74C13.604 5.55 18 9.474 18 13.754 18 17.432 15.532 20 12 20s-6-2.57-6-6.25c0-4.29 4.394-8.203 5.999-9.49z"></path></svg></div><div className="rep-text">{weatherData ? <span style={{color: main[1]}}>{weatherData.current.humidity} %</span> : <span>--</span>}</div></div>
            <div><div><p style={{color: main[0]}}>UV-index</p><svg xmlns="http://www.w3.org/2000/svg" height='23' width='23' fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke={main[0]}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg></div><div className="rep-text">{weatherData ? <span style={{color: main[1]}}>{weatherData.current.uv}</span> : <span>--</span>}</div></div>
            <div><div><p style={{color: main[0]}}>Feels like</p><svg xmlns="http://www.w3.org/2000/svg" height='23' width='23' fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke={main[0]}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" /></svg></div><div className="rep-text">{weatherData ? <span style={{color: main[1]}}>{weatherData.current.feelslike_c}° C</span> : <span>--</span>}</div></div>
            <div><div><p style={{color: main[0]}}>Wind</p><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={main[0]}><path d="M13 5.5C13 3.57 11.43 2 9.5 2 7.466 2 6.25 3.525 6.25 5h2c0-.415.388-1 1.25-1 .827 0 1.5.673 1.5 1.5S10.327 7 9.5 7H2v2h7.5C11.43 9 13 7.43 13 5.5zm2.5 9.5H8v2h7.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5c-.862 0-1.25-.585-1.25-1h-2c0 1.475 1.216 3 3.25 3 1.93 0 3.5-1.57 3.5-3.5S17.43 15 15.5 15z"></path><path d="M18 5c-2.206 0-4 1.794-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2H2v2h16c2.206 0 4-1.794 4-4s-1.794-4-4-4zM2 15h4v2H2z"></path></svg></div><div className="rep-text">{weatherData ? <span style={{color: main[1]}}>{weatherData.current.wind_mph}mph</span> : <span>--</span>}</div></div>
            <div><div><p style={{color: main[0]}}>Rain</p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={main[0]}><path d="M8 13h2v4H8zm0 5h2v2H8zm3-3h2v4h-2zm0 5h2v2h-2zm3-7h2v4h-2zm0 5h2v2h-2z"></path><path d="M18.944 10.112C18.507 6.67 15.56 4 12 4 9.244 4 6.85 5.611 5.757 8.15 3.609 8.792 2 10.819 2 13c0 2.757 2.243 5 5 5v-2c-1.654 0-3-1.346-3-3 0-1.403 1.199-2.756 2.673-3.015l.581-.103.192-.559C8.149 7.273 9.895 6 12 6c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-1v2h1c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z"></path></svg></div><div className="rep-text">{weatherData ? <span style={{color: main[1]}}>{weatherData.forecast.forecastday[0].day.daily_chance_of_rain} %</span> : <span>--</span>}</div></div>
          </div>
        </div>
        <div className="box2">
          <div className="today-update-head" style={{color: main[1]}}>Today Update</div>
          <div className="updates">
            {specificHours.map(hourIndex => {
              const hourData = weatherData ? weatherData.forecast.forecastday[0].hour[hourIndex] : null;
              return (
                <div key={hourIndex}>
                  <div className="update-time">
                    <span style={{color: main[0]}}>{weatherData ? <span>{hourData.temp_c}° C</span> : <span>--° C</span>}</span>
                    <span style={{color: main[1]}}>{weatherData ? <span>{new Date(hourData.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span> : <span>-- --</span>}</span>
                  </div>
                  <p>
                    <span style={{color: main[2]}}>{weatherData ? <span>{hourData.condition.text}</span> : <span>--</span>}</span>
                    {weatherData ? <img width='30px' src={hourData.condition.icon} alt="" /> : <span></span>}
                  </p>
                  <p style={{color: main[2]}}>Feels like {weatherData ? <span>{hourData.feelslike_c}° C</span> : <span></span>}</p>
                  <p className='update-last' style={{color: main[2]}}>Rain chances {weatherData ? <span>{hourData.chance_of_rain} %</span> : <span></span>}</p>
                </div>
              );
            })}
          </div>
              <div className="tommorow-update-head" style={{color: main[1]}}>Tomorrow Update</div>
          {loading?<div className="loader2"><div className="circle"></div><div className="circle"></div><div className="circle"></div></div> : weatherData ? (
            <>
              <div className="tomorrow-data">
                <div className="temperature" style={{color: main[0]}}><span>{weatherData.forecast.forecastday[1].day.mintemp_c}° C</span></div>
                <div className="condition"><span style={{color: main[1]}}>{weatherData.forecast.forecastday[1].day.condition.text}</span><img loading='lazy' decoding='async' width='45px' src={weatherData.forecast.forecastday[1].day.condition.icon} alt="Weather" /></div>
                <span style={{color: main[1]}}><div>Rain</div>{weatherData.forecast.forecastday[1].day.daily_chance_of_rain}%</span>
              </div>
            </>
          ) : (
            <div className='sec-search-text'>No results</div>
          )
          }
        </div>
      </div>
    </motion.div >
  )
}

export default Weather
