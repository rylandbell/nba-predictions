'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

import Helper from '../../../helper.js';

const MonthlyPicksSummaryRow = React.createClass({

  //HTML doesn't like links on table rows, so I'm using an event handler instead of Link:
  handleClick: function() {
    const newPath = Helper.getPathDirectory() + this.props.dayOfMonth;
    browserHistory.push(newPath);
  },
  render: function () {
    const isActive = ((this.props.dayOfMonth == moment(this.props.activeDate).format('D')) ? 'active' : '');
    let outcomeString = '';
    let outcomeClass = '';
    
    if(this.props.userPrediction){
      if (this.props.userPrediction.outcome === 'success'){
        outcomeString = 'W';
        outcomeClass = 'text-success';
      } else if (this.props.userPrediction.outcome === 'failure'){
        outcomeString = 'L';
        outcomeClass = 'text-danger';
      }
    }

    if(this.props.userPrediction){
      return (
        <tr onClick={this.handleClick} className={isActive}>
          <td className="date-col">{this.props.activeMonth.substring(5,7)+'/'+this.props.dayOfMonth}</td>
          <td className="team-col">{this.props.userPrediction.teamName?this.props.userPrediction.teamName:'-'}</td>
          <td className={"outcome-col "+outcomeClass}>{outcomeString}</td>
        </tr>
      );
    } else {
      return null;
    }
  }

});


export default MonthlyPicksSummaryRow;