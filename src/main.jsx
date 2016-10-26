'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
import 'babel-polyfill';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import Alert from 'react-s-alert';

import Reducers from './reducers.js';
import PredictionsPage from './components/predictions-page.jsx';
import ActionCreator from './action-creators.js';
import Helper from './helper.js';

const store = Redux.createStore(Reducers.app);
store.dispatch({type:'SET_ACTIVE_MONTH', month: activeMonth});
store.subscribe(render);
render();

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <div>
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
                  Alert.warning('Error: Failed to load user data. ' + response.message,
                    {
                      position: 'bottom',
                      effect: 'stackslide',
                      beep: false,
                      timeout: 8000,
                      offset: 0
                    }
                  );
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
                  Alert.warning('Error: Failed to load game data. ' + response.message,
                    {
                      position: 'bottom',
                      effect: 'stackslide',
                      beep: false,
                      timeout: 8000,
                      offset: 0
                    }
                  );
                })
              );
              store.dispatch(ActionCreator.requestGameDataWaiting());
            }
          }
          showAlert = {
            (type, msg, options) => {
              const defaultOptions = {
                position: 'top',
                effect: 'stackslide',
                beep: false,
                timeout: 8000,
                offset: 0
              };
              options = Object.assign({}, defaultOptions, options);
              Alert[type](msg, options);
            }
          }
        />
        <Alert />
      </div>
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