'use strict';

import React from 'react';
import CreateLeague from './create-league.jsx';
import JoinLeague from './join-league.jsx';

const LeagueAdmin = () => {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-10 col-md-offset-1">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <CreateLeague />
              </div>
              <div className="col-xs-12 col-sm-6">
                <JoinLeague />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueAdmin;