'use strict';

import React from 'react';
// import moment from 'moment';

const CreateLeague = React.createClass({
  // handleClick: function () {
  //   this.props.createNewUserMonth(this.props.getUserMonthData, this.props.activeMonth);
  // },
  render: function() {
    return (
      <div>
        <h4 className="text-center">Create a new league</h4>
        <p>Choose a name for your new league, and hit submit. You'll automatically be added to the league, and will be given a code to invite others to join your league.</p>
        <br />
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-sm-9">
              <input type="text" className="form-control" id="leagueName" placeholder="League Name" maxLength="20" />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>

    );
  }
});

export default CreateLeague;