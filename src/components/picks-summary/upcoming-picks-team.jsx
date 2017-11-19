'use strict';

import React from 'react';

const getPick = (userMonth, day) => {
  if (userMonth.predictedWinners[day] && userMonth.predictedWinners[day].teamName) {
    return userMonth.predictedWinners[day].teamName.toLowerCase();
  } else {
    return "glyphicon glyphicon-minus"
  }
};

const UpcomingPicksTeam = React.createClass({
  handleClick: function () {
    this.props.goToDate(this.props.date);
  },
  render: function() {
    return (
      <td className="upcoming-picks-team" onClick={this.handleClick}>
        <div className={"center-block text-center "+getPick(this.props.activeUserMonth,this.props.day)}></div>
      </td>
    );
  }
});



export default UpcomingPicksTeam;