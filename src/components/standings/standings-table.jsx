'use strict';

import React from 'react';
import moment from 'moment';
import browserHistory from 'react-router/lib/browserHistory'; 

import StandingsTableHeader from './standings-table-header.jsx';
import StandingsTableRow from './standings-table-row.jsx';
import StatusMessage from '../status-message.jsx';

const StandingsTable = React.createClass({
  componentDidMount: function() {
    this.props.getStandingsData(this.props.activeMonth);
  },
  handleClick: function () {
    const path = '/standings';
    browserHistory.push(path);
  },
  render: function() {
    return (
      <div className="panel panel-default panel-black">
        <div className="panel-heading">
          <div className="panel-title">{moment(this.props.activeMonth).format('MMMM YYYY')} Standings</div>
        </div>
        <div className="panel-body">
          <p className="small text-center"> 
            Other users' picks are revealed when the chosen game begins. View all results for the month&nbsp;
            <a href="#" onClick={this.handleClick}>here</a>
            .
          </p>

          {this.props.isFetchingStandingsData ? 
            <StatusMessage messageBold={'Loading standings data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
          :
            <div>
              <div className="standings">
                <table className="table table-bordered">
                  <StandingsTableHeader activeMonth={this.props.activeMonth}/>
                  <tbody>
                    {this.props.standingsData.map(
                        (player,key) => <StandingsTableRow player={player} key={key} activeMonth={this.props.activeMonth}/>                    
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
});

export default StandingsTable;
