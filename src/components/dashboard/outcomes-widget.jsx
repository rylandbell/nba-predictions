'use strict';

import React from 'react';

const PicksWidget = () => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <div className="panel-title">Standings</div>
    </div>
    <div className="panel-body panel-black">
      <div className="list-group">
        <a href="/standings/2016-11" className="list-group-item">
          <h5 className="text-center">November</h5>
        </a>
      </div>
    </div>
  </div>
);

export default PicksWidget;