import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import './DayItem.css';

function DayItem(props) {
    return (
        <Card style={{height:"20vh"}} className="day-card">
         <CardContent>
          <Typography variant="h6" component="div">
            {props.day}
          </Typography>
          <div className="day-card-min-max-container">
          <Typography variant="p" component="div">
            {`min: ${props.minValue} \u00b0${props.units}`}
          </Typography>
          <Typography variant="p" component="div">
          {`max: ${props.maxValue} \u00b0${props.units}`}
          </Typography>
          </div>
         </CardContent>
        </Card>
    );
}

export default DayItem;