import React, { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";

const Weather = () => {
  const { weather, dateBuilder, image } = useContext(WeatherContext);
  return (
    <div>
      <div className=" flex flex-row md:flex-row md:justify-between md:items-center md:content-center md:bg-transparent  md:font-sans">
        <div className="md:flex-col">
          <div className="flex flex-row md:flex md:mb-10 md:mr-12">
            <div className="md:flex-col md:border-r-4 md:border-black">
              <img
                className="w-20 md:w-auto"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt=""
              />
              <div className="font-bold ml-6 md:ml-0 md:font-normal md:text-center md:text-xl md:text-black md:uppercase">
                {weather.weather[0].main}
              </div>
            </div>
            <div class="text-4xl mt-6 ml-10 md:mt-0 md:ml-0 md:text-black md:text-6xl md:ml-4 md:flex md:items-center md:font-bold ">
              <span>{Math.round(weather.main.temp)}</span>
              <span class="text-4xl md:text-5xl">
                <sup>°</sup>
              </span>
            </div>
          </div>

          <div className="ml-6 md:ml-0 font-bold text-center md:text-2xl md:font-semibold md:text-right md:uppercase">
            {dateBuilder(new Date())}
          </div>
          <div className="ml-6 md:ml-0 font-bold md:font-normal md:text-xl md:text-right md:uppercase">
            <span>
              {weather.name},{weather.sys.country}
            </span>
          </div>
        </div>

        <div className="ml-16 mr-6 md:ml-0 md:mr-0 md:m-10 md:mr-16 ">
          <img
            className="w-24 h-24 md:w-64 md:h-64 object-cover rounded-full md:ml-32"
            src={image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Weather;
