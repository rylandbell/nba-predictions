'use strict';

import React from 'react';
// import moment from 'moment';

const JoinLeague = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    this.props.sendJoinLeague(this.props.enteredLeagueId);
  },
  handleTextEntry: function (e) {
    this.props.handleLeagueIdTextChange(e.target.value);
  },
  render: function() {
    return (
      <div>
        <h4 className="text-center">Join an existing league</h4>
        <p>To join a league, enter the league's ID below. If you don't have the ID, ask somebody in the league.</p>
        <br />
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-9">
              <input type="text" className="form-control" id="leagueId" value={this.props.enteredLeagueId} onChange={this.handleTextEntry} maxLength="20" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleClick}>Join</button>
          </div>
        </form>
      </div>

    );
  }
});

export default JoinLeague;