import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers/index';
import { watcherSaga } from "./sagas";
import Calendar from './components/Calendar/CalendarContainer';

import './styles/app.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
    <Provider store={store}>
        <Calendar />
    </Provider>,
    document.getElementById('root')
);
