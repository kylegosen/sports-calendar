const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";

const initialState = {
    teams: null,
    fetching: false,
    error: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_CALL_REQUEST:
            return { ...state, fetching: true, error: null };
        case API_CALL_SUCCESS:
            return { ...state, fetching: false, teams: action.teams };
        case API_CALL_FAILURE:
            return { ...state, fetching: false, teams: null, error: action.error };
        default:
            return state;
    }
};

export default rootReducer;