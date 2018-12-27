import * as types from '../constants'

const initialState = {
  teams: null,
  favorites: null,
  fetching: false,
  error: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TEAMS:
      return {...state, fetching: true, error: null};
    case types.GET_TEAMS_SUCCESS:
      return {...state, fetching: false, teams: action.payload};
    case types.GET_TEAMS_FAILURE:
      return {...state, fetching: false, error: action.payload};
    case types.ADD_FAVORITE:
      const teamId = action.payload;
      const currentFavoritesArr = state.favorites.slice();
      if (!currentFavoritesArr.includes(teamId)) {
        currentFavoritesArr.push(teamId);
      }
      return {...state, favorites: currentFavoritesArr};
    case types.GET_FAVORITES:
      return {...state, favorites: []};
    case types.GET_FAVORITES_SUCCESS:
      return {...state, favorites: action.payload};
    case types.GET_FAVORITES_FAILURE:
      return {...state, favorites: []};
    default:
      return state;
  }
};

export default rootReducer;