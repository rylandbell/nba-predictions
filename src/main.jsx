'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
import 'babel-polyfill';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';

import Reducers from './reducers.jsx';
import GamesViewer from './components/games-viewer.jsx';
import ActionCreator from './action-creators.jsx';

const store = Redux.createStore(Reducers.app, Redux.applyMiddleware(thunk));
store.subscribe(render);
render();

function render() {
  ReactDOM.render(
    <GamesViewer
      reduxState={store.getState()} 
      addPrediction={
        (gameId, teamName, gameDate)=>{

          //mark previous selection for that day eligible:
          const gameDay = moment(gameDate).format('D');
          const oldPrediction = store.getState().predictedWinners[gameDay];
          store.dispatch(ActionCreator.markEligible(oldPrediction));

          //add new prediction, then mark that team ineligible for rest of month:
          store.dispatch(ActionCreator.addPrediction(gameId, teamName, gameDate));
          store.dispatch(ActionCreator.markIneligible(teamName));
        }
      }
      removePrediction = {
        (gameId, teamName, gameDate)=>{
          store.dispatch(ActionCreator.removePrediction(gameId, gameDate));
          store.dispatch(ActionCreator.markEligible(teamName));
        }
      }
      dayForward = {
        () => {
          store.dispatch(ActionCreator.dayForward());
        }
      }
      dayBack = {
        () => {
          store.dispatch(ActionCreator.dayBack());
        }
      }
    />,
    document.getElementById('app-root')
  );
}

render();

// GamesViewer
//   DayPicker
//   SingleDayGameList
//     SingleGame
//       GameTeam (road team)
//         TeamMessage
//       GameStatus
//       GameTeam (home team)
//         TeamMessage