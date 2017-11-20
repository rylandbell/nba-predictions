import React from "react";

import CreateLeague from "./create-league.jsx";
import JoinLeague from "./join-league.jsx";
import MyLeaguesTable from "./my-leagues-table.jsx";

const LeagueAdmin = ({
  noLeaguesJoined,
  enteredLeagueName,
  enteredJoinPhrase,
  isSendingCreateLeague,
  isSendingJoinLeague,
  user,
  handleLeagueNameTextChange,
  handleLeagueIdTextChange,
  sendCreateLeague,
  sendJoinLeague
}) => {
  const reqPending = isSendingCreateLeague | isSendingJoinLeague;
  const reqPendingClass = reqPending ? "send-waiting" : "";
  return (
    <div className={`row ${reqPendingClass}`}>
      <div className="col-xs-12 col-md-10 col-md-offset-1">
        <div className="well">
          <div className="panel-bodyy">
            {noLeaguesJoined
              ? <div>
                  <h3 className="text-center">Welcome to Pigeon Hoops!</h3>
                  <p className="lead text-center">
                    {" "}Before playing, you'll need to join a league. What
                    would you like to do?
                  </p>
                  <br />
                </div>
              : <div className="row">
                  <div className="col-xs-12">
                    <MyLeaguesTable user={user} />
                  </div>
                </div>}

            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <CreateLeague
                  enteredLeagueName={enteredLeagueName}
                  isSendingCreateLeague={isSendingCreateLeague}
                  handleLeagueNameTextChange={handleLeagueNameTextChange}
                  sendCreateLeague={sendCreateLeague}
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <JoinLeague
                  enteredJoinPhrase={enteredJoinPhrase}
                  isSendingJoinLeague={isSendingJoinLeague}
                  handleLeagueIdTextChange={handleLeagueIdTextChange}
                  sendJoinLeague={sendJoinLeague}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueAdmin;
