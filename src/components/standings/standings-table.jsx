'use strict';

import React from 'react';
import StandingsTableHeader from './standings-table-header.jsx';
import StandingsTableRow from './standings-table-row.jsx';

const StandingsTable = React.createClass({
  componentDidMount: function() {
    this.props.getStandingsData('2016-11');
  },
  render: function() {
    return (
      <div className="panel panel-default panel-black">
        <div className="panel-heading">
          <div className="panel-title">November Standings</div>
        </div>
        <div className="panel-body">
          <div className="standings-wrapper">
            <table className="table table-hover table-bordered standings-table">
              <StandingsTableHeader />
              <tbody>
                {this.props.standingsData.map(
                    (player,key) => <StandingsTableRow player={player} key={key} />                    
                )}
              </tbody>
            </table>
          </div>
          <div className="small text-center">Today's picks appear in the standings as soon as the picked game begins. </div>
        </div>
      </div>
    )
  }
});

export default StandingsTable;
