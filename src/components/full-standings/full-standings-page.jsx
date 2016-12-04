'use strict';

import React from 'react';
import moment from 'moment';

import FullStandingsHeader from './full-standings-header.jsx';
import FullStandingsRow from './full-standings-row.jsx';
import FullStandingsMonthSelector from './full-standings-month-selector.jsx';
import StatusMessage from '../status-message.jsx';

const FullStandingsPage = React.createClass({
  componentDidMount: function() {
    this.props.getMonthsList();
    this.props.getStandingsData(this.props.selectedStandingsMonth);
  },
  render: function() {
    return (
      <div className="panel panel-default panel-black ">
        <div className="panel-heading">
          <div className="panel-title">{moment(this.props.selectedStandingsMonth).format('MMMM YYYY')} - Full Results</div>
        </div>
        <div className="panel-body">
          {this.props.monthList && this.props.monthList.length>1 ?
            <div>
              <FullStandingsMonthSelector getStandingsData={this.props.getStandingsData} setStandingsMonth={this.props.setStandingsMonth} selectedStandingsMonth={this.props.selectedStandingsMonth} monthList={this.props.monthList} />
            </div>
            : null
          }
          {this.props.isFetchingStandingsData ? 
            <StatusMessage messageBold={'Loading standings data...'} messageBody={'Just hang tight.'} messageClass={'info'}/>
          :
            <div className="full-standings-scrollspace">
              <div className="standings-wrapper">
                <table className="table table-bordered standings-table">
                  <FullStandingsHeader selectedStandingsMonth={this.props.selectedStandingsMonth} />
                  <tbody>
                    {this.props.standingsData.map(
                        (player,key) => <FullStandingsRow player={player} key={key} selectedStandingsMonth={this.props.selectedStandingsMonth}/>                    
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

export default FullStandingsPage;
