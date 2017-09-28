'use strict';

import React from 'react';
import CreateLeague from './create-league.jsx';
import JoinLeague from './join-league.jsx';
import MyLeaguesTable from './my-leagues-table.jsx';

const LeagueAdmin = ({noLeaguesJoined, enteredLeagueName, enteredLeagueId, isSendingCreateLeague, isSendingJoinLeague, user, handleLeagueNameTextChange, handleLeagueIdTextChange, sendCreateLeague, sendJoinLeague}) => {
  const reqPending = isSendingCreateLeague | isSendingJoinLeague;
  const reqPendingClass = reqPending ? 'send-waiting' : '';
  return (
    <div className={`row ${reqPendingClass}`}>
      <div className="col-xs-12 col-md-10 col-md-offset-1">
        <div className="panel panel-default">
          <div className="panel-body">
            {noLeaguesJoined ? 
              <div>
                <h3 className="text-center">Leagues</h3>
                <p> Welcome to Pigeon Hoops! Before you can play, you'll need to be a member of a league.</p>
                <hr />
              </div>
            :
              <div className="row">
                <div className="col-xs-12">
                  <MyLeaguesTable user = {user}/>
                </div>
              </div>
            }
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <CreateLeague enteredLeagueName = {enteredLeagueName} isSendingCreateLeague = {isSendingCreateLeague} handleLeagueNameTextChange = {handleLeagueNameTextChange} sendCreateLeague = {sendCreateLeague} />
              </div>
              <div className="col-xs-12 col-sm-6">
                <JoinLeague enteredLeagueId = {enteredLeagueId} isSendingJoinLeague = {isSendingJoinLeague} handleLeagueIdTextChange = {handleLeagueIdTextChange} sendJoinLeague = {sendJoinLeague} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueAdmin;