import { takeLatest, call, put } from "redux-saga/effects";


export function* watcherSaga(){
    yield takeLatest("API_CALL_REQUEST", workerSaga);
}

function fetchTeams(){
    return fetch("teams");
}

function* workerSaga(){
    try {
        const response = yield call(fetchTeams);
        const json = yield response.json();
        const teams = json._embedded.teams;

        yield put({type: "API_CALL_SUCCESS", teams});
    } catch(error) {
        yield put({type: "API_CALL_FAILURE", error});
    }
}