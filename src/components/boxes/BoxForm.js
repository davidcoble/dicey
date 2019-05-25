import React from 'react';
import moment from 'moment';

export default class BoxForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.box ? props.box.name : '',
            description: props.box ? props.box.description : '',
            turnList: props.box ? props.box.turnList : '',
            createdAt: props.box ? moment(props.box.createdAt) : moment(),
            createdBy: '',
            error: ''
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onTurnListChange = (e) => {
        const turnList = e.target.value;
        // console.log("new Turn List = " + turnList);
        this.setState(() => ({ turnList}));
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
            turnList: this.state.turnList,
            createdAt: this.state.createdAt.valueOf(),
            createdBy: this.state.createdBy.valueOf()
        });
    };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="rowForm" >
                    <div className="colForm" >
                        {this.state.error && <p className="form__error">{this.state.error}</p> || <p>&nbsp;</p>}
                        <input
                            type="text"
                            placeholder="Name"
                            autoFocus
                            className="box-text-input"
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="box-text-input"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                        />
                        <div>
                            <button className="button">Save Box</button>
                        </div>
                    </div>
                    <div className="colForm" >
                        <p>Enter one turn name per line</p>
                        <textarea onChange={this.onTurnListChange} value={this.state.turnList} className="turnListArea" />
                    </div>
                </div>
            </form>
        )
    }
}


/*
Autumn I 1939
Autumn II 1939
Winter I 1939
Winter II 1940
Spring I 1940
Spring II 1940
Summer I 1940
Summer II 1940
Summer III 1940
Autumn I 1940
Autumn II 1940
*/
