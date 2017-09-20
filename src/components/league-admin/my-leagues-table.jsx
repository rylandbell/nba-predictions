'use strict';

import React from 'react';

const MyLeaguesTable = () => {
  return (
    <div>
      <h4 className="text-center">My Leagues</h4>
      <p>You have successfully joined each of the leagues listed below. To invite a friend to join a league, send them the given link.</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>League Name</th>
            <th>Link to Join</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>League One</td>
            <td>http://nba.ryland-bell.com/leagues/59c13bed3cf1c1cddfd34fe4</td>
          </tr>
          <tr>
            <td>League Two</td>
            <td>http://nba.ryland-bell.com/leagues/59c13bed3cf1c1cddfd34fe4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaguesTable;