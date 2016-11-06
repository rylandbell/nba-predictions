'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import ActionCreator from '../../action-creators.js';
import Helper from '../../helper.js';
import DailyPicks from '../monthly-picks/daily-picks/daily-picks.jsx';

const mapStateToProps = (state) => ({
  activeDate: state.activeDate,
  predictedWinners: state.userMonth.predictedWinners,
  eligibleTeams: state.userMonth.eligibleTeams,
  gamesByDay: state.gamesByDay,
  isSendingPrediction: state.isSendingPrediction,
  userMonth: state.userMonth,
  activeMonth: state.activeMonth
});

const mapDispatchToProps = (dispatch) => ({
  addPrediction:
    (gameId, teamName, gameDate, gameTime, userMonth, activeMonth) => {
      Alert.closeAll();

      //mark previous selection for that day eligible:
      const gameDay = moment(gameDate).format('D');
      const oldPrediction = userMonth.predictedWinners[gameDay].teamName;
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
        '/api/userMonth/' + activeMonth + '/predictedWinners',
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
    (gameId, teamName, gameDate, gameTime, activeMonth) => {
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
        '/api/userMonth/' + activeMonth + '/predictedWinners',
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
    }
});

const DailyPicksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyPicks);

export default DailyPicksContainer;