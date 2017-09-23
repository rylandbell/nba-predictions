'use strict';

import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import moment from 'moment';

import ActionCreator from '../../actions/action-creators.js';
import {sendPrediction} from '../../actions/api-put.js';
import DailyPicks from '../monthly-picks/daily-picks/daily-picks.jsx';

const mapStateToProps = (state) => ({
  activeDate: state.activeDate,
  predictedWinners: state.userMonth.predictedWinners,
  eligibleTeams: state.userMonth.eligibleTeams,
  gamesByDay: state.gamesByDay,
  isSendingPrediction: state.fetchStatus.isSendingPrediction,
  userMonth: state.userMonth,
  activeMonth: state.activeMonth
});

const mapDispatchToProps = (dispatch) => ({
  addPrediction: (gameId, teamName, gameDate, gameTime, userMonth, activeMonth) => {
    Alert.closeAll();

    //mark previous selection for that day eligible (locally):
    const gameDay = moment(gameDate).format('D');
    const oldPrediction = userMonth.predictedWinners[gameDay].teamName;
    dispatch(ActionCreator.markEligible(oldPrediction));

    //add new prediction locally, then mark that team ineligible for rest of month:
    dispatch(ActionCreator.addPrediction(gameId, teamName, gameDate));
    dispatch(ActionCreator.markIneligible(teamName));

    //update the database:
    const body = {};
    body.dayNumber = gameDay;
    body.teamName = teamName;
    body.gameTime = gameTime;

    dispatch(sendPrediction(activeMonth, body));
  },
  removePrediction: (gameId, teamName, gameDate, gameTime, activeMonth) => {
    Alert.closeAll();

    dispatch(ActionCreator.removePrediction(gameId, gameDate));
    dispatch(ActionCreator.markEligible(teamName));

    //update the database:
    const body = {};
    const gameDay = moment(gameDate).format('D');
    body.dayNumber = gameDay;
    body.teamName = null;
    body.gameTime = gameTime;

    dispatch(sendPrediction(activeMonth, body));
  },
  updateActiveDate: (newDate) => {
    dispatch(ActionCreator.setActiveDate (newDate));
  }
});

const DailyPicksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyPicks);

export default DailyPicksContainer;