import React, { useContext, useEffect } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import Forcast from "./Forcast";
import Weather from "./Weather";

const Main = () => {
  const { weather, forcast, mountGeo, image, imagecall } = useContext(
    WeatherContext
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      mountGeo(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return (
    <div className="mt-8 md:mt-0 flex flex-col-reverse md:flex-row">
      <div className="md:flex-col md:w-1/4 md:m-8 md:p-4">
        <div className="bg-indigo-400 block mt-6 pb-2 text-3xl font-semibold text-center md:hidden">
          Forcast
        </div>
        {typeof forcast.daily != "undefined" ? <Forcast /> : ""}
      </div>
      <div className="md:w-3/4 md:p-2 md:justify-between md:items-center md:content-center md:flex">
        <div className="bg-indigo-400 block mb-6 pb-2 text-3xl font-semibold text-center md:hidden">
          Weather Today
        </div>
        {typeof weather.main != "undefined" ? <Weather /> : ""}
      </div>
    </div>
  );
};

export default Main;
