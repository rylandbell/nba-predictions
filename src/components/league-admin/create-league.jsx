'use strict';

import React from 'react';

const CreateLeague = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    if (this.props.isSendingCreateLeague) {
      return;
    }
    this.props.sendCreateLeague(this.props.enteredLeagueName);
  },
  handleTextEntry: function (e) {
    this.props.handleLeagueNameTextChange(e.target.value);
  },
  render: function() {
    return (
      <div>
        <h4 className="text-center">Create a new league</h4>
        <p>Choose a name for your new league, and hit submit. You'll automatically be added to the league, and will be given a code to invite others to join your league.</p>
        <br />
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-xs-9">
              <input type="text" className="form-control" id="leagueName" value={this.props.enteredLeagueName} maxLength="20" placeholder="Enter league name..." onChange={this.handleTextEntry} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleClick}>Create</button>
          </div>
        </form>
      </div>

    );
  }
});

export default CreateLeague;