import { connect } from 'react-redux';
import React, { Component } from "react";

import FullStandingsHeader from "./full-standings-header.jsx";
import FullStandingsRow from "./full-standings-row.jsx";
import StatusMessage from "../status-message.jsx";

const mapStateToProps = state => ({
  activeMonth: state.dates.activeMonth,
  standingsData: state.apiData.standingsData,
  isFetchingStandingsData: state.fetchStatus.isFetchingStandingsData
});

const mapDispatchToProps = () => ({
});

class FullStandingsPage extends Component {
  componentDidMount() {
    document.title = document.title.split(" | ")[0] + " | Standings";
  }
  render() {
    return (
      <div className="panel panel-default panel-black ">
        <div className="panel-heading">
          <div className="panel-title">
            {moment(this.props.activeMonth).format("MMMM YYYY")} - Full Results
          </div>
        </div>
        <div className="panel-body">
          <p className="small text-center">
            {" "}
            Game results are posted daily at midnight Pacific time.
          </p>
          {this.props.isFetchingStandingsData
            ? <StatusMessage
                messageBold={"Loading standings data..."}
                messageBody={"Just hang tight."}
                messageClass={"info"}
              />
            : <div className="standings--full">
                <table className="table table-bordered standings__table--full">
                  <FullStandingsHeader activeMonth={this.props.activeMonth} />
                  <tbody>
                    {this.props.standingsData.map((player, key) =>
                      <FullStandingsRow
                        player={player}
                        key={key}
                        activeMonth={this.props.activeMonth}
                      />
                    )}
                  </tbody>
                </table>
              </div>}
        </div>
      </div>
    );
  }
}

const FullStandingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FullStandingsPage);

export default FullStandingsPageContainer;
