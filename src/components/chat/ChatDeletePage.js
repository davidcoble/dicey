import React from 'react';
import { connect } from 'react-redux';
import ChatForm from './ChatForm';
import { startEditChat, startRemoveChat } from '../../actions/chat';

export class ChatDeletePage extends React.Component {
    componentWillMount() {
        this.props.startRemoveChat({ id: this.props.chat.id });
        this.props.history.push('/chats');
    }
    render() {
        return (<div></div>);
    }
};

const mapStateToProps = (state, props) => ({
    chat: state.chats.find((chat) => chat.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditChat: (id, chat) => dispatch(startEditChat(id, chat)),
    startRemoveChat: (data) => dispatch(startRemoveChat(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatDeletePage);
