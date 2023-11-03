import React from 'react';
import GameList from './GameList';
import { connect } from "react-redux";
import { startDeleteMsg } from "../../actions/msgs";
import { startShowDeletedGames } from '../../actions/players';


export class GamesManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    }
    componentDidMount() {
        this.props.startDeleteMsg({ page: '/games' });
    }
    goToCreateGame = () => {
        this.props.history.push('/game/create');
    }
    setShowDeletedGames = () => {
        this.props.startShowDeletedGames(true);
    }
    unsetShowDeletedGames = () => {
        this.props.startShowDeletedGames(false);
    }
    render() {
        // console.log("GMP render state = " + JSON.stringify(this.state, null, 2));
        // console.log("GMP render props = " + JSON.stringify(this.props, null, 2));
        return (
            <div>
                {
                    this.state.msgs.map((msg) => {
                        return (
                            <div key={msg.id}>{msg.type}: {msg.text} ({msg.page})</div>
                        );
                    })
                }
                <div className='pageTitle'>{ this.props.showDeletedGames === true && <p>Deleted Games</p> || <p>Games</p> }</div>
                <button type='button' onClick={this.goToCreateGame}>create a game</button>
                { this.props.showDeletedGames !== true
                &&
                <button type='button' onClick={this.setShowDeletedGames}>show deleted games</button>
                ||
                <button type='button' onClick={this.unsetShowDeletedGames}>show active games</button>
                }
                <GameList />
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    //console.log("GamesManagementPage state = " + JSON.stringify(state, null, 2));
    let player = state.players.find((p) => (p.uid === state.auth.uid));
    // console.log("GMP player = " + JSON.stringify(player, null,2));
    
    let sDG = false;
    if (player !== undefined) {
        sDG = player.showDeletedGames;
    }
    // console.log("sDG = " + sDG);
    return {
        msgs: state.msgs,
        uid: state.auth.uid,
        showDeletedGames: sDG
    };
};
const mapDispatchToProps = (dispatch) => ({
    startDeleteMsg: (data) => dispatch(startDeleteMsg(data)),
    startShowDeletedGames: (data) => dispatch(startShowDeletedGames(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(GamesManagementPage);
