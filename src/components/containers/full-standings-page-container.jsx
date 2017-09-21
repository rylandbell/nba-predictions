'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';
// import moment from 'moment';
import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';
import FullStandingsPage from '../full-standings/full-standings-page.jsx';

const mapStateToProps = state => ({
  activeMonth: state.activeMonth,
  standingsData: state.standingsData,
  isFetchingStandingsData: state.fetchStatus.isFetchingStandingsData
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

const FullStandingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FullStandingsPage);

export default FullStandingsPageContainer;