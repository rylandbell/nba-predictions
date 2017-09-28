import Alert from 'react-s-alert';
import {browserHistory} from 'react-router';

import {addUserData, addStandingsData, addUserMonthData, addGameData, addMessageLog} from '../actions/api-get.js';
import actions from '../actions/action-creators.js';

export const userFlowMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  const state = getState();
  let newActiveDate;

  const showAlert = (errorDescription) => {
    Alert.warning(`Error: ${errorDescription} ${action.payload.message}`,
      {
        position: 'bottom',
        effect: 'stackslide',
        beep: false,
        timeout: 8000,
        offset: 0
      }
    );
  }

  switch (action.type) {

    //when the active month changes, the active date should be the current date OR the first of that month
    case 'SET_ACTIVE_MONTH':
      if(action.month === state.currentMonth) {
        newActiveDate = state.currentDate;
      } else {
        newActiveDate = action.month + '-01';
      }
      dispatch(actions.setActiveDate(newActiveDate));
      break;

    //send user to league management page if they haven't signed up for any leagues
    case 'ADD_USER_DATA':
      if(action.payload.leagues && action.payload.leagues.length < 1) {
        browserHistory.push('/leagues');
      }
      break;

    //Handle content received after successful API calls:
    case 'REQUEST_USER_DATA_SUCCESS':
      dispatch(addUserData(action.payload));
      break;

    case 'REQUEST_STANDINGS_DATA_SUCCESS':
      dispatch(addStandingsData(action.payload));
      break;

    case 'REQUEST_USER_MONTH_DATA_SUCCESS':
      dispatch(addUserMonthData(action.payload.userMonth));
      break;

    case 'REQUEST_GAME_DATA_SUCCESS':
      dispatch(addGameData(action.payload));
      break;

    case 'REQUEST_MESSAGE_LOG_SUCCESS':
      dispatch(addMessageLog(action.payload));
      break;

    case 'SEND_MESSAGE_SUCCESS':
      dispatch(addMessageLog(action.payload));
      break;

    case 'CREATE_LEAGUE_SUCCESS':
      dispatch(addUserData(action.payload));
      break;

    case 'JOIN_LEAGUE_SUCCESS':
      dispatch(addUserData(action.payload));
      break;

    case 'CREATE_USER_MONTH_SUCCESS':
      browserHistory.push(`/picks/${action.payload.month}`);
      dispatch(addUserMonthData(action.payload));
      break;

    //Display appropriate alerts in browser on API errors:
    case 'REQUEST_USER_DATA_FAILURE':
      showAlert('Failed to load user data.');
      break;

    case 'REQUEST_STANDINGS_DATA_FAILURE':
      showAlert('Failed to load standings data.');
      break;

    case 'REQUEST_GAME_DATA_FAILURE':
      showAlert('Failed to load game data.');
      break;

    case 'REQUEST_MESSAGE_LOG_FAILURE':
      showAlert('Failed to load chat messages.');
      break;

    case 'SEND_MESSAGE_FAILURE':
      showAlert('Failed to send message.');
      break;

    case 'CREATE_LEAGUE_FAILURE':
      showAlert('Failed to create new league.')
      break;

    case 'JOIN_LEAGUE_FAILURE':
      showAlert('Failed to create join league.');
      break;

    case 'SEND_PREDICTION_FAILURE':
      showAlert('Whoops:');
      break;

    default:
      break;
  }

  next(action);
};
