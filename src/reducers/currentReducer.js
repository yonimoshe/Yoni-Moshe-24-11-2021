import { ActionTypes } from "../actions/actions-types";

const initialState = {
    weatherIcon: '',
    temperature: '',
    weatherText: '',
    city: '',
    cityCode: '',
    units:''
}

export const currentReducer = (state = initialState, action) => {
      switch (action.type) {
        case ActionTypes.FETCH_CURRENT_CITY_WEATHER:
            return{...state,
                             temperature: action.payload[0],
                             weatherText: action.payload[1],
                             city: action.payload[2],
                             cityCode: action.payload[3],
                             weatherIcon: action.payload[4],
                             units: action.payload[5]
                            }
        default:
            return state;
    }
};
