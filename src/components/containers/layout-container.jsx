'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';
import Layout from '../layout.jsx';

const mapStateToProps = state => ({
  reduxState: state
});

const mapDispatchToProps = dispatch => ({
  getStandingsData:
    (month) => {
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
    },
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
  getLeagues:
    () => {
      Helper.myFetch(
        '/api/league',
        'GET',
        {},
        (response => {
          // dispatch(ActionCreator.receiveUserMonth(response));
          console.log('response: ', response);
        }),
        (response => {
          console.log('error', response);
          // if (response.message === "No userMonth found") {
          //   dispatch(ActionCreator.requestUserMonthFailure(response.message));
          // } else {
          //   Alert.warning('Error: Failed to load user data. ' + response.message,
          //     {
          //       position: 'bottom',
          //       effect: 'stackslide',
          //       beep: false,
          //       timeout: 8000,
          //       offset: 0
          //     }
          //   );
          // }
        })
      );
      dispatch(ActionCreator.requestUserMonthWaiting());
    }
});

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default LayoutContainer;