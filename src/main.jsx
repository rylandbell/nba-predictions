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

const store = Redux.createStore(Reducers.app, Redux.applyMiddleware(thunk));
store.subscribe(render);
render();

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <PredictionsPage reduxState={store.getState()} />
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