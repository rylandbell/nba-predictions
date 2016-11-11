'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

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
    }
});

const PicksOverviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PicksOverview);

export default PicksOverviewContainer;