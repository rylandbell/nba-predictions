import React, { Component } from "react";

import Navbar from "./navbar.jsx";

class LayoutComponent extends Component {
  componentDidMount() {
    this.props.getUserData();
    this.props.getGameData(this.props.dates.activeMonth);
  }
  render() {
    return (
      <div>
        <Navbar apiData={this.props.apiData} />
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
}

export default LayoutComponent;
