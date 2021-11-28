import { ActionTypes } from "../actions/actions-types";

const initialState = {
    days: [],
    test: true
}

export const forecastReducer = (state = initialState, action) => {
      switch (action.type) {
        case ActionTypes.FETCH_FORECAST_CITY_WEATHER:
            return{...state, days: action.payload}
        default:
            return state;
    }
};
