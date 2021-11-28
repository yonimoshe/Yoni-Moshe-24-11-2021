import { Grid } from '@material-ui/core';
import React from 'react';
import DayItem from './DayItem/DayItem';
import { useSelector } from 'react-redux';
import './Forecast.css';

function Forecast(props) {
  const forecastArr = useSelector(state => state.forecast.days);
  
  let singelDay = [];
  if (forecastArr && forecastArr.length!==0) {
    for (let i = 0; i < forecastArr.length; i++) {
      singelDay.push(<Grid item xs={12} md={2} >
                        <DayItem 
                           day={forecastArr[i].Date.slice(5,10)} 
                           minValue={forecastArr[i].Temperature.Minimum.Value}
                           maxValue={forecastArr[i].Temperature.Maximum.Value}
                           units={forecastArr[i].Temperature.Maximum.Unit}
                           />
                    </Grid>)  
    }
  }

    return (
        <Grid className="forecast-container" container spacing={4}>
          <Grid item xs={false} md={1} >         
        </Grid>
            {singelDay}
        <Grid item xs={false} md={1} >         
          </Grid>
        </Grid>
    );
}

export default Forecast;