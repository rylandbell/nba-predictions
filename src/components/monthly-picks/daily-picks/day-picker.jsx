'use strict';

import React from 'react';
import moment from 'moment';

const DayPicker = React.createClass({
  handleClick: function(e) {
    let newDate;

    if (e.target.dataset.direction === "next") {
      newDate = moment(this.props.activeDate).add(1,'days').format('YYYY-MM-DD');
    } else if (e.target.dataset.direction === "prev") {
      newDate = moment(this.props.activeDate).subtract(1,'days').format('YYYY-MM-DD');
    } else {
      return;
    }

    this.props.updateActiveDate(newDate);
  },
  render: function() {    
    const isFirstOfMonth = moment(this.props.activeDate).format('D') === '1';
    const isLastOfMonth = moment(this.props.activeDate).format('M') !== moment(this.props.activeDate).add(1,'days').format('M');
    
    return (
      <div className="row">
        <div className="day-picker-container">
          {isFirstOfMonth ? null :
            <span className="day-picker-item glyphicon glyphicon-menu-left" onClick={this.handleClick} data-direction="prev"></span>
          }
          <div className="day-picker-item date-display">
            <h3>
              {moment(this.props.activeDate).format('dddd, MMM D')}
            </h3>
          </div>
          {isLastOfMonth ? null :          
            <span className="day-picker-item glyphicon glyphicon-menu-right" onClick={this.handleClick} data-direction="next"></span>
          }
        </div>
      </div>
    );
  }
});

export default DayPicker;