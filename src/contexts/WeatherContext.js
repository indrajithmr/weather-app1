import React, { useState, createContext } from "react";
import axios from "axios";
const api = {
  key: "8e8b41a0369f6b36a85fdb588f6a0b2a",
  base: "https://api.openweathermap.org/data/2.5/",
};

const imageapi = {
  key: "2d3bd66eeamsh98879a2f6074085p1c3183jsn1848b500da52",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const WeatherContext = createContext();

const WeatherContextProvider = (props) => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forcast, setForcast] = useState({});
  const [image, setImage] = useState({});

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()].slice(0, 3);
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const imagecall = (quer) => {
    const axios = require("axios");

    axios({
      method: "GET",
      url: "https://bing-image-search1.p.rapidapi.com/images/search",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
        "x-rapidapi-key": "2d3bd66eeamsh98879a2f6074085p1c3183jsn1848b500da52",
        useQueryString: true,
      },
      params: {
        q: quer,
      },
    })
      .then((response) => {
        console.log(response.data.value[0].contentUrl);
        console.log(response.data.value[0].webSearchUrl);
        setImage(response.data.value[0].thumbnailUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const mountGeo = (lat, lon) => {
    fetch(
      `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        imagecall(`${result.name}`);
      });

    console.log(query);
    fetch(
      `${api.base}onecall?lat=${lat}&lon=${lon}&units=metric&exclude={minutely,hourly}&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setForcast(result);
        setQuery("");
      });
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          // let location = query.replace(/ /g, "%20");

          fetch(
            `${api.base}onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&units=metric&exclude={minutely,hourly}&appid=${api.key}`
          )
            .then((r) => r.json())
            .then((resp) => {
              setForcast(resp);
            });

          // fetch(
          //   `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=${location}&safeSearch=false`,
          //   {
          //     method: "GET",
          //     headers: {
          //       "x-rapidapi-host":
          //         "contextualwebsearch-websearch-v1.p.rapidapi.com",
          //       "x-rapidapi-key":
          //         "2d3bd66eeamsh98879a2f6074085p1c3183jsn1848b500da52",
          //     },
          //   }
          // )
          //   .then((response) => {
          //     console.log(response);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });

          // const axios = require("axios");

          // axios({
          //   method: "GET",
          //   url: "https://bing-image-search1.p.rapidapi.com/images/search",
          //   headers: {
          //     "content-type": "application/octet-stream",
          //     "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
          //     "x-rapidapi-key":
          //       "2d3bd66eeamsh98879a2f6074085p1c3183jsn1848b500da52",
          //     useQueryString: true,
          //   },
          //   params: {
          //     q: query,
          //   },
          // })
          //   .then((response) => {
          //     console.log(response.data.value[0].contentUrl);
          //     console.log(response.data.value[0]);
          //     setImage(response.data.value[0].thumbnailUrl);
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
          imagecall(`${query}`);
          setQuery("");
        });
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        dateBuilder,
        mountGeo,
        search,
        setQuery,
        imagecall,
        weather,
        forcast,
        image,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
