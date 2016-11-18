'use strict';

import React from 'react';

const JoinMonth = React.createClass({
  handleClick: function () {
    this.props.createNewUserMonth(this.props.getStandingsData);
  },
  render: function() {
    return (
      <div>
        <p> Click the button below to join the {moment().format('MMMM')} competition: </p>
        <p>
          <button onClick={this.handleClick} className="btn btn-primary center-block">Get Started</button>
        </p>
        <p> You are welcome to join at any point in the month. If it's too late to catch up with the other players, you can at least get some practice for next month.</p>
      </div>
    );
  }
});

// const JoinMonth = ({createNewUserMonth}) => (
//   <div>
//     <p> Click the button below to join the {moment().format('MMMM')} competition: </p>
//     <p>
//       <button onClick={createNewUserMonth} className="btn btn-primary center-block">Get Started</button>
//     </p>
//     <p> You are welcome to join at any point in the month. If it's too late to catch up with the other players, you can at least get some practice for next month.</p>
//   </div>
// );
  

export default JoinMonth;