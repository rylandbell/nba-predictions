'use strict';

import React from 'react';
import LeagueOption from './league-option.jsx';

const LeagueSelect = React.createClass({
  handleChange: function(e) {
    this.props.setActiveLeague(e.target.value);
    this.props.getUserMonthData(this.props.activeMonth, e.target.value);
    this.props.getGameData(this.props.activeMonth);
    this.props.getStandingsData(this.props.activeMonth);
  },
  render: function() {
    return (
      <div className="form-group">
        <label htmlFor="league-select">Active league:&nbsp;</label>
        <select id="league-select" className="form-control" onChange={this.handleChange} value={this.props.activeLeagueId}>
          {this.props.user.leagues.map(
            (league,key) => <LeagueOption league={league} key={key} />                    
          )}
        </select>
      </div>
    )
  }
});

export default LeagueSelect;