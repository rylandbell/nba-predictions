'use strict';

import React from 'react';

const JoinMonth = ({createNewUserMonth}) => (
  <div>
    <p> It looks like you haven't made any picks yet this month. Click the button below to join the {moment().format('MMMM')} competition: </p>
    <p>
      <button onClick={createNewUserMonth} className="btn btn-primary center-block">Get Started</button>
    </p>
    <p> You are welcome to join at any point in the month. If it's too late to be competitive, you can at least get some practice for next month.</p>
  </div>
);
    

export default JoinMonth;