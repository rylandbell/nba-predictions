//http://react-s-alert.jsdemo.be/

import React from 'react';
import Alert from 'react-s-alert';
 
class Home extends React.Component {
  handleClick1(e) {
    e.preventDefault();
    Alert.error('Whoops, that game has already started! Predictions can only be submitted for games before they begin.', {
      position: 'bottom',
      effect: 'flip',
      onShow: function () {
        console.log('aye!')
      },
      beep: true,
      timeout: 5000,
      offset: 0
    });
  }
  handleClick2(e) {
    e.preventDefault();
    Alert.info('Test message 2', {
      position: 'bottom-left',
      effect: 'bouncyflip',
      timeout: 'none'
    });
  }
  handleClick3(e) {
    e.preventDefault();
    Alert.error('Test message 3', {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 'none'
    });
  }
  handleCloseAll(e) {
    e.preventDefault();
    Alert.closeAll();
  }
  render() {
    return (
      <div>
        <div>
          <a href="#" onClick={this.handleClick1}>Click 1</a> |
          <a href="#" onClick={this.handleClick2}>Click 2</a> |
          <a href="#" onClick={this.handleClick3}>Click 3</a> |
          <a href="#" onClick={this.handleCloseAll}>Close All</a>
        </div>
      </div>
    )
  }
}
 
export default Home;