import * as types from '../constants';

export const getTeams = () => ({
  type: types.GET_TEAMS
});

export const getTeamsSuccess = teams => ({
  type: types.GET_TEAMS_SUCCESS,
  payload: teams
});

export const getTeamFailure = () => ({
  type: types.GET_TEAMS_FAILURE
});

export const addFavorite = teamId => ({
  type: types.ADD_FAVORITE,
  payload: teamId
});

export const getFavorites = () => ({
  type: types.GET_FAVORITES
});

export const getFavoritesSuccess = favorites => ({
  type: types.GET_FAVORITES_SUCCESS,
  payload: favorites
});

export const getFavoritesFailure = () => ({
  type: types.GET_FAVORITES_FAILURE
});