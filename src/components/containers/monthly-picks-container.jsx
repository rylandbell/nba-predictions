'use strict';

import { connect } from 'react-redux';
import moment from 'moment';
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
          if (response.message === "No userMonth found") {
            dispatch(ActionCreator.requestUserMonthFailure(response.message));
          } else {
            Alert.warning('Error: Failed to load user data. ' + response.message,
              {
                position: 'bottom',
                effect: 'stackslide',
                beep: false,
                timeout: 8000,
                offset: 0
              }
            );
          }
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
    },
  setPicksMonth:
    (month) => {
      let activeDay;
      if (month===moment().format('YYYY-MM')) {
        activeDay = moment().format('D');
      } else {
        activeDay = '1';
      }
      dispatch(ActionCreator.setPicksMonth(month));
      dispatch(ActionCreator.setActiveDate(month, activeDay));
    }
});

const MonthlyPicksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthlyPicks);

export default MonthlyPicksContainer;