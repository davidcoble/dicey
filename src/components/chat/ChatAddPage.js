import React from 'react';
import { connect } from 'react-redux';
import ChatForm from './ChatForm';
import { startAddChat } from '../../actions/chat';

export class ChatAddPage extends React.Component {
  onSubmit = (chat) => {
    this.props.startAddChat(chat);
    this.props.history.push('/chats');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Chat</h1>
          </div>
        </div>
        <div className="content-container">
          <ChatForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddChat: (chat) => dispatch(startAddChat(chat))
});

export default connect(undefined, mapDispatchToProps)(ChatAddPage);
