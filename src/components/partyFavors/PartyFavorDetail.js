import React from 'react';
import { startEditPartyFavor } from "../../actions/partyFavors";
import { connect } from 'react-redux';
import PartyFavorForm from "./PartyFavorForm";

export class PartyFavorDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    };

    onSubmitPartyFavor = (e) => {
        //console.log("onSubmit this.props.partyFavor = " + JSON.stringify(this.props.partyFavor));
        e.updates = { partyFavor: this.props.partyFavor };
        this.props.startEditPartyFavor(e);
    };

    render() {
        //console.log("rendering this.props.partyFavor = " + JSON.stringify(this.state.partyFavor));
        return (
            <div>
                <PartyFavorForm
                    pfid={this.state.id}
                    partyFavor={this.state.partyFavor}
                    onSubmit={this.onSubmitPartyFavor}
                />
                <br/>got = {this.props.partyFavor.alreadyGot ? 'yep' : 'no'} uuid = {this.props.partyFavor.uuid}
                <br/>JSON = {JSON.stringify(this.props.partyFavor, null, 2)}
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    //console.log("props.id = " + props.id);
    let pf = state.partyFavors.find((pf) => {
        //console.log("pf = " + JSON.stringify(pf));
        return pf.id === props.id
    });
    //console.log("xxx pf = " + JSON.stringify(pf));

    return {
        partyFavor: pf
    }
};


const mapDispatchToProps = (dispatch, props) => {

    return {
        startEditPartyFavor: (partyFavor) => {
            //console.log("mapDispatchToProps partyFavor = " + JSON.stringify(partyFavor));
            dispatch(startEditPartyFavor(partyFavor));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PartyFavorDetail);