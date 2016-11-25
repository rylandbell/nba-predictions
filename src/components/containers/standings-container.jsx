'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';
import StandingsTable from '../standings/standings-table.jsx';

const mapStateToProps = state => ({
  standingsData: state.standingsData,
  isFetchingStandingsData: state.isFetchingStandingsData
});

const mapDispatchToProps = dispatch => ({
  getStandingsData:
    (month) => {
      console.log(month);
      Helper.myFetch(
        '/api/userMonth/all-public/'+month,
        'GET',
        {},
        (response => {
          console.log('success!');
          dispatch(ActionCreator.receiveStandingsData(response));
        }),
        (response => {
          console.log('failure!');
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
      console.log('waiting');
      dispatch(ActionCreator.requestStandingsDataWaiting());
      console.log('still waiting');
    }
});

const StandingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StandingsTable);

export default StandingsContainer;