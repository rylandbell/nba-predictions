'use strict';

import React from 'react';
import { Link } from 'react-router';

const DashboardJumbotron = () => (
  <div className="jumbotron dashboard-jumbotron full-height-child">
    <div className="panel panel-default panel-dashboard">
      <div className="panel-body">    
        <h5 className="text-center"> Not sure what's happening? Need clarification about the rules?</h5>
        <h5 className="text-center"> Check out the&nbsp;
          <Link to="/how-to-play">How to Play</Link>
          &nbsp;page.
        </h5>
      </div>
    </div>
  </div>
);
    

export default DashboardJumbotron;
