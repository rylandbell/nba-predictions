'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ActionCreator from '../../action-creators.js';
import StandingsTable from '../standings/standings-table.jsx';
import Helper from '../../helper.js';

const mapStateToProps = state => ({
  reduxState: state,
  standingsData: state.standingsData
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
    }
});

const StandingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StandingsTable);

export default StandingsContainer;