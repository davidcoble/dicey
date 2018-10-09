import React from 'react';
import moment from 'moment';

export default class ChatChannelForm extends React.Component {
    constructor(props) {
        super(props);
        console.log("[ChatChannelForm] props = " + JSON.stringify(props, null, 4));
        this.state = {
            name: props.chat ? props.chat.name : '',
            description: props.chat ? props.chat.description : '',
            channel: props.channel.id ? props.channel.id : '',
            createdAt: props.chat ? moment(props.chat.createdAt) : moment(),
            error: ''
        };
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));

    };
    onSubmit = (e) => {
        e.preventDefault();

        this.setState(() => ({ error: '' }));
        this.props.onSubmit({
            name: this.state.name,
            channel: this.state.channel,
            createdAt: this.state.createdAt.valueOf(),
        });
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Message"
                    autoFocus
                    // className="text-input"
                    value={this.state.name}
                    onChange={this.onNameChange}
                />
            </form>
        )
    }
}
