'use strict';

import React from 'react';

const LeagueOption = React.createClass({
  render: function() {
    return (
      <option value={this.props.league.id}>
        {this.props.league.name}
      </option>
    )
  }
});

export default LeagueOption;