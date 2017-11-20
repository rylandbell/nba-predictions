import React, { Component } from "react";

const getPick = (userMonth, day) => {
  if (
    userMonth.predictedWinners[day] &&
    userMonth.predictedWinners[day].teamName
  ) {
    return userMonth.predictedWinners[day].teamName.toLowerCase();
  } else {
    return "glyphicon glyphicon-minus";
  }
};

class UpcomingPicksTeam extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.goToDate(this.props.date);
  }
  render() {
    return (
      <td className="upcoming-picks-team" onClick={this.handleClick}>
        <div
          className={
            "center-block text-center " +
            getPick(this.props.activeUserMonth, this.props.day)
          }
        />
      </td>
    );
  }
}

export default UpcomingPicksTeam;
