'use strict';

import React from 'react';

import SingleGame from './single-game.jsx';

const api = ({reduxState}) => (
  <div className="row">
    {reduxState.map(
      (gameData, index) =>
        <SingleGame gameData={gameData} key={index} />
      )
    }
</div>
);

export default api;