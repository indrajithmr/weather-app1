import React, { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";

const Forcast = () => {
  const { forcast, dateBuilder } = useContext(WeatherContext);
  let fdata = [];

  for (let i = 1; i < 7; i++) {
    let fobj = {
      image: `http://openweathermap.org/img/wn/${forcast.daily[i].weather[0].icon}@2x.png`,
      temp: forcast.daily[i].temp.morn,
      weather: forcast.daily[i].weather[0].main,
      date: dateBuilder(new Date(new Date().setDate(new Date().getDate() + i))),
    };
    fdata.push(fobj);
  }

  return (
    <div>
      {fdata.map((data) => {
        return (
          <div className="bg-purple-300 border-t-2 border-gray-600 flex flex-row md:bg-transparent md:border-t-0 md:flex  md:p-2 md:font-mono">
            <div className="flex flex-row md:flex-col md:border-r-2 md:border-black">
              <img className="w-16 md:w-16" src={data.image} alt="" />
              <div className="mt-8 md:mt-0 ml-6 md:ml-0 md:text-center md:text-sm md:text-bold md:uppercase">
                {data.weather}
              </div>
            </div>

            <div className="mt-8 md:mt-0 ml-6 md:ml-0 md:uppercase md:text-center md:text-xl md:text-extrabold md:tracking-widest vertical-writing">
              {data.date.slice(0, 3)}
            </div>

            <div class="text-xl mt-8 md:mt-0 ml-6 md:ml-0 md:text-black md:text-3xl md:flex md:items-center md:font-bold ">
              <span>{Math.round(data.temp)}</span>
              <span class="md:text-3xl">
                <sup>°</sup>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Forcast;
