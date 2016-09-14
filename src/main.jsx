'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
import 'babel-polyfill';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';

import Reducers from './reducers.jsx';
import GameList from './components/game-list.jsx';
import ActionCreator from './action-creators.jsx';

const store = Redux.createStore(Reducers.gameList, Redux.applyMiddleware(thunk));
store.subscribe(render);
render();

function render() {
  ReactDOM.render(
    <GameList
      reduxState={store.getState()} 
      addPrediction={
        (gameId, homeVsRoad)=>{
          store.dispatch(ActionCreator.addPrediction(gameId, homeVsRoad));
        }
      }
      removePrediction = {
        (gameId)=>{
          store.dispatch(ActionCreator.removePrediction(gameId));
        }
      }
    />,
    document.getElementById('app-root')
  );
}

render();

// GameList
//   SingleGame
//     GameTeam (road team)
//       TeamMessage
//     GameStatus
//     GameTeam (home team)
//       TeamMessage