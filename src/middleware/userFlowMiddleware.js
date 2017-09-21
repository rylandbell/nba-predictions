import Alert from 'react-s-alert';

import {addUserData, addStandingsData} from '../actions/action-creators.js';

export const userFlowMiddleware = ({
  dispatch,
  // getState
}) => next => action => {
  // const state = getState();

  switch (action.type) {
    case 'REQUEST_USER_DATA_SUCCESS':
      dispatch(addUserData(action.payload));
      break;

    case 'REQUEST_STANDINGS_DATA_SUCCESS':
      dispatch(addStandingsData(action.payload));
      break;

    //Display appropriate alerts in browser on API errors:
    case 'REQUEST_USER_DATA_FAILURE':
      Alert.warning('Error: Failed to load user data. ' + action.payload,
        {
          position: 'bottom',
          effect: 'stackslide',
          beep: false,
          timeout: 8000,
          offset: 0
        }
      );
      break;

    case 'REQUEST_STANDINGS_DATA_FAILURE':
      Alert.warning('Error: Failed to load standings data. ' + action.payload,
        {
          position: 'bottom',
          effect: 'stackslide',
          beep: false,
          timeout: 8000,
          offset: 0
        }
      );
      break;

    default:
      break;
  }

  next(action);
};
