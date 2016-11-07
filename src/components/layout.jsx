'use strict';

import React from 'react';

import Navbar from './navbar.jsx';

const LayoutComponent = React.createClass({
  componentWillReceiveProps: function(newProps) {
    // this.setState(this.getState(newProps));
    console.log(newProps.children);
  },
  render: function () {
    return (
      <div>
        <Navbar />
        <div className="main">
          <div className="container container-body">
            <div className="row">
              <div className="col-xs-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// const LayoutComponent = (props) => {
//   return (
//     <div>
//       <Navbar />
//       <div className="main">
//         <div className="container container-body">
//           <div className="row">
//             <div className="col-xs-12">
//               {props.children}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default LayoutComponent;