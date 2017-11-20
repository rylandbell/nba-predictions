'use strict';

import React from 'react';

const MonthOption = React.createClass({
  render: function() {
    return (
      <option value={this.props.month}>
        &nbsp;{moment(this.props.month).format('MMM YYYY')}&nbsp;
      </option>
    )
  }
});

export default MonthOption;