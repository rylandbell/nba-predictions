'use strict';

import React from 'react';
import { Link } from 'react-router';

// const Layout = React.createClass({
//   componentWillReceiveProps: function(newProps) {
//     // this.setState(this.getState(newProps));
//     console.log(newProps);
//   },
//   render: function () {
//     return (
//       <div>
//         <div className="container-fluid">
//           <nav className="navbar navbar-default navbar-fixed-top">
//             <div className="container-fluid container-navbar">
//               <div className="navbar-header">
//                 <button type="button" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false" className="navbar-toggle collapsed"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><a href="/" className="navbar-brand">Home</a>
//                 <ul className="nav navbar-nav">
//                 </ul>
//               </div>
//               <div id="navbar-collapse-1" className="collapse navbar-collapse">
//                 <ul className="nav navbar-nav navbar-right">
//                   <li><Link to="/app/">How to Play </Link></li>
//                   <li><a href="https://goo.gl/forms/iWjt8lWwQ815G77Y2" target="_blank">Feedback Form</a></li>
//                   <li><a href="/login">Sign Out</a></li>
//                 </ul>
//               </div>
//             </div>
//           </nav>
//         </div>
//         <div className="main">
//           <div className="container container-body">
//             <div className="row">
//               <div className="col-xs-12">
//                 {this.props.children}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// });

const LayoutOld = (props) => {
return (
  <div>
    <div className="container-fluid">
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid container-navbar">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false" className="navbar-toggle collapsed"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><a href="/" className="navbar-brand">Home</a>
            <ul className="nav navbar-nav">
            </ul>
          </div>
          <div id="navbar-collapse-1" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/app/">How to Play </Link></li>
              <li><a href="https://goo.gl/forms/iWjt8lWwQ815G77Y2" target="_blank">Feedback Form</a></li>
              <li><a href="/login">Sign Out</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div className="main">
      <div className="container container-body">
        <div className="row">
          <div className="col-xs-12">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default LayoutOld;