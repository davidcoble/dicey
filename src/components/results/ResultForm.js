import React from 'react';
import moment from 'moment';
import { startAddResult, startEditResult, startRemoveResult } from "../../actions/results";
import { connect } from "react-redux";
import ResultBoxCheckbox from './ResultBoxCheckbox';

class ResultForm extends React.Component {
    constructor(props) {
        super(props);
        // console.log("ResultForm props = " + JSON.stringify(props, null, 2));
        this.state = { ...props };
        // id: props.result ? props.result.id : '',
        // rollType: props.result ? props.result.rollType : '',
        // dice: props.result ? props.result.dice : '',
        // sides: props.result ? props.result.sides : '',
        // outcomes: props.result.outcomes ? props.result.outcomes : [],
        // createdAt: props.result ? moment(props.result.createdAt) : moment(),
        // createdBy: '',
        // error: ''
        // };
    }
    onDiceChange = (e) => {
        e.preventDefault();
        const dice = e.target.value;
        if (dice.match(/^\d*$/)) {
            let result = { ...this.state.result }
            result.dice = dice;
            // let outcomes = [];
            // for (let x = result.dice; x < result.dice * result.sides; x++) {
            //     if (result.outcomes[x - result.dice] !== undefined) {
            //         outcomes[x - result.dice] = { ...result.outcomes[x - result.dice] };
            //     }
            // }
            // result.outcomes = outcomes;
            this.setState({ result }, () => {
                console.log("this.state.result = " + JSON.stringify(this.state.result, null, 2));
                this.props.startEditResult(this.state.result.id, this.state.result);
            });
        }

    };
    onSidesChange = (e) => {
        e.preventDefault();
        const sides = e.target.value;
        if (sides.match(/^\d*$/)) {
            let result = { ...this.state.result }
            result.sides = sides;
            this.setState({ result }, () => {
                console.log("this.state.result = " + JSON.stringify(this.state.result, null, 2));
                this.props.startEditResult(this.state.result.id, this.state.result);
            });
        }
    };
    onRollTypeChange = (e) => {
        e.preventDefault();
        const rollType = e.target.value;
        // console.log("onRollTypeChange called with new rollType = " + rollType);
        //let result = { ...this.state.result }
        this.state.result.rollType = rollType;
        // this.setState({ result }, () => {
        //     console.log("this.state.result = " + JSON.stringify(this.state.result, null, 2));
        //     this.props.startEditResult(this.state.result.id, this.state.result);
        // });
        let updates = { rollType: this.state.result.rollType };
        this.props.startEditResult(this.props.result.id, updates);
    };

    onBoxSelectionChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log("onBoxSelectionChange value = " + value);
        const bid = e.target.id;
        console.log("onBoxSelectionChange bid = " + bid);
        let result = { ...this.state.result };
        if (result.boxes === undefined) {
            result.boxes = {};
        }
        if (result.boxes[bid] === undefined) {
            result.boxes[bid] = { checked: false }
        }
        result.boxes[bid].checked = !result.boxes[bid].checked;
        this.setState({ result }, () => {
            // console.log("result = " + JSON.stringify(result, null, 2));
            this.props.startEditResult(this.state.result.id, this.state.result);
        });

    }

    onResultChange = (e) => {
        e.preventDefault();
        const resultText = e.target.value;
        console.log("ResultForm onResultChange called resultText = " + resultText);
        const id = e.target.id;
        const dice = this.state.result.dice;
        let index = id - dice;
        console.log("index = " + index);
        // let outcomes = [...this.state.result.outcomes];
        // let outcome = { ...outcomes[index] }
        // outcome.result = resultText;
        // console.log("this.state.id = " + JSON.stringify(this.state.result.id));
        // outcomes[index] = outcome;
        // console.log("result change result = " + result + " key = " + key + " dice = " + dice);
        // console.log("outcomes = " + JSON.stringify(this.state.outcomes, null, 2));
        // console.log("outcomes = " + JSON.stringify(outcomes, null, 2));
        let result = { ...this.state.result };
        result.outcomes[index].result = resultText;
        this.setState({ result })
        console.log("result = " + JSON.stringify(result, null, 2));
        this.props.startEditResult(this.state.result.id, this.state.result);
    }
    resizeOutcomes = (e) => {
        e.preventDefault();
        let result = { ...this.state.result }
        let size = result.dice * result.sides;
        console.log("new size = " + size);
        let outcomes = [];
        for (let x = result.dice; x <= result.dice * result.sides; x++) {
            if (result.outcomes[x - result.dice] !== undefined) {
                outcomes[x - result.dice] = { ...result.outcomes[x - result.dice] };
            } else {
                outcomes[x - result.dice] = {
                    rolled: x,
                    result: 'you rolled a ' + x
                }
            }
        }
        // for (let x = result.dice; x <= result.dice * result.sides; x++) {
        // outcomes[x - result.dice] = {
        //     rolled: x,
        //     result: "your rolled " + x
        // }
        result.outcomes = outcomes;
        this.setState({ result }, () => {
            console.log("this.state.result = " + JSON.stringify(this.state.result, null, 2));
            this.props.startEditResult(this.state.result.id, this.state.result);
        });

    }
    onSubmit = (e) => {
        e.preventDefault();
        // console.log("this.state = " + JSON.stringify(this.state, null, 2));
        this.setState(() => ({ error: '' }));
        this.props.history.push("/results");
    };
    render() {
        // console.log("in ResultForm render, this.state = " + JSON.stringify(this.state));
        // console.log("in ResultForm render, this.props.boxes = " + JSON.stringify(this.props.boxes, null, 2));

        return (
            <form onSubmit={this.onSubmit}>
                <div className='colForm'>
                    <div className='rowForm'>
                        <div className='colForm ten-per'>
                            <p>Roll Type</p>
                            <input
                                autoFocus
                                type='text'
                                placeholder='Roll Type'
                                value={this.props.result.rollType}
                                onChange={this.onRollTypeChange}
                            />
                        </div>
                        <div className='colForm ten-per'>
                            <p>num dice</p>
                            <input
                                type='text'
                                placeholder='dice'
                                value={this.props.result.dice}
                                onChange={this.onDiceChange}
                                onBlur={this.resizeOutcomes}
                            />
                        </div>
                        <div className='colForm ten-per'>
                            <p>dice type</p>
                            <input
                                type='text'
                                placeholder='sides'
                                value={this.props.result.sides}
                                onChange={this.onSidesChange}
                                onBlur={this.resizeOutcomes}
                            />
                        </div>
                        <div className='colForm twenty-five-per'>
                            <div className='rowForm' key="-1">
                                <div className='colForm ten-per'>
                                    <p>
                                        Roll
                                    </p>
                                </div>
                                <div className='colForm fifteen-per'>
                                    <p>
                                        Result
                                    </p>
                                </div>
                            </div>
                            {
                                this.props.result.outcomes.map(
                                    (oc) => {
                                        return <div className='rowForm' key={oc.rolled}>
                                            <div className='colForm ten-per center'>
                                                <p>
                                                    {oc.rolled}
                                                </p>
                                            </div>
                                            <div className='colForm fifteen-per'>
                                                <input type='text'
                                                    key={oc.rolled}
                                                    id={oc.rolled}
                                                    onChange={this.onResultChange}
                                                    value={oc.result} />

                                            </div>
                                        </div>
                                    }
                                )
                            }
                        </div>
                        <div className='colForm twenty-five-per'>
                            <div className='rowForm'>
                                <p>Which box(es) use this roll type?</p>
                            </div>
                            {
                                this.state.boxes.map(
                                    (box) => {
                                        // console.log("box = " + JSON.stringify(box));
                                        let gobox = {name: box.name, checked: false, id: box.id};
                                        if (this.props.result.boxes !== undefined) {
                                            if (this.props.result.boxes[box.id]) {
                                                if (this.props.result.boxes[box.id].checked === true) {
                                                    gobox.checked = true;
                                                }
                                            }
                                        }
                                        return <div key={box.id}>
                                            <ResultBoxCheckbox box={gobox} onBoxSelectionChange={this.onBoxSelectionChange} />
                                        </div>
                                    }
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <button className='button'>Save Roll Type</button>
                    </div>
                    <div>{this.state.error}</div>
                </div>
            </form >
        )
    }
}

const mapStateToProps = (state, props) => {
    // console.log("state.results = " + JSON.stringify(state.results, null, 2));
    return {
        boxes: state.boxes,
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddResult: (result) => dispatch(startAddResult(result)),
    startEditResult: (id, result) => dispatch(startEditResult(id, result)),
    startRemoveResult: (id) => dispatch(startRemoveResult(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(ResultForm);
