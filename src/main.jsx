'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
import 'babel-polyfill';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';

import Reducers from './reducers.jsx';
import PredictionsPage from './components/predictions-page.jsx';
import ActionCreator from './action-creators.jsx';
import Helper from './helper.jsx';

const store = Redux.createStore(Reducers.app);
store.subscribe(render);
render();

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <PredictionsPage 
        reduxState={store.getState()}
        getUserMonthData = {
          (month) => {
            Helper.myFetch(
              '/api/userMonth/'+month,
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
            store.dispatch(ActionCreator.requestUserMonthWaiting());
          }
        }
        getGameData = {
          (month) => {
            Helper.myFetch(
              '/api/dailyGamesData/'+month,
              'GET',
              {},
              (response => {
                store.dispatch(ActionCreator.receiveGameData(response));
              }),
              (response => {
                store.dispatch(ActionCreator.requestGameDataFailure());
                console.log('Failed to fetch gameData', response);
              })
            );
            store.dispatch(ActionCreator.requestGameDataWaiting());
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