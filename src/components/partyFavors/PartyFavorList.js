import React from 'react';
import { connect } from 'react-redux';
import PartyFavorDetail from './PartyFavorDetail';
import {selectPartyFavors} from "../../selectors/partyFavors";

const PartyFavorList = (props) => (
    <div>
        <div>
            <p>List of Party Favors</p>
        </div>
        <div>
            {
                props.partyFavors.length === 0 ? (
                    <div>No Party Favors</div>
                ) : (
                    props.partyFavors.map((partyFavor) => {
                        return <PartyFavorDetail key={partyFavor.id} {...partyFavor} />
                    })
                )
            }
        </div>
    </div>
);
const mapStateToProps = (state) => {
    //console.log("state.partyFavors = " + JSON.stringify(state.partyFavors, null, 2));
    return {
        partyFavors: selectPartyFavors(state.partyFavors),
    };
};

export default connect(mapStateToProps)(PartyFavorList);
