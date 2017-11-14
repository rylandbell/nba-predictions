'use strict';

import React from 'react';
import MyLeaguesTableRow from './my-leagues-table-row.jsx';

const MyLeaguesTable = ({user}) => {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <h4 className="text-center">My Leagues</h4>
        <hr />
        <p>You have successfully joined the leagues listed below. To invite a friend to join a league, send them the randomly generated pass phrase below.</p>
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>League Name</th>
              <th>Pass Phrase</th>
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
    </div>
  );
};

export default MyLeaguesTable;