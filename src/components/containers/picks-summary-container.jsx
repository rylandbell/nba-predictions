'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import moment from 'moment';
import browserHistory from 'react-router/lib/browserHistory';

import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';
import PicksSummary from '../picks-summary/picks-summary.jsx';

const mapStateToProps = state => ({
  missingUserMonth: state.missingUserMonth,
  userMonth: state.userMonth
});

const mapDispatchToProps = dispatch => ({
  createNewUserMonth: 
    (callback) => {
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
          callback();
          dispatch(ActionCreator.createUserMonthSuccess(month));
          const currentMonth = moment().format('YYYY-MM');
          const currentDay = moment().format('D');
          const path = `/picks/${currentMonth}/${currentDay}`;
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
    },
  getStandingsData:
    () => {
      const month = moment().format('YYYY-MM');
      Helper.myFetch(
        '/api/userMonth/all-public/'+month,
        'GET',
        {},
        (response => {
          dispatch(ActionCreator.receiveStandingsData(response));
        }),
        (response => {
          dispatch(ActionCreator.requestStandingsDataFailure());
          Alert.warning('Error: Failed to load standings data. ' + response.message,
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
      dispatch(ActionCreator.requestStandingsDataWaiting());
    }
});

const PicksSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PicksSummary);

export default PicksSummaryContainer;