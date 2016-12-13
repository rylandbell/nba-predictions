'use strict';

import { connect } from 'react-redux';

import ActiveConversation from '../chat/active-conversation.jsx';
// import ActionCreator from '../../action-creators.jsx';
// import Helper from '../../helper.jsx';

const dummyCorrespondence = {
  correspondent: 'Festus Ezeli',
  messages: [
    {sender: 'Snyder House Rules',
    content: 'Hey hey, look whose winning this month. Another couple correct picks and its time to celebrate.'
    },
    {sender: 'Captain Hart',
    content: 'To my surprise, it is not the kiss of death I had imagined. After reading it, I concluded that e-cigarettes are nowhere nearly as harmful for most people as traditional cigarettes or chewing tobacco—both of which clearly cause cancer and a host of other long-term serious medical problems.'
    },
    {sender: 'LeBron',
    content: 'Hey hey, look whose winning this month. Another couple correct picks and its time to celebrate.'
    },
    {sender: 'Kyrie',
    content: 'To my surprise, it is not the kiss of death I had imagined. After reading it, I concluded that e-cigarettes are nowhere nearly as harmful for most people as traditional cigarettes or chewing tobacco—both of which clearly cause cancer and a host of other long-term serious medical problems.'
    },
    {sender: 'LeBron',
    content: 'Hey hey, look whose winning this month. Another couple correct picks and its time to celebrate.'
    },
    {sender: 'Kyrie',
    content: 'To my surprise, it is not the kiss of death I had imagined. After reading it, I concluded that e-cigarettes are nowhere nearly as harmful for most people as traditional cigarettes or chewing tobacco—both of which clearly cause cancer and a host of other long-term serious medical problems.'
    },
    {sender: 'Captain Hart',
    content: 'Hey hey'
    },
    {sender: 'Snyder House Rules',
    content: 'To my surprise, it is not the kiss of death I had imagined. After reading it, I concluded that e-cigarettes are nowhere nearly as harmful for most people as traditional cigarettes or chewing tobacco—both of which clearly cause cancer and a host of other long-term serious medical problems.'
    }
  ]
};

const mapStateToProps = (state) => ({
  // activeCorrespondence: state.activeCorrespondence,
  // enterToSendStatus: state.enterToSendStatus,
  // enteredText: state.enteredText
  activeCorrespondence: dummyCorrespondence,
  enterToSendStatus: state.enterToSendStatus,
  enteredText: state.enteredText
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleTextChange:
    (e) => {
      e.preventDefault();
      // dispatch(ActionCreator.textEntry(e.target.value));
    },
  handleCheckboxChange:
    (e) => {
      // dispatch(ActionCreator.checkboxUpdate(e.target.checked));
    },
  handleSubmit:
    (e) => {
      // e.preventDefault();
      // if(ownProps.reduxState.enteredText === ''){
      //   return;
      // } else {
      //   dispatch(ActionCreator.sendMessage(Helper.addMessageProps(ownProps.reduxState.enteredText)));
      // }
    },
  listenForEnter:
    (e) => {
      // if(e.charCode===13 && ownProps.reduxState.enterToSendStatus){
      //   e.preventDefault();
      //   $('.new-message-form input[type="submit"]').click();
      // }
    }
});

const api = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveConversation);

export default api;