'use strict';

import React from 'react';
import Link from 'react-router/lib/Link';
import LeagueMonthPickerContainer from './containers/league-month-picker-container.jsx';

const Navbar = ({reduxState}) => {

  //Hide most of site nav from users who haven't joined a league.
  const newPlayer = !(reduxState.user && reduxState.user.leagues && reduxState.user.leagues.length > 0);
  
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid container-navbar">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {newPlayer ? null :
              <div>
                <Link to="/" className="navbar-brand text-primary">Pigeon Hoops</Link>
                <ul className="nav nav-pills navbar-nav">
                  <li className="hidden-xs">
                    <Link to={"/picks"}>
                      <span className="nav-strong">My Picks</span>
                    </Link>
                  </li>
                  <li className="hidden-xs">
                    <Link to={"/standings"}>
                      <span className="nav-strong">Standings</span>
                    </Link>
                  </li>
                </ul>
              </div>
            }
          </div>
          <div id="navbar-collapse-1" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              
              <li className="visible-xs">
                <Link to={"/picks"}>My Picks </Link>
              </li>
              <li className="visible-xs">
                <Link to="/standings">Standings</Link>
              </li>
              <li className="visible-xs">
                <Link to="/chat">Chat</Link>
              </li>

              <LeagueMonthPickerContainer />
              
              <li className="visible-xs">
                <Link to="/how-to-play">How to Play </Link>
              </li>
              <li className="visible-xs">
                <Link to="/leagues">Leagues</Link>
              </li>
              <li className="visible-xs">
                <a href="https://goo.gl/forms/iWjt8lWwQ815G77Y2" target="_blank">Feedback</a>
              </li>
              <li role="separator" className="divider"></li>
              <li className="visible-xs sign-out">
                <a href="/login">Sign Out</a>
              </li>

              <li className="dropdown hidden-xs">
                <a href="#" className="dropdown-toggle more-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> More <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/how-to-play">How to Play </Link>
                  </li>
                  <li>
                    <Link to="/leagues">Leagues</Link>
                  </li>
                  <li>
                    <a href="https://goo.gl/forms/iWjt8lWwQ815G77Y2" target="_blank">Feedback</a>
                  </li>
                  <li role="separator" className="divider"></li>
                  <li>
                    <a href="/login">Sign Out</a>
                  </li>
                </ul>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;