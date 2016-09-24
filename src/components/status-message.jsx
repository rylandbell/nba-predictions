'use strict';

import React from 'react';

const api = ({messageBold, messageBody, messageClass}) => {

  return (
    <div className={'status-message alert alert-'+messageClass}>
      <strong>
        {messageBold}
      </strong>
      {'\t'+messageBody}
    </div>
  );
};

export default api;