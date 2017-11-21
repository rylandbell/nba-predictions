import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import React from "react";

import SingleDayGameList from "./single-day-game-list.jsx";
import DayPicker from "./day-picker.jsx";
import ActionCreator from '../../../actions/action-creators.js';
import {sendPrediction} from '../../../actions/api-put.js';
import { getActiveUserMonth } from '../../../selectors/userMonth.js';

const mapStateToProps = (state) => ({
  activeDate: state.dates.activeDate,
  predictedWinners: getActiveUserMonth(state).predictedWinners,
  eligibleTeams: getActiveUserMonth(state).eligibleTeams,
  gamesByDay: state.apiData.gamesByDay,
  isSendingPrediction: state.fetchStatus.isSendingPrediction,
  activeUserMonth: getActiveUserMonth(state),
  activeMonth: state.dates.activeMonth
});

const mapDispatchToProps = (dispatch) => ({
  addPrediction: (gameId, teamName, gameDate, gameTime, activeUserMonth) => {
    Alert.closeAll();

    //mark previous selection for that day eligible (locally):
    const gameDay = moment(gameDate).format('D');
    const oldPrediction = activeUserMonth.predictedWinners[gameDay].teamName;
    dispatch(ActionCreator.markEligible(oldPrediction));

    //add new prediction locally, then mark that team ineligible for rest of month:
    dispatch(ActionCreator.addPrediction(gameId, teamName, gameDate));
    dispatch(ActionCreator.markIneligible(teamName));

    //update the database:
    const body = {};
    body.dayNumber = gameDay;
    body.teamName = teamName;
    body.gameTime = gameTime;

    dispatch(sendPrediction(activeUserMonth.userMonthId, body));
  },
  removePrediction: (gameId, teamName, gameDate, gameTime, activeUserMonth) => {
    Alert.closeAll();

    dispatch(ActionCreator.removePrediction(gameId, gameDate));
    dispatch(ActionCreator.markEligible(teamName));

    //update the database:
    const body = {};
    const gameDay = moment(gameDate).format('D');
    body.dayNumber = gameDay;
    body.teamName = null;
    body.gameTime = gameTime;

    dispatch(sendPrediction(activeUserMonth.userMonthId, body));
  },
  updateActiveDate: (newDate) => {
    dispatch(ActionCreator.setActiveDate (newDate));
  }
});

const DailyPicks = ({
  activeDate,
  gamesByDay,
  eligibleTeams,
  isSendingPrediction,
  predictedWinners,
  activeUserMonth,
  activeMonth,
  addPrediction,
  removePrediction,
  updateActiveDate
}) =>
  <div className="daily-picks">
    <DayPicker
      activeDate={activeDate}
      activeMonth={activeMonth}
      updateActiveDate={updateActiveDate}
    />
    <p className="text-center day-picker-message">
      (Home teams are displayed on the right.)
    </p>
    <SingleDayGameList
      gamesByDay={gamesByDay}
      eligibleTeams={eligibleTeams}
      isSendingPrediction={isSendingPrediction}
      predictedWinners={predictedWinners}
      activeDate={activeDate}
      activeUserMonth={activeUserMonth}
      addPrediction={addPrediction}
      removePrediction={removePrediction}
    />
  </div>;

const DailyPicksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyPicks);

export default DailyPicksContainer;
