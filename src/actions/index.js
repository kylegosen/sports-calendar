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