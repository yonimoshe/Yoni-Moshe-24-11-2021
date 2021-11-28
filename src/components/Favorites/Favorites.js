import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentCityWeather, fetchForecastCityWeather} from '../../actions/actions';
import { Grid } from '@material-ui/core';
import CityCard from './CityCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

function Favorites(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [favorites, setFavorites] = useState([]);
    let favs = JSON.parse(localStorage.getItem("favorites"));
    let favoritesArrayToDisplay = [];
    let tokan = process.env.REACT_APP_TOKAN_KEY;

    useEffect(() => {
      async function fetchData() {
         try {
          for (let i = 0; i < favs.length; i++) {
            const response = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${favs[i].cityCode}?apikey=${tokan}`);
            favoritesArrayToDisplay.push({city: favs[i].city, cityCode: favs[i].cityCode ,info : [response.data[0].Temperature.Metric.Value,response.data[0].Temperature.Metric.Unit, response.data[0].WeatherText]})
            if (favs.length-1 === i) {
              setFavorites(favoritesArrayToDisplay);
            }      
          }
         } catch (error) {
           notifyFavoritesError();
           console.log(error);
         }

      }   
      fetchData();
    },[])

    const goToChosenCity = (city,cityCode) => {
      dispatch(fetchCurrentCityWeather(city,cityCode));
      dispatch(fetchForecastCityWeather(cityCode));
      navigate('/', {replace: true});
    } 

    const notifyFavoritesError = () => {
      toast.error("Oops...Cant fetch Favorites data, Problem with server conaction... ", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
      })
  }

    
    return (
        <Grid style={{marginTop: "1rem"}} container spacing={4}>
          <Grid item xs={false} md={1} >         
        </Grid>
           {(favs.length!==0 && favorites.length === favs.length) ?   // if
            favorites.map( el => 
              <Grid key={el.cityCode+"@@"} item xs={12} md={3} > 
                                <CityCard 
                                  city={el.city} 
                                  temp={el.info[0]}
                                  units={el.info[1]}
                                  description={el.info[2]}
                                  clicked={() => goToChosenCity(el.city,el.cityCode)}/>
              </Grid>) :  //else                                  
              <h1>No Favorites Found!</h1>
            }   
          <Grid item xs={false} md={1} >         
        </Grid>
      </Grid>
    );
}

export default Favorites;