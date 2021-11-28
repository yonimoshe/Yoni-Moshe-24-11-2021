import React, {useEffect} from 'react';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Favorites from './components/Favorites/Favorites';
import { fetchCurrentCityWeather, fetchForecastCityWeather } from './actions/actions';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  useEffect(() => {
    dispatch(fetchCurrentCityWeather("Tel-Aviv","215854"));
    dispatch(fetchForecastCityWeather("215854")); 
},[])

  const dispatch = useDispatch();
  // fav array hold the city name and code
  let favs = JSON.parse(localStorage.getItem("favorites"))
  if (!favs) {
    localStorage.setItem("favorites", JSON.stringify([]))
  }

  return (
    <div className="App">
       <Navigation />
       <main>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/favorites" element={<Favorites />} />
         </Routes>
       </main>
    </div>
  );
}

export default App;
