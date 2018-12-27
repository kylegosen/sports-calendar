import {takeLatest, call, put} from "redux-saga/effects";
import * as types from '../constants';
import * as actions from '../actions';
import {API_GET_TEAMS} from "../constants";

import {ascend, sortWith, prop, isEmpty} from 'ramda';

export function* watcherSaga() {
  yield [
    takeLatest(types.GET_TEAMS, getTeams),
    takeLatest(types.GET_FAVORITES, getFavorites),
    takeLatest(types.ADD_FAVORITE, addFavorite)
  ];
}

function* getTeams() {
  try {
    const teams = yield call(fetchTeams);
    yield put(actions.getTeamsSuccess(teams));
  } catch (error) {
    yield put(actions.getTeamFailure(error));
  }
}

function* getFavorites() {
  try {
    const saved = localStorage.getItem("favorites");
    const favorites = isEmpty(saved) ? [] : saved.trim().split(",");
    yield put(actions.getFavoritesSuccess(favorites));
  } catch (error) {
    yield put(actions.getFavoritesFailure(error));
  }
}

function addFavorite({payload}) {
  const currentFavorites = localStorage.getItem("favorites") || "";
  const currentFavoritesArr = isEmpty(currentFavorites) ? [] : currentFavorites.trim().split(",");
  if (!currentFavoritesArr.includes(payload)) {
    currentFavoritesArr.push(payload);
    localStorage.setItem("favorites", currentFavoritesArr.join(","));
  }
}

function* fetchTeams() {
  const response = yield fetch(API_GET_TEAMS);
  const json = yield response.json();
  const teams = json._embedded.teams;

  const cityNameSort = sortWith([
    ascend(prop('city')),
    ascend(prop('name'))
  ]);

  return cityNameSort(teams);
}