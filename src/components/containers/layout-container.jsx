'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ActionCreator from '../../actions/action-creators.js';
import {requestUserData, requestStandingsData} from '../../actions/action-creators.js';

import Helper from '../../helper.js';
import Layout from '../layout.jsx';

const mapStateToProps = state => ({
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  getStandingsData: (month) => {
    dispatch(requestStandingsData(month))
  },
  getUserMonthData: (month) => {
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
  getUserData: () => {
    dispatch(requestUserData());
  }
});

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default LayoutContainer;