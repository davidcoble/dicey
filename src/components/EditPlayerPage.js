import React from 'react';
import { connect } from 'react-redux';
import PlayerForm from './PlayerForm';
import { startMakePlayerAdmin } from '../actions/players';

export class EditPlayerPage extends React.Component {
  onSubmit = (isAdmin) => {
    console.log("EditPlayerPage.onSubmit isAdmin="+JSON.stringify(isAdmin));
    this.props.startMakePlayerAdmin(this.props.player.uid, isAdmin);
    this.props.history.push('/players');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Player</h1>
          </div>
        </div>
        <div className="content-container">
          <PlayerForm
            player={this.props.player}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  //console.log("EditPlayerPage mapStateToProps props = " + JSON.stringify(props, null,2 ));
  return ({
        player: state.players.find((player) => player.uid === props.match.params.id)
    });
}

const mapDispatchToProps = (dispatch, props) => ({
    startMakePlayerAdmin: (id, props) => dispatch(startMakePlayerAdmin(id, props.isAdmin))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlayerPage);
