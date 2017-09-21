'use strict';

import React from 'react';
import moment from 'moment';

import FullStandingsHeader from './full-standings-header.jsx';
import FullStandingsRow from './full-standings-row.jsx';
import StatusMessage from '../status-message.jsx';

const FullStandingsPage = React.createClass({
  componentDidMount: function() {
    this.props.getStandingsData(this.props.activeMonth);
  },
  render: function() {
    return (
      <div className="panel panel-default panel-black ">
        <div className="panel-heading">
          <div className="panel-title">{moment(this.props.activeMonth).format('MMMM YYYY')} - Full Results</div>
        </div>
        <div className="panel-body">
          {this.props.isFetchingStandingsData ? 
            <StatusMessage messageBold={'Loading standings data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
          :
            <div className="standings--full">
              <table className="table table-bordered standings__table--full">
                <FullStandingsHeader activeMonth={this.props.activeMonth} />
                <tbody>
                  {this.props.standingsData.map(
                      (player,key) => <FullStandingsRow player={player} key={key} activeMonth={this.props.activeMonth}/>                    
                  )}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    )
  }
});

export default FullStandingsPage;
