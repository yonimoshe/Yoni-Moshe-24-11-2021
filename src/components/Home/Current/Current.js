import React from 'react';
import { useSelector } from 'react-redux';
import './Current.css';


function Current(props) {
    let current = useSelector(state => state.current);
    let deg = current.weatherText ? '\u00b0' : '';
    return (
        <div className="current-container">
            <img src={current.weatherIcon} />
            <div>
              <div>{current.city}</div>
              <span>{`${current.temperature} ${deg}${current.units}`}</span>
            </div> 
        </div>
    );
}

export default Current;