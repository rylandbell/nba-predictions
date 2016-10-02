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
    return (
      <tr onClick={this.handleClick} className={isActive}>
        <td className="date-col">{this.props.activeMonth.substring(5,7)+'/'+this.props.dayOfMonth}</td>
        <td className="team-col">{this.props.predictedWinners[this.props.dayOfMonth]?this.props.predictedWinners[this.props.dayOfMonth]:'-'}</td>
        <td className="outcome-col"></td>
      </tr>
    );
  }

});


export default api;