import React from 'react';
import PlayerList from './PlayerList';
import { startHideNotPlaying } from '../../actions/players';
import {connect} from "react-redux";

export class PlayerManagementPage extends React.Component {


    render() {
        return (
            <div>
                <PlayerList/>
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
export default connect(mapStateToProps, mapDispatchToProps)(PlayerManagementPage);
