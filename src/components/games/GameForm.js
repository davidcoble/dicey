import React from 'react';
import Select from 'react-select';
import moment from 'moment';

export default class GameForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.game ? props.game.name : '',
            description: props.game ? props.game.description : '',
            box: props.game ? props.game.box : '',
            createdAt: props.game ? moment(props.game.createdAt) : moment(),
            createdBy: '',
            error: '',
            boxes: props.boxes ? props.boxes : []
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onBoxChange = (box) => {
        //const box = e.target.value;
        this.setState(() => ({ box }));
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
            box: this.state.box,
            createdAt: this.state.createdAt.valueOf(),
            createdBy: this.state.createdBy.valueOf()
        });
    };
    render() {
        let boxNames = [];
        console.log("this.state = " + JSON.stringify(this.state, null, 2));
        this.state.boxes.map((box) => {
            console.log("box = " + JSON.stringify(box));
            boxNames.push({value: box.id, label: box.name});
        });
        return (
            <div>

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
                    <Select
                        value={this.state.box}
                        onChange={this.onBoxChange}
                        options={boxNames}/>

                    <div>
                        <button className="button">Save Game</button>
                    </div>
                </form>
            </div>
        );
    };
};
