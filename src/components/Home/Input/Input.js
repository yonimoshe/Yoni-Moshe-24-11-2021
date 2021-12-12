import React, { useState, useEffect, useCallback} from 'react';
import Autosuggest from 'react-autosuggest';
import { useDispatch } from 'react-redux';
import { fetchCurrentCityWeather, fetchForecastCityWeather } from '../../../actions/actions';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { debounce } from '../../../functions/debounce';

import './Input.css';

toast.configure();

function Input(props) {
    const [city, setCity] = useState("");
    const [cityCode, setCityCode] = useState("")
    const [suggestions, setSuggestions] = useState([]);
    const [isChoiceMade, setIsChoiceMade] = useState(false)
    const dispatch = useDispatch();

    let tokan = process.env.REACT_APP_TOKAN_KEY;
    const notify = () => {
        toast.error("Sorry... English Please", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }

    const notifySearchError = () => {
        toast.error("Cant get Cities from server please try later", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        })
    }

    useEffect(() => {
       if (isChoiceMade) {
        dispatch(fetchCurrentCityWeather(city,cityCode));
        dispatch(fetchForecastCityWeather(cityCode));
        setIsChoiceMade(false);
       }
  
    },[city,cityCode])

    const func = useCallback(
        debounce(
            async ({value}) => {
                if (!value) {
                    setSuggestions([]);
                    return;
                }
                try {
                  const result = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${value}&apikey=${tokan}`);
                  setSuggestions(result.data.map( city => ({
                      name: city.LocalizedName,
                      key: city.Key
                  }) ));
                console.log("call made", value);
                                        
                } catch (error) {
                    setSuggestions([]);
                    notifySearchError();
                    console.log(error);
                }
            }
        ,2000)
        ,[]) 


    return (
        <div className="input-row">
            <Autosuggest 
              inputProps={{
                placeholder: "Type City",
                autoComplete: "abcd",
                name: "city",
                id: "city",
                value: city,
                onChange: ((_event, { newValue }) => {
                    let english = /[^A-Za-z\s]/ig;
                    if (english.test(newValue)) {
                        notify();
                        newValue = newValue.replace(english, '');
                    }
                     setCity(newValue);              
                })
               }}
              suggestions={suggestions}
              onSuggestionsFetchRequested={func} 
              onSuggestionsClearRequested={()=> {
                  setSuggestions([]);
              }}
              onSuggestionSelected={(event,{suggestion,method}) => {
                  if (method === "enter") {
                      event.preventDefault();
                  }
                  setCity(suggestion.name);
                  setCityCode(suggestion.key);
                  setIsChoiceMade(true)
              }}
              getSuggestionValue={suggestion => suggestion.name}
              renderSuggestion={suggestion => <div>{suggestion.name}</div>}
            />
        </div>
    );
}

export default Input;