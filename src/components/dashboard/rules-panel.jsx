import React, { Component } from "react";

class RulesPanel extends Component {
  componentDidMount() {
    document.title = document.title.split(" | ")[0] + " | How to Play";
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-8 col-md-offset-2">
          <div className="panel panel-default rules-panel">
            <div className="panel-heading">
              <div className="panel-title">How to Play</div>
            </div>
            <div className="panel-body">
              <h4> The Main Idea: </h4>
              <ul>
                <li>
                  This is a monthly competition.
                </li>
                <li>
                  Pick the winner of one game each day.
                </li>
                <li>
                  {" "}
                  Pick each team no more than once per month.
                </li>
                <li>
                  The player with the most correct picks at the end of the month
                  wins.
                </li>
              </ul>
              <hr />
              <h4> So what do I actually do? </h4>
              <ul>
                <li>
                  Click on the My Picks link on the homepage to view a list of
                  games for each day of the month.
                </li>
                <li>
                  Pick a winner by clicking on their logo. If the logo is
                  greyed-out, you have already chosen that team earlier in the
                  month.
                </li>
                <li>
                  {" "}
                  You can make your picks as you go, or you can pick as far
                  ahead in the month as you like.
                  {" "}
                </li>
                <li>
                  Picks are finalized once the game actually begins. Until then,
                  you can change your mind as many times as you want.
                </li>
              </ul>
              <hr />
              <h4> The Fine Print: </h4>
              <ul>
                <li>
                  Picks become visible to other players as soon as the game
                  begins.
                </li>
                <li>
                  Players are not required to choose a team every day (although
                  it's generally advantageous to do so).
                </li>
                <li>
                  Losses don't affect the standings. For example, a 6-3 player
                  will be listed in front of a 5-0 player.
                </li>
                <li>
                  There is no programmed tiebreaker right now. My best idea is
                  to favor the player who can boast a correct prediction with
                  the weakest team, but I'm open to suggestions.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RulesPanel;
