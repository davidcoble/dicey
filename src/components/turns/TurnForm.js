import React from 'react';
import moment from 'moment';

export default class TurnForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.turn ? props.turn.name : '',
            description: props.turn ? props.turn.description : '',
            createdAt: props.turn ? moment(props.turn.createdAt) : moment(),
            createdBy: '',
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
            createdBy: this.state.createdBy.valueOf()
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
                    <button className="button">Save Turn</button>
                </div>
            </form>
        )
    }
}
