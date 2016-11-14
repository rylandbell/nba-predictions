'use strict';

import React from 'react';

const UserMonthNotFound = () => {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-6 col-md-offset-3">
        <div className="panel panel-default">
          <div className="panel-body">
            <h4>Not Found</h4>
            <p> Either you've found a bad URL, or you haven't yet signed up for the given month. Try&nbsp; 
              <a href="/">going home</a> 
              &nbsp;to remedy.
            </p>
            <p>If you think you've received this message in error, please let me know via my 
              <a href="https://goo.gl/forms/iWjt8lWwQ815G77Y2" target="_blank">&nbsp;feedback form</a>
              . 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMonthNotFound;