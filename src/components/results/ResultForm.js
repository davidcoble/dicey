import React from 'react';
import moment from 'moment';

export default class ResultForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rollType: props.result ? props.result.rollType : '',
            range: props.result ? props.result.range : '',
            createdAt: props.result ? moment(props.result.createdAt) : moment(),
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
        this.setState(() => ({ turnList }));
    };
    onRangeChange = (e) => {
        const range = e.target.value;
        this.setState(() => ({ range }));
    };
    onRollTypeChange = (e) => {
        const rollType = e.target.value;
        this.setState(() => ({ rollType }));

    };
    onSubmit = (e) => {
        e.preventDefault();

        this.setState(() => ({ error: '' }));
        this.props.onSubmit({
            name: this.state.name,
            description: this.state.description,
            sides: this.state.sides,
            turnList: this.state.turnList,
            createdAt: this.state.createdAt.valueOf(),
            createdBy: this.state.createdBy.valueOf()
        });
    };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className='colForm'>
                    <div className='rowForm'>
                        <div className='colForm ten-per'>
                            <p>Roll Type</p>
                            <input
                                type='text'
                                placeholder='Roll Type'
                                autoFocus
                                value={this.state.rollType}
                                onChange={this.onRollTypeChange}
                            />
                        </div>
                        <div className='colForm ten-per'>
                            <p>result range</p>
                            <input
                                type='text'
                                placeholder='Range'
                                value={this.state.range}
                                onChange={this.state.onRangeChange}
                            />
                        </div>
                    </div>
                    <div >
                        <button className='button'>Save Roll Type</button>
                    </div>
                </div>
            </form>
        )
    }
}

