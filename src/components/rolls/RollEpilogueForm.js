import React from 'react';
import {connect} from "react-redux";

export class RollEpilogueForm extends React.Component {
    constructor(props) {
        super(props);
        // console.log("RollEpilogueForm.onEpilogueChange props = " +
        //     JSON.stringify(props, null, 2));

        this.state = {
            ...props
        };
    }

    onEpilogueChange = (e) => {
        const epilogue = e.target.value;
        this.state.epilogue = epilogue;
        // console.log("RollEpilogueForm.onEpilogueChange epilogue = " +
        //     JSON.stringify(epilogue));
        // console.log("RollEpilogueForm.onEpilogueChange this.state = " +
        //     JSON.stringify(this.state, null, 2));
        this.props.onSubmit({
            id: this.props.rid,
            epilogue: this.state.epilogue
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        // console.log("RollEpilogueForm this.props=" + JSON.stringify(this.props, null, 2));
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    className={`colForm-epilogueForm ${this.props.color}`}
                    type='text'
                    placeholder='epilogue'
                    value={this.props.epilogue}
                    onChange={this.onEpilogueChange}
                />
            </form>
        )
    }
}

const mapStateToProps = (state, props) => {
    // console.log("epilogue state.rolls = " + JSON.stringify(state.rolls, null, 2))
    // console.log("epilogue props = " + JSON.stringify(props, null, 2))
    let roll= state.rolls.find((r) => {return r.id === props.rid})
    // console.log("epilogue roll = " + JSON.stringify(roll, null, 2))
    return {
        epilogue: roll.epilogue
    };
};

export default connect(mapStateToProps)(RollEpilogueForm);
