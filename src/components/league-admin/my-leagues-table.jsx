'use strict';

import React from 'react';
import MyLeaguesTableRow from './my-leagues-table-row.jsx';

const MyLeaguesTable = ({user}) => {
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
          {user.leagues ? 
            user.leagues.map(league => <MyLeaguesTableRow league={league} key={league.id}/>) :
            null
          }
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaguesTable;