import { ActionTypes } from "./actions-types";
import axios from "axios"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyCurrentError = () => {
  toast.error("Oops...Cant fetch current weather, Problem with server conaction... ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
  })
}

const notifyForecastError = () => {
  toast.error("Oops... Cant fetch forecast, Problem with server conaction... ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
  })
}

export const fetchCurrentCityWeather = (city,cityCode) => {
      let tokan = process.env.REACT_APP_TOKAN_KEY;
      return async (dispatch) => {
        try {
            const response = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${tokan}`)
            let iconNumber = response.data[0].WeatherIcon
            let iconUrl = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
            if (iconNumber < 10) {
                 iconUrl = `https://developer.accuweather.com/sites/default/files/0${iconNumber}-s.png`;
              }
            const [weatherText,temperature,units] = [response.data[0].WeatherText,response.data[0].Temperature.Metric.Value,response.data[0].Temperature.Metric.Unit];
            dispatch({type: ActionTypes.FETCH_CURRENT_CITY_WEATHER,payload: [temperature,weatherText,city,cityCode,iconUrl,units]})
        } catch (error) {
            notifyCurrentError();
            console.log(error);
        }
      }
}

export const fetchForecastCityWeather = (cityCode) => {
      let tokan = process.env.REACT_APP_TOKAN_KEY;  
      return async (dispatch) => {
          try {
            const response = await axios.get( `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${tokan}&metric=true`)
            let dailyForecast = response.data.DailyForecasts;
            dispatch({type: ActionTypes.FETCH_FORECAST_CITY_WEATHER, payload: dailyForecast})
          } catch (error) {
            notifyForecastError();
            console.log(error);
          }
      }
}