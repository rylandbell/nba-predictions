import React, { Component } from "react";

class CreateLeague extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTextEntry = this.handleTextEntry.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    if (this.props.isSendingCreateLeague) {
      return;
    }
    this.props.sendCreateLeague(this.props.enteredLeagueName);
  }
  handleTextEntry(e) {
    this.props.handleLeagueNameTextChange(e.target.value);
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h4 className="text-center">Create a New League</h4>
          <hr />
          <p>
            When you press Create, you'll be added to a new league and given a
            randomly generated pass phrase you can send to others to invite them
            to join.
          </p>
          <br />
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-xs-9">
                <input
                  type="text"
                  className="form-control"
                  id="leagueName"
                  value={this.props.enteredLeagueName}
                  maxLength="20"
                  placeholder="Enter league name..."
                  onChange={this.handleTextEntry}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleClick}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateLeague;
