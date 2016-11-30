'use strict';

import React from 'react';

import StandingsTableHeader from './standings-table-header.jsx';
import StandingsTableRow from './standings-table-row.jsx';
import StandingsMonthSelector from './standings-month-selector.jsx';
import StatusMessage from '../status-message.jsx';

const StandingsTable = React.createClass({
  componentDidMount: function() {
    this.props.getMonthsList();
  },
  render: function() {
    return (
      
      <div className="panel panel-default panel-black">
        <div className="panel-heading">
          <div className="panel-title">Monthly Standings</div>
        </div>
        <div className="panel-body">
          
          {this.props.isFetchingStandingsData ? 
            <StatusMessage messageBold={'Loading standings data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
          :
            <div>
              <div className="standings-wrapper">
                <table className="table table-bordered standings-table">
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
          }
          <hr />
          <StandingsMonthSelector getStandingsData={this.props.getStandingsData} monthList={this.props.monthList} />
        </div>
      </div>
    )
  }
});

export default StandingsTable;
