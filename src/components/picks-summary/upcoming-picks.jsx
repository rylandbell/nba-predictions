'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

import UpcomingPicksTeam from './upcoming-picks-team.jsx';

const UpcomingPicks = React.createClass({
  handleClick: function () {
    const currentMonth = moment().format('YYYY-MM');
    const currentDay = moment().format('D');
    const path = `/picks/${currentMonth}/${currentDay}`;
    browserHistory.push(path);
  },
  render: function() {
    const today = moment().format('D');
    return (
      <div>
        <table className="table upcoming-picks-table">
          <thead>
            <tr>
              <th className="text-center">{moment().format('MMM D')}</th>
              <th className="text-center">{moment().add(1,'days').format('MMM D')}</th>
              <th className="text-center">{moment().add(2,'days').format('MMM D')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <UpcomingPicksTeam day={today} userMonth={this.props.userMonth} />
              <UpcomingPicksTeam day={parseInt(today)+1} userMonth={this.props.userMonth} />
              <UpcomingPicksTeam day={parseInt(today)+2} userMonth={this.props.userMonth} />
            </tr>
          </tbody>
        </table>
        <button onClick={this.handleClick} className="btn btn-primary center-block">Update My Picks</button>
      </div>
    );
  }
});



export default UpcomingPicks;