'use strict';

import React from 'react';
import StandingsTableHeader from './standings-table-header.jsx';
import StandingsTableRow from './standings-table-row.jsx';
import StatusMessage from '../status-message.jsx';

const StandingsTable = React.createClass({
  componentDidMount: function() {
    const currentMonth = moment().format('YYYY-MM');
    this.props.getStandingsData(currentMonth);
  },
  render: function() {
    return (
      this.props.isFetchingStandingsData ? 
      <StatusMessage messageBold={'Loading standings data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
      :
      <div className="panel panel-default panel-black">
        <div className="panel-heading">
          <div className="panel-title">{moment().format('MMMM')} Standings</div>
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
