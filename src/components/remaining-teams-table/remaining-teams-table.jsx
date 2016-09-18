'use strict';

import React from 'react';
import RemainingTeamRow from './remaining-team-row.jsx';

const api = ({eligibleTeams}) => {

return  (
    <div className="col-xs-3 col-sm-3 col-md-2">
      <div className="text-center lead">
        Remaining Teams
      </div>
      <hr />
      <table className="remaining-teams-table table table-condensed">
        <tbody>
          {Object.keys(eligibleTeams)
            .filter(team => eligibleTeams[team])
            .map((team, index) => <RemainingTeamRow teamName={team} key={index}/>)
          }
        </tbody>
      </table>
    </div>
  );
}

export default api;