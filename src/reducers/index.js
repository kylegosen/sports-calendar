import * as types from '../constants'

const initialState = {
    teams: null,
    fetching: false,
    error: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TEAMS:
            return { ...state, fetching: true, error: null };
        case types.GET_TEAMS_SUCCESS:
            return { ...state, fetching: false, teams: action.payload };
        case types.GET_TEAMS_FAILURE:
            return { ...state, fetching: false, error: action.payload };
        default:
            return state;
    }
};

export default rootReducer;