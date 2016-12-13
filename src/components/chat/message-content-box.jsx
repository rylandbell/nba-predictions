'use strict';

import React from 'react';

import Helper from '../../helper.jsx';

//handles paragraph breaks in message text
const api = ({content}) => (
    <div className="message-content">{Helper.formatMessage(content)}</div>
);

export default api;