'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';
import DailyPicks from '../monthly-picks/daily-picks/daily-picks.jsx';

const mapStateToProps = (state) => ({
  visibleDate: state.visibleDate,
  predictedWinners: state.userMonth.predictedWinners,
  eligibleTeams: state.userMonth.eligibleTeams,
  gamesByDay: state.gamesByDay,
  isSendingPrediction: state.isSendingPrediction
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPrediction:
    (gameId, teamName, gameDate, gameTime) => {
      Alert.closeAll();

      //mark previous selection for that day eligible:
      const gameDay = moment(gameDate).format('D');
      const oldPrediction = ownProps.reduxState.userMonth.predictedWinners[gameDay].teamName;
      dispatch(ActionCreator.markEligible(oldPrediction));

      //add new prediction, then mark that team ineligible for rest of month:
      dispatch(ActionCreator.addPrediction(gameId, teamName, gameDate));
      dispatch(ActionCreator.markIneligible(teamName));

      //update the database:
      const body = {};
      body.dayNumber = gameDay;
      body.teamName = teamName;
      body.gameTime = gameTime;

      Helper.myFetch(
        '/api/userMonth/' + ownProps.reduxState.activeMonth + '/predictedWinners',
        'PUT',
        body,
        (response => {
          dispatch(ActionCreator.sendPredictionSuccess(response));
        }),
        (response => {
          dispatch(ActionCreator.sendPredictionFailure());
          Alert.warning('Whoops: ' + response.message,
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
      dispatch(ActionCreator.sendPredictionWaiting());
    },
  removePrediction:
    (gameId, teamName, gameDate, gameTime) => {
      Alert.closeAll();

      dispatch(ActionCreator.removePrediction(gameId, gameDate));
      dispatch(ActionCreator.markEligible(teamName));

      //update the database:
      const body = {};
      const gameDay = moment(gameDate).format('D');
      body.dayNumber = gameDay;
      body.teamName = null;
      body.gameTime = gameTime;

      Helper.myFetch(
        '/api/userMonth/' + ownProps.reduxState.activeMonth + '/predictedWinners',
        'PUT',
        body,
        (response => {
          dispatch(ActionCreator.sendPredictionSuccess(response));
        }),
        (response => {
          dispatch(ActionCreator.sendPredictionFailure());
          Alert.warning('Whoops: ' + response.message,
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
      dispatch(ActionCreator.sendPredictionWaiting());
    },
  dayForward:
    () => {
      dispatch(ActionCreator.dayForward());
    },
  dayBack:
    () => {
      dispatch(ActionCreator.dayBack());
    }
});

const api = connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyPicks);

export default api;