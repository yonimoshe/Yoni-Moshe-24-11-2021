import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useSelector } from 'react-redux';

import Input from './Input/Input';
import Current from './Current/Current';
import Forecast from './Forecast/Forecast';
import './Home.css';

function Home(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    let description = useSelector(state => state.current.weatherText);
    let cityName = useSelector(state => state.current.city);
    let cityCode = useSelector(state => state.current.cityCode);
    let forecastState = useSelector(state => state.forecast.days);
  
    useEffect(() => {
       let favs = JSON.parse(localStorage.getItem("favorites"));
       let isFave = favs.findIndex( code => {
                    return code.cityCode === cityCode;
                });
       if (isFave !== -1) {
        setIsFavorite(true)
       }else{
        setIsFavorite(false)
       }

    },[cityName])
  
    const addToFavorites = () => {
        try {     
          let favs = JSON.parse(localStorage.getItem("favorites"));
          favs.push({city:cityName , cityCode: cityCode})
          localStorage.setItem("favorites", JSON.stringify(favs))
          setIsFavorite(true)
        } catch (e) {
            alert("ERR insert in to favorites");
        }
    }

    const removeFromFavorites = () => {
        try {     
            let favs = JSON.parse(localStorage.getItem("favorites"));
            favs = favs.filter( item => item.cityCode !== cityCode)
            localStorage.setItem("favorites", JSON.stringify(favs))
            setIsFavorite(false)
          } catch (e) {
              alert("ERR delete in to favorites");
          }
    }

    let favoritesBtn = isFavorite ?
                       <><HeartBrokenIcon fontSize={'large'} /><button className="remove-btn" onClick={removeFromFavorites}>Remove</button></> :
                       <><FavoriteIcon fontSize={'large'} color={'error'} /><button className="add-btn" onClick={addToFavorites}>Add</button></>


    return (
       <> 
        <Grid container spacing={false}>
            <Grid className="input-container" item xs={12} >
               <Input />
            </Grid>
        </Grid>

        <Grid container spacing={false} className="main-container">
            <Grid container xs={12} className="btn-icon-current-row" >
                <Grid className="current-container" item xs={6} >
                  <Current />
                </Grid>
                <Grid className="btn-container" item xs={6} >
                    {(cityName === '' || cityCode ==='') ? "" : favoritesBtn}         
                </Grid>
            </Grid> 
            <Grid className="description-container" item xs={12}>
                 <h2>{description ? description : "Not Found" }</h2>
            </Grid>
         <Forecast />
        </Grid>
       </>
    );
}

export default Home;