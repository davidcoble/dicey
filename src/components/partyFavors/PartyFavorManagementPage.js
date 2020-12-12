import React from 'react';
import { startHideNotPlaying } from '../../actions/players';
import {connect} from "react-redux";
import PartyFavorList from "./PartyFavorList";

export class PartyFavorManagementPage extends React.Component {


    render() {
        return (
            <div>
                <PartyFavorList/>
            </div>

        );
    }
}
const mapStateToProps = (state, props) => {
    return {

    };
};
const mapDispatchToProps = (dispatch, props) => ({
    startHideNotPlaying: (id, props) => dispatch(startHideNotPlaying(id, props.hideNotPlaying))
});
export default connect(mapStateToProps, mapDispatchToProps)(PartyFavorManagementPage);
