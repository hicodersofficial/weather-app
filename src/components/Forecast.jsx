import React, { useContext } from "react";
import AppContext from "../provider/appContext";
import Card from "./Card";
import Loader from "./Loader";
import Temperature from "./Temperature";

function Forecast() {
  const { app } = useContext(AppContext);
  if (!app.weather) {
    return <Loader />;
  }

  const { daily } = app.weather;
  return (
    <div className="forecast-container">
      {daily.map((weather, index) => {
        let date = new Date(weather.dt * 1000);
        const dayFormatter = Intl.DateTimeFormat([], {
          weekday: "long",
          timeZone: weather.timezone,
        });
        return (
          <Card key={index} className="forecast-card">
            <div className="forecast-day">{dayFormatter.format(date)}</div>
            <img
              src={`/weather_icons/${weather.weather[0].icon}.png`}
              alt="icon"
              width={100}
            />
            <div className="forecast-description">
              {weather.weather[0].description}
            </div>
            <div className="minmax-temp">
              <Temperature temperature={weather.temp.max} />°
              <span>
                <Temperature temperature={weather.temp.min} />°
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default Forecast;
