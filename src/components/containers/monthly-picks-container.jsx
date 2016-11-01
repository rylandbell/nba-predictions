'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ActionCreator from '../../action-creators.js';
import MonthlyPicks from '../monthly-picks/monthly-picks.jsx';
import Helper from '../../helper.js';

const mapStateToProps = state => ({
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  getUserMonthData:
    (month) => {
      Helper.myFetch(
        '/api/userMonth/'+month,
        'GET',
        {},
        (response => {
          dispatch(ActionCreator.receiveUserMonth(response));
        }),
        (response => {
          dispatch(ActionCreator.requestUserMonthFailure());
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
      dispatch(ActionCreator.requestUserMonthWaiting());
    },
  getGameData:
    (month) => {
      Helper.myFetch(
        '/api/dailyGamesData/'+month,
        'GET',
        {},
        (response => {
          dispatch(ActionCreator.receiveGameData(response));
        }),
        (response => {
          dispatch(ActionCreator.requestGameDataFailure());
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
      dispatch(ActionCreator.requestGameDataWaiting());
    },
  showAlert: 
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
});

const api = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyPicks);

export default api;