import React from 'react';
import { connect } from 'react-redux';
import ChatForm from './ChatForm';
import { startEditChat, startRemoveChat } from '../../actions/chat';

export class EditChatPage extends React.Component {
  onSubmit = (chat) => {
    this.props.startEditChat(this.props.chat.id, chat);
    this.props.history.push('/chats');
  };
  onRemove = () => {
    this.props.startRemoveChat({ id: this.props.chat.id });
    this.props.history.push('/chats');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Chat</h1>
          </div>
        </div>
        <div className="content-container">
          <ChatForm
            chat={this.props.chat}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Remove Chat</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  chat: state.chats.find((chat) => chat.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditChat: (id, chat) => dispatch(startEditChat(id, chat)),
  startRemoveChat: (data) => dispatch(startRemoveChat(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditChatPage);
