import React, { useContext } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import AppContext from "../provider/appContext";
import Temperature from "./Temperature";
import Card from "./Card";
import Loader from "./Loader";

function Hourly() {
  const {
    app: { weather },
  } = useContext(AppContext);
  if (!weather) {
    return <Loader />;
  }
  const { hourly } = weather;
  return (
    <div>
      <Swiper
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {hourly.map((hWeather, index) => {
          const date = new Date(hWeather.dt * 1000);
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
            <SwiperSlide key={index + Math.random().toString()}>
              <Card key={index} className="forecast-card">
                <div className="forecast-day">
                  {dayFormatter.format(date)},{" "}
                  <span>{formatter.format(date)}</span>
                </div>
                <img
                  src={`/weather_icons/${hWeather.weather[0].icon}.png`}
                  alt=""
                  width={100}
                />
                <div className="forecast-description">
                  {hWeather.weather[0].description}
                </div>
                <div className="minmax-temp">
                  <Temperature temperature={hWeather.temp} />°
                </div>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Hourly;
