import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import './CityCard.css';

function CityCard({city,cityCode,temp,units,description,clicked}) {
    return (
        <Card onClick={clicked} >
         <CardContent className="city-card">
          <Typography className="city-card-title" variant="h5" component="div">
           {city}
          </Typography>
          <Typography className="city-card-temp" variant="h5" component="div">
          {` ${temp} \u00b0${units}`}
          </Typography>
          <Typography className="city-card-description" variant="h5" component="div">
           {description}
          </Typography>
        </CardContent>
       </Card>
    );
}

export default CityCard;