'use strict';

import React from 'react';
import moment from 'moment';

const MonthlyPicksSummaryRow = React.createClass({
  handleClick: function() {
    const singleDigitDate = this.props.dayOfMonth < 10;
    const newDate = singleDigitDate ? 
      `${this.props.activeMonth}-0${this.props.dayOfMonth}` : 
      `${this.props.activeMonth}-${this.props.dayOfMonth}`;
    this.props.updateActiveDate(newDate);
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