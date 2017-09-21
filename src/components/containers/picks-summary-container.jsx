'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';
// import moment from 'moment';
import browserHistory from 'react-router/lib/browserHistory';

import {requestUserMonthData} from '../../actions/action-creators.js';
import ActionCreator from '../../actions/action-creators.js';
import PicksSummary from '../picks-summary/picks-summary.jsx';

const mapStateToProps = state => ({
  missingUserMonth: state.fetchStatus.missingUserMonth,
  userMonth: state.userMonth,
  activeMonth: state.activeMonth
});

const mapDispatchToProps = dispatch => ({
  createNewUserMonth: 
    (callback, activeMonth) => {
      // const month = activeMonth || moment().format('YYYY-MM'); summer mode
      const month = activeMonth || '2017-04';
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
          const path = `/picks/${month}`;
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
  getUserMonthData: (month) => {
    dispatch(requestUserMonthData(month));
  },
  setActiveMonth:
    (month) => {
      let activeDay;
      // if (month===moment().format('YYYY-MM')) {
      //   activeDay = moment().format('D'); summer mode
      if (month==='2017-04') {
        activeDay = '11';
      } else {
        activeDay = '1';
      }
      dispatch(ActionCreator.setActiveMonth(month));
      dispatch(ActionCreator.setActiveDate(month, activeDay));
    },
  goToDate:
    (month, day) => {
      dispatch(ActionCreator.setActiveDate(month, day));
      const path = `/picks/${month}`;
      browserHistory.push(path);
    }
});

const PicksSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PicksSummary);

export default PicksSummaryContainer;