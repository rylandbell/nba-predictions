'use strict';

import React from 'react';

const LeagueOption = React.createClass({
  render: function() {
    return (
      <option value={this.props.league.id}>
        &nbsp;{this.props.league.name}&nbsp;
      </option>
    )
  }
});

export default LeagueOption;