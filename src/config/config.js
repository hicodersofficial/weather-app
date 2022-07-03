/**
 * Replace apiKey with yours.
 * NOTE: This api key will not work, it has been deleted.
 * Create your apiKey here: https://home.openweathermap.org/api_keys
 * NOTE: If you are getting 401 error: Your API key is not activated yet.
 * Within the next couple of hours, it will be activated and ready to use.
 * @link https://home.openweathermap.org/api_keys
 */
const OPEN_WEATHER_MAP_API_KEY = "2556d1d2e3f29e759f5735f4c4f43889";

const config = {
  WEATHER_API_ENDPOINT: `https://api.openweathermap.org/data/2.5/weather?appid=${OPEN_WEATHER_MAP_API_KEY}&`,
  WEATHER_DATA_ENDPOINT: `https://api.openweathermap.org/data/2.5/onecall?appid=${OPEN_WEATHER_MAP_API_KEY}&exclude=minutely&units=metric&`,
};

export default config;
