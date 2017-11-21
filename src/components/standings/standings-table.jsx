import { connect } from 'react-redux';

import React, { Component } from "react";
import browserHistory from "react-router/lib/browserHistory";

import StandingsTableHeader from "./standings-table-header.jsx";
import StandingsTableRow from "./standings-table-row.jsx";
import StatusMessage from "../status-message.jsx";

const mapStateToProps = state => ({
  activeMonth: state.dates.activeMonth,
  currentMonth: state.dates.currentMonth,
  standingsData: state.apiData.standingsData,
  isFetchingStandingsData: state.fetchStatus.isFetchingStandingsData
});

const mapDispatchToProps = () => ({
});

class StandingsTable extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const path = "/standings";
    browserHistory.push(path);
  }
  render() {
    return (
      <div className="panel panel-default panel-black" id="standings">
        <div className="panel-heading">
          <div className="panel-title">
            {moment(this.props.activeMonth).format("MMMM YYYY")} Standings
          </div>
        </div>
        <div className="panel-body">
          <p className="small text-center">
            {" "}
            Other users' picks are revealed when the chosen game begins. View
            all results for the month&nbsp;
            <a href="#" onClick={this.handleClick}>here</a>
            .
          </p>

          {this.props.isFetchingStandingsData
            ? <StatusMessage
                messageBold={"Loading standings data..."}
                messageBody={"Just hang tight."}
                messageClass={"info"}
              />
            : <div>
                <div className="standings">
                  <table className="table table-bordered">
                    <StandingsTableHeader
                      activeMonth={this.props.activeMonth}
                      currentMonth={this.props.currentMonth}
                    />
                    <tbody>
                      {this.props.standingsData.map((player, key) =>
                        <StandingsTableRow
                          player={player}
                          key={key}
                          activeMonth={this.props.activeMonth}
                          currentMonth={this.props.currentMonth}
                        />
                      )}
                    </tbody>
                  </table>
                </div>
                <p className="small text-center">
                  {" "}
                  Game results are posted daily at midnight Pacific time.
                </p>
              </div>}
        </div>
      </div>
    );
  }
}

const StandingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StandingsTable);

export default StandingsContainer;
