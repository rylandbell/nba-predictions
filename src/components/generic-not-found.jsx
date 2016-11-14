'use strict';

import React from 'react';

const GenericNotFound = () => {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-6 col-md-offset-3">
        <div className="panel panel-default">
          <div className="panel-body">
            <h4>Not Found</h4>
            <p> It looks like you've either you've followed a bad link or entered a bad URL. Try&nbsp; 
              <a href="/app/">going home</a> 
              &nbsp;to remedy.
            </p>
            <p> If you think you've received this message in error, please let me know via my &nbsp;
              <a href="https://goo.gl/forms/iWjt8lWwQ815G77Y2" target="_blank">feedback form</a>
            . </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericNotFound;