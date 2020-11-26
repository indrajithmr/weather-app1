import React from "react";
import "./App.css";
import WeatherContextProvider from "./contexts/WeatherContext";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <WeatherContextProvider>
        <div className="md:shadow-2xl md:rounded-lg md:mt-20 grad">
          <div className="md:flex-col md:m-2">
            <Navbar />
            <Main />
          </div>
        </div>
      </WeatherContextProvider>
    </div>
  );
}

export default App;
