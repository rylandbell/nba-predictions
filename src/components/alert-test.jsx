//http://react-s-alert.jsdemo.be/

import React from 'react';
import Alert from 'react-s-alert';
 
class Home extends React.Component {
  handleClick(e) {
    e.preventDefault();
    console.log(this);
    this.props.showAlert('info','hey there', {});
  }
  handleClick1(e) {
    e.preventDefault();
    Alert.error('Whoops, that game has already started! Predictions can only be submitted for games before they begin.', {
      position: 'bottom',
      effect: 'stackslide',
      onShow: function () {
        console.log('aye!')
      },
      beep: true,
      timeout: 8000,
      offset: 0
    });
  }
  handleClick2(e) {
    e.preventDefault();
    Alert.info('Loading game data...just sit tight.', {
      position: 'top-left',
      effect: 'slide',
      timeout: 'none',
      offset: 50
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
          <a href="#" onClick={this.handleClick1}>Error/Bottom</a> |
          <a href="#" onClick={this.handleClick2}>Data Loading</a> |
          <a href="#" onClick={this.handleClick}>Click 3</a> |
          <a href="#" onClick={this.handleCloseAll}>Close All</a>
        </div>
      </div>
    )
  }
}
 
export default Home;