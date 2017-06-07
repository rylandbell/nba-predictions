'use strict';

import React from 'react';
import moment from 'moment';
import browserHistory from 'react-router/lib/browserHistory'; 

import StandingsTableHeader from './standings-table-header.jsx';
import StandingsTableRow from './standings-table-row.jsx';
import StandingsMonthSelector from './standings-month-selector.jsx';
import StatusMessage from '../status-message.jsx';

const StandingsTable = React.createClass({
  componentDidMount: function() {
    this.props.getMonthsList();
  },
  handleClick: function () {
    const path = '/standings';
    browserHistory.push(path);
  },
  render: function() {
    return (
      <div className="panel panel-default panel-black">
        <div className="panel-heading">
          <div className="panel-title">{moment(this.props.selectedStandingsMonth).format('MMMM YYYY')} Standings</div>
        </div>
        <div className="panel-body">
          <p className="text-center"> 
            View all results for the month&nbsp;
            <a href="#" onClick={this.handleClick}>here</a>
            .
          </p>

          {this.props.isFetchingStandingsData ? 
            <StatusMessage messageBold={'Loading standings data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
          :
            <div>
              <div className="standings">
                <table className="table table-bordered">
                  <StandingsTableHeader selectedStandingsMonth={this.props.selectedStandingsMonth}/>
                  <tbody>
                    {this.props.standingsData.map(
                        (player,key) => <StandingsTableRow player={player} key={key} selectedStandingsMonth={this.props.selectedStandingsMonth}/>                    
                    )}
                  </tbody>
                </table>
              </div>
              <div className="small text-center">Today's picks appear in the standings as soon as the picked game begins. </div>
            </div>
          }
          {this.props.monthList && this.props.monthList.length>1 ?
            <div>
              <hr />
              <StandingsMonthSelector getStandingsData={this.props.getStandingsData} setStandingsMonth={this.props.setStandingsMonth} selectedStandingsMonth={this.props.selectedStandingsMonth} monthList={this.props.monthList} />
            </div>
            : null
          }
        </div>
      </div>
    )
  }
});

export default StandingsTable;
