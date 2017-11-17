'use strict';

import React from 'react';

import MonthlyPicksSidebarContainer from '../containers/monthly-picks-sidebar-container.jsx';
import DailyPicksContainer from '../containers/daily-picks-container.jsx';
import StatusMessage from '../status-message.jsx';
import JoinMonth from '../utility/join-month.jsx';
import {runMonthlyPicksIntro} from '../../intro-tours.js';

const MonthlyPicksPage = React.createClass({
  componentDidMount: function() {
    document.title = document.title.split(' | ')[0] + ' | My Picks';
    setTimeout(function () {
      runMonthlyPicksIntro();
    }, 500)
  },
  render: function() {
    const isLoading = this.props.reduxState.fetchStatus.isFetchingUserMonthData || this.props.reduxState.fetchStatus.isFetchingGameData || this.props.reduxState.fetchStatus.isFetchingUserData;

    if (isLoading) {
      return <StatusMessage messageBold={'Loading game data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
    } else if (this.props.reduxState.fetchStatus.missingUserMonth) {
      return (
        <div className={'row '+(this.props.reduxState.fetchStatus.isSendingPrediction ? 'send-waiting' : '')}>
          <div className="col-xs-12 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2">
            <div className="panel panel-black panel-default">
              <div className="panel-heading">
                <div className="panel-title">Join Month</div>
              </div>
              <div className="panel-body">
                <JoinMonth activeMonth={this.props.reduxState.activeMonth} activeLeagueId={this.props.reduxState.activeLeagueId} createNewUserMonth={this.props.createNewUserMonth} getUserMonthData={this.props.getUserMonthData} />
              </div>
            </div>  
          </div>
        </div>)
    } else {
      return (
        <div className={'row '+(this.props.reduxState.fetchStatus.isSendingPrediction ? 'send-waiting' : '')}>
          <div className="col-xs-12 col-sm-8 col-md-9">
            <DailyPicksContainer />
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3">
            <MonthlyPicksSidebarContainer reduxState={this.props.reduxState} />
          </div>
        </div>)
    }
  }
});

export default MonthlyPicksPage;