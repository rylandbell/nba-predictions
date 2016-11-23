'use strict';

import React from 'react';
import { Link } from 'react-router';

const fakeTitles = ['Ball Occassionally Lies', 'The Pick & Roll', 'The Pick & Pop', 'Pigeon Hoops', 'The Pigeon Hoops Principle', 'The Van Gundy Dilemma'];
const randomTitle = fakeTitles[Math.floor(Math.random()*fakeTitles.length)]

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
            <Link to="/" className="navbar-brand text-primary">{randomTitle}</Link>
            <ul className="nav nav-pills navbar-nav">
              {/*<li>
                <Link to={"/picks/"+todayPath}>
                  <span className="nav-strong"> My Picks </span>
                </Link>
              </li>*/}
            </ul>
          </div>
          <div id="navbar-collapse-1" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
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