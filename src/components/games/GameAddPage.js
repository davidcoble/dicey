import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import { startAddGame } from '../../actions/games';

export class GameAddPage extends React.Component {
  onSubmit = (game) => {
    this.props.startAddGame(game);
    this.props.history.push('/games');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Game</h1>
          </div>
        </div>
        <div className="content-container">
          <GameForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddGame: (game) => dispatch(startAddGame(game))
});

export default connect(undefined, mapDispatchToProps)(GameAddPage);
