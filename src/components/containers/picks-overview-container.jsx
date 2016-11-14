'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import moment from 'moment';
import { browserHistory } from 'react-router';

import ActionCreator from '../../action-creators.js';
import PicksOverview from '../picks-overview/picks-overview.jsx';
import Helper from '../../helper.js';

const mapStateToProps = state => ({
  missingUserMonth: state.missingUserMonth,
  userMonth: state.userMonth
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
  createNewUserMonth: 
    () => {
      const month = moment().format('YYYY-MM');
      const newRequest = {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'default',
        body: JSON.stringify({month: month})
      };

      newRequest.headers = new Headers;
      newRequest.headers.append('Content-Type', 'application/json');
            
      fetch('/api/userMonth/',newRequest)
        .then( () => {
          dispatch(ActionCreator.createUserMonthSuccess(month));
          const currentMonth = moment().format('YYYY-MM');
          const currentDay = moment().format('D');
          const path = `/app/picks/${currentMonth}/${currentDay}`;
          browserHistory.push(path);
          return null;
        })
        .catch(response => {
          Alert.warning('Error: Failed to load user data. ' + response.message,
            {
              position: 'bottom',
              effect: 'stackslide',
              beep: false,
              timeout: 8000,
              offset: 0
            }
          );
          dispatch(ActionCreator.createUserMonthFailure(response.message));
        });
      dispatch(ActionCreator.createUserMonthWaiting());
    }
});

const PicksOverviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PicksOverview);

export default PicksOverviewContainer;