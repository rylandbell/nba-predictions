'use strict';

import React from 'react';

const api = React.createClass({
  handleClick: function() {
    this.props.goToDate(
      moment(this.props.activeMonth).add(this.props.dayOfMonth-1, 'days').format('YYYY-MM-DD')
    );
  },
  render: function () {
    const isActive = ((this.props.dayOfMonth == moment(this.props.visibleDate).format('D')) ? 'active' : '');
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


export default api;