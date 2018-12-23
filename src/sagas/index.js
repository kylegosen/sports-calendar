import { takeLatest, call, put } from "redux-saga/effects";
import * as types from '../constants';
import * as actions from '../actions';
import { API_GET_TEAMS } from "../constants";

export function* watcherSaga(){
    yield takeLatest(types.GET_TEAMS, getTeams);
}

function* getTeams(){
    try {
        const teams = yield call(fetchTeams);
        yield put(actions.getTeamsSuccess(teams));
    } catch(error) {
        yield put(actions.getTeamFailure(error));
    }
}

function* fetchTeams(){
    const response = yield fetch(API_GET_TEAMS);
    const json = yield response.json();
    return json._embedded.teams;
}