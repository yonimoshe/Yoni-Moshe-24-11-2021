import { combineReducers } from "redux";
import { currentReducer } from "./currentReducer";
import { forecastReducer } from "./forecastReducer";

const reducers = combineReducers({
    current: currentReducer, 
    forecast: forecastReducer
})

export default reducers;