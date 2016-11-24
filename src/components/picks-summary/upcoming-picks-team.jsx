'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

const getPick = (userMonth, day) => {
  if (userMonth.predictedWinners[day] && userMonth.predictedWinners[day].teamName) {
    return userMonth.predictedWinners[day].teamName.toLowerCase();
  } else {
    return "glyphicon glyphicon-minus"
  }
};

const UpcomingPicksTeam = React.createClass({
  handleClick: function () {
    // const currentMonth = moment().format('YYYY-MM');
    // const currentDay = moment().format('D');
    // const path = `/picks/${currentMonth}/${currentDay}`;
    // browserHistory.push(path);
  },
  render: function() {
    return (
      <td className="upcoming-picks-team">
        <div className={"center-block text-center "+getPick(this.props.userMonth,this.props.day)}></div>
      </td>
    );
  }
});



export default UpcomingPicksTeam;