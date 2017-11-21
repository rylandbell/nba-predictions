import React, { Component } from "react";
import { connect } from 'react-redux';

import {requestUserData, requestGameData} from '../actions/api-get.js';
import Navbar from "./navbar.jsx";

const mapStateToProps = state => ({
  dates: state.dates,
  apiData: state.apiData
});

const mapDispatchToProps = dispatch => ({
  getUserData: () => {
    dispatch(requestUserData());
  },
  getGameData: (month) => {
    dispatch(requestGameData(month));
  },
});

class Layout extends Component {
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

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

export default LayoutContainer;
