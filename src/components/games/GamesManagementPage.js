import React from 'react';
import GameList from './GameList';
import {connect} from "react-redux";
import { startDeleteMsg } from "../../actions/msgs";

export class GamesManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }
    componentDidMount() {
        this.props.startDeleteMsg({page: '/games'});
    }
    render() {
        return (
            <div>
                {
                    this.state.msgs.map((msg) => {
                        return (
                            <div key={msg.id}>{msg.type}: {msg.text} ({msg.page})</div>
                        );
                    })
                }
                <GameList />
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    console.log("GamesManagementPage state.msgs = " + JSON.stringify(state.msgs, null, 2));
    return {
        msgs: state.msgs
    };
};
const mapDispatchToProps = (dispatch) => ({
    startDeleteMsg: (data) => dispatch(startDeleteMsg(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(GamesManagementPage);
