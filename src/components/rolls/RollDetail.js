import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import RollEpilogueForm from './RollEpilogueForm';
import { startEditRoll } from '../../actions/rolls';


export class RollDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    };
    onSubmitEpilogue = (e) => {
        // console.log("RollDetails.onSubmitEpilogue e = " + JSON.stringify(e));
        e.updates = { epilogue: e.epilogue };
        this.props.startEditRoll(e);
    };
    render() {
        return (
            <div className='rowForm'>
                <div className='colForm-time'>{
                    moment(this.state.createdAt).format('YYYY/mm/DD HH:MM:ss')
                }</div>
                <div className='colForm-name'>{this.state.createdBy}</div>
                <div className='colForm-turn'>{this.state.turn}</div>
                <div className='colForm-descr'>{this.state.description}</div>
                <div className='colForm-dice'>{this.state.dice}</div>
                <div className='colForm-sides'>{this.state.sides}</div>
                <div className='colForm-mods'>{this.state.mods}</div>
                <div className='colForm-result'>{this.state.result}</div>
                <div className='colForm-epilogue'>
                    <RollEpilogueForm
                        rid={this.state.id}
                        epilogue={this.state.epilogue}
                        onSubmit={this.onSubmitEpilogue}/>
                </div>
{/*
                <div className='rowForm'>
                    <div className='colForm'><input type='checkbox'/></div>
                    <div className='colForm'><input type='checkbox'/></div>
                </div>
*/}
            </div>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        roll: state.rolls.find((r) => {return r.id === props.id})
    }
};


const mapDispatchToProps = (dispatch, props) => ({
    startEditRoll: (id, epilogue) => dispatch(startEditRoll(id, epilogue))
});

export default connect(mapStateToProps, mapDispatchToProps)(RollDetail);
