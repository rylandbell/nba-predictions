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
    const firstDay = this.props.activeMonth === moment().format('YYYY-MM') ? moment().format('DD') : '1';
    return (
      <div>
        <table className="table upcoming-picks-table">
          <thead>
            <tr>
              <th className="text-center">{moment(this.props.activeMonth+'-'+firstDay).format('MMM D')}</th>
              <th className="text-center">{moment(this.props.activeMonth+'-'+firstDay).add(1,'days').format('MMM D')}</th>
              <th className="text-center">{moment(this.props.activeMonth+'-'+firstDay).add(2,'days').format('MMM D')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <UpcomingPicksTeam day={parseInt(firstDay, 10)} userMonth={this.props.userMonth} />
              <UpcomingPicksTeam day={parseInt(firstDay, 10)+1} userMonth={this.props.userMonth} />
              <UpcomingPicksTeam day={parseInt(firstDay, 10)+2} userMonth={this.props.userMonth} />
            </tr>
          </tbody>
        </table>
        <button onClick={this.handleClick} className="btn btn-primary center-block">Update {moment(this.props.activeMonth).format('MMMM')} Picks</button>
      </div>
    );
  }
});



export default UpcomingPicks;