'use strict';

import React from 'react';
import moment from 'moment';

const JoinMonth = React.createClass({
  handleClick: function () {
    this.props.createNewUserMonth(this.props.getUserMonthData, this.props.activeMonth);
  },
  render: function() {
    return (
      <div>
        <p> It looks like you haven't yet joined the {moment(this.props.activeMonth).format('MMMM')} competition. Click below to sign up: </p>
        <p>
          <button onClick={this.handleClick} className="btn btn-primary center-block animated rubberBand">Sign up for {moment(this.props.activeMonth).format('MMMM')}</button>
        </p>
        <p> You are welcome to join at any point in the month. If it's too late to catch up with the other players, you can at least get some practice for next month.</p>
      </div>
    );
  }
});

export default JoinMonth;