import React, { Component } from "react";

class JoinLeague extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTextEntry = this.handleTextEntry.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    if (this.props.isSendingJoinLeague) {
      return;
    }
    this.props.sendJoinLeague(this.props.enteredJoinPhrase);
  }
  handleTextEntry(e) {
    this.props.handleLeagueIdTextChange(e.target.value);
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h4 className="text-center">Join a Friend's League</h4>
          <hr />
          <p>
            To join a league, enter the league's pass phrase below. (A pass
            phrase is a randomly generated pair of words, like "frightening
            sneeze".) If you don't know the phrase, ask somebody in the league.
          </p>
          <br />
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-xs-9">
                <input
                  type="text"
                  className="form-control"
                  id="leagueId"
                  value={this.props.enteredJoinPhrase}
                  maxLength="24"
                  placeholder="Enter league pass phrase..."
                  onChange={this.handleTextEntry}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleClick}
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default JoinLeague;
