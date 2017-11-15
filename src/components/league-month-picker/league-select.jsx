'use strict';

import React from 'react';
import LeagueOption from './league-option.jsx';

const LeagueSelect = React.createClass({
  handleChange: function(e) {
    this.props.setActiveLeague(e.target.value);
  },
  render: function() {
    return (
      <div className="form-group">
        {/*<label htmlFor="league-select" className="league-month-picker__label">Active league:&nbsp;</label>*/}
        <select id="league-select" className="form-control league-month-picker__select" onChange={this.handleChange} value={this.props.activeLeagueId}>
          <option disabled>Active League: </option>
          {this.props.user.leagues.map(
            (league,key) => <LeagueOption league={league} key={key} />                    
          )}
        </select>
      </div>
    )
  }
});

export default LeagueSelect;