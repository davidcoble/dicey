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
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Deleting Chat</h1>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    // console.log("ChatEditPage mapStateToProps state.chat = " + JSON.stringify(state.chat, null, 4));
    return {
        chat: state.chat.find((chat) => chat.id === props.match.params.id)
    };
}

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveChat: (data) => dispatch(startRemoveChat(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatDeletePage);
