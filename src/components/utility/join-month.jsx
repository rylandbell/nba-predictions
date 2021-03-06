import React, { Component } from "react";

class JoinMonth extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // Join button should also serve to exit dashboard page's intro:
    if (this.props.showDashboardTour) {
      window.dashboardIntro.exit(true);
    }

    this.props.createNewUserMonth(
      this.props.activeMonth,
      this.props.activeLeagueId
    );
  }
  render() {
    return (
      <div>
        <p>
          {" "}It looks like you haven't yet joined the
          {" "}{moment(this.props.activeMonth).format("MMMM")} competition.
          Click below to sign up:
          {" "}
        </p>
        <p>
          <button
            onClick={this.handleClick}
            className="btn btn-primary center-block"
          >
            Sign up for {moment(this.props.activeMonth).format("MMMM")}
          </button>
        </p>
        <p>
          {" "}You are welcome to join at any point in the month. If it's too
          late to catch up with the other players, you can at least get some
          practice for next month.
        </p>
      </div>
    );
  }
}

export default JoinMonth;
