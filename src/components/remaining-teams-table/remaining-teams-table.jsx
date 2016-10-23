//no longer used

'use strict';

import React from 'react';
import RemainingTeamRow from './remaining-team-row.jsx';

const api = ({eligibleTeams}) => {

return  (
    <div className="col-xs-3 col-sm-3 col-md-2 col-sm-offset-1 col-md-offset-1">
      <div className="text-center lead">
        Remaining Teams
      </div>
      <hr />
      <table className="remaining-teams-table table table-condensed">
        <tbody>
          {eligibleTeams.map((team, index) => <RemainingTeamRow teamName={team} key={index}/>)}
        </tbody>
      </table>
    </div>
  );
}

export default api;