import { useEffect, useReducer } from "react";
import CityInput from "./components/CityInput";
import Weather from "./components/Weather";
import AppContext, { appReducer, initialAppState } from "./provider/appContext";
import "./App.css";
import geoCoords from "./utils/geoCoords";
import getWeather, {
  getCityCoords,
  getCityName,
} from "./services/weatherService";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import Hourly from "./components/Hourly";
import Footer from "./components/Footer";

function App() {
  const [app, dispatchApp] = useReducer(appReducer, initialAppState);
  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    if (hour > 18 || hour < 7) {
      dispatchApp({ type: "DARK", payload: true });
    }
  }, []);
  useEffect(() => {
    (async () => {
      const { longitude: lon, latitude: lat } = await geoCoords();
      if (lon && lat) {
        const { name, country } = await getCityName(lon, lat);
        dispatchApp({ type: "GEO_COORDS", payload: { lon, lat } });
        dispatchApp({ type: "CITY", payload: name });
        dispatchApp({ type: "COUNTRY", payload: country });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { lon, lat, country } = await getCityCoords(app.city);
      dispatchApp({ type: "GEO_COORDS", payload: { lon, lat } });
      dispatchApp({ type: "COUNTRY", payload: country });
    })();
  }, [app.city]);

  useEffect(() => {
    (async () => {
      const data = await getWeather(app.geoCoords.lon, app.geoCoords.lat);
      dispatchApp({ type: "WEATHER", payload: data });
      const formatter = Intl.DateTimeFormat([], {
        hour12: false,
        hour: "numeric",
        timeZone: data.timezone,
      });
      const localTime = parseInt(
        formatter
          .format(new Date(data.current.dt * 1000))
          .replace(/[A-Za-z]/gi, "")
      );
      const sunset = parseInt(
        formatter
          .format(new Date(data.current.sunset * 1000))
          .replace(/[A-Za-z]/gi, "")
      );
      const sunrise = parseInt(
        formatter
          .format(new Date(data.current.sunrise * 1000))
          .replace(/[A-Za-z]/gi, "")
      );
      if (localTime > sunset || localTime < sunrise) {
        dispatchApp({ type: "DARK", payload: true });
      } else {
        dispatchApp({ type: "DARK", payload: false });
      }
    })();
  }, [app.geoCoords.lat, app.geoCoords.lon]);

  useEffect(() => {
    if (app.isDark) {
      document
        .querySelector(":root")
        .style.setProperty("--placeholder-color", "#8f94af");
    } else {
      document
        .querySelector(":root")
        .style.setProperty("--placeholder-color", "#323232");
    }
  }, [app.isDark]);

  const activeStyle = { background: "#1a1a1a", color: "#fff" };
  const colLeftStyle = {
    background: "#19202d",
    color: "#fff",
  };
  const colRightStyle = {
    background: "#232b39",
    color: "#fff",
  };
  return (
    <AppContext.Provider value={{ app, dispatchApp }}>
      <section className="container">
        <div className="col-left" style={app.isDark ? colLeftStyle : null}>
          <CityInput />
          <Weather />
        </div>
        <div className="col-right" style={app.isDark ? colRightStyle : null}>
          <div className="top-header">
            <h2 className="heading">Today</h2>
            <div className="units">
              <span
                style={
                  app.unit === "C"
                    ? activeStyle
                    : app.isDark
                    ? { color: "#000" }
                    : null
                }
                onClick={() => {
                  dispatchApp({ type: "UNIT", payload: "C" });
                }}
              >
                °C
              </span>
              <span
                onClick={() => {
                  dispatchApp({ type: "UNIT", payload: "F" });
                }}
                style={
                  app.unit === "F"
                    ? activeStyle
                    : app.isDark
                    ? { color: "#000" }
                    : null
                }
              >
                °F
              </span>
            </div>
          </div>
          <Hourly />
          <h2 className="heading">Today's Highlights</h2>
          <Highlights />
          <h2 className="heading">This Week</h2>
          <Forecast />
          <Footer />
        </div>
      </section>
    </AppContext.Provider>
  );
}

export default App;
