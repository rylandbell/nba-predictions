'use strict';

import React from 'react';

const getPick = (userMonth, day) => {
  console.log(userMonth.predictedWinners, day);
  if (userMonth.predictedWinners[day] && userMonth.predictedWinners[day].teamName) {
    return userMonth.predictedWinners[day].teamName.toLowerCase();
  } else {
    return "glyphicon glyphicon-minus"
  }
};

const UpcomingPicks = ({userMonth}) => {
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
            <td>
              <div className={"center-block text-center "+getPick(userMonth,today)}></div>
            </td>
            <td>
              <div className={"center-block text-center "+getPick(userMonth,parseInt(today)+1)}></div>
            </td>
            <td>
              <div className={"center-block text-center "+getPick(userMonth,parseInt(today)+2)}>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary center-block">Update My Picks</button>
    </div>
  );
};

export default UpcomingPicks;