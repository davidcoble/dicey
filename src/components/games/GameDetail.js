import React from 'react';
import { connect } from 'react-redux';
import { selectGamePlayers } from '../../selectors/players';
import { startAddPlayerToGame, startRemovePlayerFromGame } from '../../actions/games';
import { history } from '../../routers/AppRouter';
import { startAddGameToPlayer, startRemoveGameFromPlayer, startSetPlayerRollingGame } from '../../actions/players';

export class GameDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    };
    joinGame = (e) => {
        e.preventDefault();
        this.props.startJoinGame({ pid: this.state.uid, gid: this.state.id })
    };
    quitGame = (e) => {
        e.preventDefault();
        let quitObj = { pid: this.state.uid, gid: this.state.id }
        console.log("quitObj = " + JSON.stringify(quitObj, null, 2));
        this.props.startQuitGame(quitObj)
    };
    viewGame = (e) => {
        e.preventDefault();
        this.props.startSetPlayerRollingGame({uid: this.state.uid, gid: this.state.id});
        history.push('/rolls');
    }
    render() {
        console.log("GameDetail.render: this.props = " + JSON.stringify(this.props, null, 4));
        return (
            <div className='rowList'>
                <div className='gameDetail-rowName'>
                    <div className='gameName'>
                        Name
                    </div>
                    <div className='gameDeet'>
                        Box
                    </div>
                    <div className='gameDeet'>
                        Players
                    </div>
                </div>
                <div className='gameDetail-contents'>
                    <div className='gameName'>
                        <div className='rowList-gameDeet'>
                            <div>
                                {this.props.name}
                            </div>
                            <div>{
                                this.props.players.find((player) => {
                                    // console.log("player.uid = " + player.uid);
                                    // console.log("props.uid = " + props.uid);
                                    // console.log("about to return " + !!(player.uid === props.uid));
                                    return (player.uid === this.props.uid)
                                }) ? (
                                    <button className='buttonJoin' onClick={this.quitGame}>Quit</button>
                                ) : (
                                    <button className='buttonJoin' onClick={this.joinGame}>Join</button>
                                )
                            }
                            </div>
                        </div>
                    </div>
                    <div className='gameDeet'>
                        <div>
                            {this.props.box.label}
                        </div>
                    </div>
                    <div className='gameDeet'>
                        <div className='rowList'>
                            {
                                this.props.players.length === 0 ? (
                                    <div>No players</div>
                                ) : (
                                    this.props.players.map((player) => {
                                        return (<div className='playerBox'> {player.name} </div>);
                                    })
                                )


                            }
                        </div>
                    </div>
                </div>
                {
                    this.props.players.find((player) => {
                        // console.log("player.uid = " + player.uid);
                        // console.log("props.uid = " + props.uid);
                        // console.log("about to return " + !!(player.uid === props.uid));
                        return (player.uid === this.props.uid)
                    }) ? (
                        <button className='buttonView' onClick={this.viewGame}>View</button>
                    ) : (<div></div>)
                }
            </div >
        );

        // return (
        //     <div>
        //             <div className='rowList'>
        //                 <div className='colList-med'>
        //                     <div className='headerList'>Name</div>
        //                     <i>{ref.name}</i>
        //                     {ref.deleted ?
        //                         <Link to={`/game/undelete/${ref.id}`}>undelete game</Link>
        //                         :
        //                         <Link to={`/game/delete/${ref.id}`}>delete game</Link>
        //                     }
        //                 </div>
        //                 <div className='colList-med'>
        //                     <div className='headerList'>Box</div>
        //                     <Link to={`/boxes/edit/${ref.box.value}`}>{ref.box.label}</Link>
        //                 </div>
        //                 <div className='colList-med'>
        //                     <div className='headerList'>Description</div>
        //                     <i>{ref.description}</i>
        //                     <Link to={`/game/edit/${ref.id}`}>edit game</Link>
        //                 </div>
        //                 <div className='colList-name'>
        //                     <div className='headerList'>Players</div>
        //                     <GamePlayerList {...ref}/>
        //                     {
        //                         ref.players !== undefined && ref.players[ref.uid] ? (
        //                             <Link to={`/game/${ref.id}/player/${ref.uid}/remove`}>leave</Link>
        //                         ) : (
        //                             <Link to={`/game/${ref.id}/player/${ref.uid}/add`}>join</Link>
        //                         )
        //                     }
        //                 </div>
        //                 <div className='colList-name'>
        //                     <div className='headerList'>Subscribers</div>
        //                     <GameSubscriberList {...ref}/>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );
    };
}
const mapStateToProps = (state, props) => {

    // console.log("GamePlayerList mapStateToProps state = " + JSON.stringify(state, null, 2));
    // console.log("GamePlayerList mapStateToProps props = " + JSON.stringify(props, null, 2));
    let playerList = selectGamePlayers(state.players, props.players);
    // console.log("playerList = " + JSON.stringify(playerList, null, 2));
    return {
        players: playerList
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    startJoinGame: (data) => {
        dispatch(startAddPlayerToGame(data));
        dispatch(startAddGameToPlayer(data));
    },
    startQuitGame: (data) => {
        dispatch(startRemovePlayerFromGame(data));
        dispatch(startRemoveGameFromPlayer(data));
    },
    startSetPlayerRollingGame: (data) => dispatch(startSetPlayerRollingGame(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
