import { useContext } from "react";
import AppContext from "../provider/appContext";
import Loader from "./Loader";
import Temperature from "./Temperature";

function Weather() {
  const {
    app,
    app: { weather, unit },
  } = useContext(AppContext);

  if (!weather) {
    return <Loader showText={true} height="40vh" />;
  }

  const { current } = weather;
  const date = new Date(current.dt * 1000);
  const formatter = Intl.DateTimeFormat([], {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    timeZone: weather.timezone,
  });
  const dayFormatter = Intl.DateTimeFormat([], {
    weekday: "long",
    timeZone: weather.timezone,
  });
  return (
    <>
      <div
        className="weather-icon"
        style={{
          background: `url(/weather_icons/${current.weather[0].icon}.png)`,
        }}
      ></div>
      <h2 className="temp">
        <Temperature temperature={current.temp} />
        <span>°{unit}</span>
      </h2>
      <div className="feels-like">
        Feels like <Temperature temperature={current.feels_like} /> °{unit}
      </div>
      <div className="description">
        <i className="fa-brands fa-cloudversify"></i>&nbsp;
        {current.weather[0].description}
      </div>
      <div
        className="divider"
        style={app.isDark ? { background: "#3B435E" } : null}
      ></div>
      <div className="day">
        {dayFormatter.format(date)}, <span>{formatter.format(date)}</span>
      </div>
      <div className="city">
        <i className="fa-solid fa-location-dot"></i> {app.city}, {app.country}
      </div>
    </>
  );
}

export default Weather;
