import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers/index';
import {watcherSaga} from "./sagas";
import Calendar from './components/Calendar/CalendarContainer';
import DevTools from './components/DevTools';

import './styles/app.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    DevTools.instrument()
  )
);
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}>
    <Fragment>
      <Calendar/>
      <DevTools/>
    </Fragment>
  </Provider>,
  document.getElementById("app")
);
