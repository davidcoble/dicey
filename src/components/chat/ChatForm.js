import React from 'react';
import moment from 'moment';

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.chat ? props.chat.name : '',
            description: props.chat ? props.chat.description : '',
            createdAt: props.chat ? moment(props.chat.createdAt) : moment(),
            error: ''
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));

    };
    onSubmit = (e) => {
        e.preventDefault();

        this.setState(() => ({ error: '' }));
        this.props.onSubmit({
            name: this.state.name,
            description: this.state.description,
            createdAt: this.state.createdAt.valueOf(),
        });
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    autoFocus
                    className="text-input"
                    value={this.state.name}
                    onChange={this.onNameChange}
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <div>
                    <button className="button">Save Chat</button>
                </div>
            </form>
        )
    }
}
