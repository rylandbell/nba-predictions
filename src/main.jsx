'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
import 'babel-polyfill';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';

import Reducers from './reducers.jsx';
import PredictionsPage from './components/predictions-page.jsx';
import ActionCreator from './action-creators.jsx';
import Helper from './helper.jsx';

const store = Redux.createStore(Reducers.app, Redux.applyMiddleware(thunk));
store.subscribe(render);
render();

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <PredictionsPage 
        reduxState={store.getState()}
        getInitialUserMonthData = {
          () => {
            Helper.myFetch(
              'http://localhost:3000/api/userMonth/57e1a9dc07523c6b07aec4ef',
              'GET',
              {},
              (response => {
                store.dispatch(ActionCreator.receiveUserMonth(response));
              }),
              (response => {
                store.dispatch(ActionCreator.requestUserMonthFailure());
                console.log('Failed to fetch userMonth', response);
              })
            );
            ActionCreator.requestUserMonthWaiting();
          }
        } />
    </Provider>,
    document.getElementById('app-root')
  );
}

render();

// GamePickerPage
//   RemainingTeamsTable
//     RemainingTeamRow
//   GamesViewer
//     DayPicker
//     SingleDayGameList
//       SingleGame
//         GameTeam (road team)
//           TeamMessage
//         GameStatus
//         GameTeam (home team)
//           TeamMessage