import React, { useContext } from "react";
import AppContext from "../provider/appContext";
import Card from "./Card";
import Loader from "./Loader";

function Highlights() {
  const {
    app: { weather, isDark },
  } = useContext(AppContext);

  if (!weather) {
    return <Loader />;
  }
  const { current } = weather;
  const formatter = Intl.DateTimeFormat([], {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    timeZone: weather.timezone,
  });
  return (
    <>
      <div className="highlight-container">
        <Card className="h-card">
          <div className="h-title">Humidity</div>
          <img src="/weather_icons/humidity.png" width={100} alt="" />
          <div className="hl-value">
            <h1>{current.humidity}</h1>
            <span>%</span>
          </div>
        </Card>
        <Card className="h-card">
          <div className="h-title">Wind Speed</div>
          <img
            src={`/weather_icons/wind-${isDark ? "night" : "day"}.png`}
            width={100}
            alt="wind icon"
          />
          <div className="hl-value">
            <h1>{current.wind_speed.toFixed(1)}</h1>
            <span>m/s</span>
          </div>
        </Card>
        <Card className="h-card sun">
          <div className="sun-info">
            <img src="/weather_icons/sunrise.png" width={50} alt="" />
            <div>
              {formatter.format(new Date(current.sunrise * 1000))}
              <span>Sunrise</span>
            </div>
          </div>
          <div className="sun-info">
            <img src="/weather_icons/sunset.png" width={50} alt="" />
            <div>
              {formatter.format(new Date(current.sunset * 1000))}
              <span>Sunset</span>
            </div>
          </div>
        </Card>
        <Card className="h-card">
          <div className="h-title">Clouds</div>
          <img src="/weather_icons/clouds.png" width={100} alt="" />

          <div className="hl-value">
            <h1> {current.clouds}</h1>
            <span>%</span>
          </div>
        </Card>
        <Card className="h-card">
          <div className="h-title">UV Index</div>
          <img src="/weather_icons/uv.png" width={100} alt="" />
          <h1>{current.uvi}</h1>
        </Card>
        <Card className="h-card">
          <div className="h-title">Pressure</div>
          <img src="/weather_icons/pressure.png" width={100} alt="" />

          <div className="hl-value">
            <h1>{current.pressure}</h1>
            <span>hPa</span>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Highlights;
