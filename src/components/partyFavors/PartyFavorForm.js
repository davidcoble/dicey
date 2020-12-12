import React from 'react';
import {connect} from "react-redux";

export class PartyFavorForm extends React.Component {
    constructor(props) {
        super(props);
        // console.log("RollEpilogueForm.onEpilogueChange props = " +
        //     JSON.stringify(props, null, 2));

        this.state = {
            ...props
        };
    }

    onPartyFavorChange = (e) => {
        //console.log("onPartyFavorChange e.target.value= " + JSON.stringify(e.target.value));
        if (e.target.value === 'x') {
            this.state.partyFavor.alreadyGot = false;
        }
        if (e.target.value === '+') {
            this.state.partyFavor.alreadyGot = true;
        }
        // console.log("RollEpilogueForm.onEpilogueChange epilogue = " +
        //     JSON.stringify(epilogue));
        // console.log("RollEpilogueForm.onEpilogueChange this.state = " +
        //     JSON.stringify(this.state, null, 2));
        this.props.onSubmit({
            id: this.props.pfid,
            partyFavor: this.state.partyFavor
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type='button'
                    placeholder='epilogue'
                    value='x'
                    onClick={this.onPartyFavorChange}
                />
                {this.props.partyFavor.description}
                <input
                    type='button'
                    placeholder='epilogue'
                    value='+'
                    onClick={this.onPartyFavorChange}
                />
            </form>
        )
    }
}

const mapStateToProps = (state, props) => {
    // console.log("epilogue state.rolls = " + JSON.stringify(state.rolls, null, 2))
    // console.log("epilogue props = " + JSON.stringify(props, null, 2))
    let partyFavor= state.partyFavors.find((r) => {return r.id === props.pfid})
    // console.log("epilogue roll = " + JSON.stringify(roll, null, 2))
    return {
        partyFavor: partyFavor
    };
};

export default connect(mapStateToProps)(PartyFavorForm);
