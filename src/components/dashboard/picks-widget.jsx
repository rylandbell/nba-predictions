'use strict';

import React from 'react';
import { Link } from 'react-router';

const PicksWidget = () => (
  <div className="panel panel-primary">
    <div className="panel-heading">
      <div className="panel-title">My Picks</div>
    </div>
    <div className="panel-body panel-black">
      <div className="list-group">
        <Link to="picks/2016-11/1">
          <h5 className="text-center">November</h5>
        </Link>
      </div>
    </div>
  </div>
);

export default PicksWidget;