'use strict';

import { connect } from 'react-redux';

import ActionCreator from '../../action-creators.jsx';
import GamesViewer from '../games-viewer/games-viewer.jsx';

// const mapStateToProps = (state) => reduxState;

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate,
  predictedWinners: state.userMonth.predictedWinners,
  eligibleTeams: state.userMonth.eligibleTeams,
  gamesByDay: state.gamesByDay
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPrediction:
    (gameId, teamName, gameDate)=>{

      //mark previous selection for that day eligible:
      const gameDay = moment(gameDate).format('D');
      const oldPrediction = ownProps.reduxState.userMonth.predictedWinners[gameDay];
      dispatch(ActionCreator.markEligible(oldPrediction));

      //add new prediction, then mark that team ineligible for rest of month:
      dispatch(ActionCreator.addPrediction(gameId, teamName, gameDate));
      dispatch(ActionCreator.markIneligible(teamName));
    },
  removePrediction:
    (gameId, teamName, gameDate)=>{
      dispatch(ActionCreator.removePrediction(gameId, gameDate));
      dispatch(ActionCreator.markEligible(teamName));
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
)(GamesViewer);

export default api;