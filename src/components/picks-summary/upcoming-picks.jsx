'use strict';

import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import moment from 'moment';

import UpcomingPicksTeam from './upcoming-picks-team.jsx';

const UpcomingPicks = React.createClass({
  handleClick: function () {
    browserHistory.push('/picks');
  },
  render: function() {

    //start table from today's date, unless a different month is selected:  
    const currentMonthSelected = this.props.activeMonth === this.props.currentMonth;
    const currentDay = this.props.currentDate.substring(8,10);
    const firstDay = currentMonthSelected ? currentDay : '01';
    const firstDate = moment(this.props.activeMonth+'-'+firstDay);
    const secondDate = moment(this.props.activeMonth+'-'+firstDay).add(1,'days');
    const thirdDate = moment(this.props.activeMonth+'-'+firstDay).add(2,'days');

    return (
      <div>
        <table className="table upcoming-picks-table">
          <thead>
            <tr>
              <th className="text-center">{firstDate.format('MMM D')}</th>
              <th className="text-center">{secondDate.format('MMM D')}</th>
              <th className="text-center">{thirdDate.format('MMM D')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <UpcomingPicksTeam day={parseInt(firstDay, 10)} date={firstDate.format('YYYY-MM-DD')} activeMonth={this.props.activeMonth} userMonth={this.props.userMonth} goToDate={this.props.goToDate} />
              <UpcomingPicksTeam day={parseInt(firstDay, 10)+1} date={secondDate.format('YYYY-MM-DD')} activeMonth={this.props.activeMonth} userMonth={this.props.userMonth} goToDate={this.props.goToDate} />
              <UpcomingPicksTeam day={parseInt(firstDay, 10)+2} date={thirdDate.format('YYYY-MM-DD')} activeMonth={this.props.activeMonth} userMonth={this.props.userMonth} goToDate={this.props.goToDate} />
            </tr>
          </tbody>
        </table>
        <button onClick={this.handleClick} className="btn btn-primary center-block">Update {moment(this.props.activeMonth).format('MMMM')} Picks</button>
      </div>
    );
  }
});



export default UpcomingPicks;