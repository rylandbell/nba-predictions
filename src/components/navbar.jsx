'use strict';

import React from 'react';
import Link from 'react-router/lib/Link';

const Navbar = () => {
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
              <li>
                <Link to="/how-to-play">How to Play </Link>
              </li>
              <li>
                <a href="https://goo.gl/forms/iWjt8lWwQ815G77Y2" target="_blank">Feedback</a>
              </li>
              <li>
                <a href="/login">Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;