'use strict';

import React from 'react';
import moment from 'moment';

import Navbar from './navbar.jsx';

const LayoutComponent = React.createClass({
  componentDidMount: function() {
    const currentMonth = moment().format('YYYY-MM');
    this.props.getUserMonthData(currentMonth);

    this.props.getStandingsData(this.props.reduxState.selectedStandingsMonth);
  },
  render: function () {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div className="container container-body">
            <div className="row">
              <div className="col-xs-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default LayoutComponent;