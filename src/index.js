import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers/index';
import Calendar from './calendar/index';

import './styles/app.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Calendar />
    </Provider>,
    document.getElementById('root')
);
