'use strict';

//babel-polyfill will polyfill ES6 features, specifically Promises for fetch
import 'babel-polyfill';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';

// import Reducers from './reducers.jsx';
import SingleGame from './components/single-game.jsx';
var fudge = require('./fudge.js');

function render() {
  ReactDOM.render(
    <SingleGame gameData={fudge} />,
    document.getElementById('app-root')
  );
}

render();