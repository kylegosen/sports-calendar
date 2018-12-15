import { takeLatest, call, put } from "redux-saga/effects";
import * as types from '../constants';
import * as actions from '../actions';
import {API_GET_TEAMS} from "../constants";

export function* watcherSaga(){
    yield takeLatest(types.GET_TEAMS, getTeams);
}

function* getTeams(){
    try {
        const response = yield call(fetchTeams);
        const json = yield response.json();
        const teams = json._embedded.teams;

        yield put(actions.getTeamsSuccess(teams));
    } catch(error) {
        yield put(actions.getTeamFailure(error));
    }
}

function fetchTeams(){
    return fetch(API_GET_TEAMS);
}