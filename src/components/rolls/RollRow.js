import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import RollEpilogueForm from './RollEpilogueForm';
import { startEditRoll } from '../../actions/rolls';


export class RollRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        }
    };
    onSubmitEpilogue = (e) => {
        // console.log("RollRows.onSubmitEpilogue e = " + JSON.stringify(e));
        e.updates = { epilogue: e.epilogue };
        this.props.startEditRoll(e);
    };
    render() {
        return (
            <tr>
                <td className="rollTable__td__ellipsis">{
                    moment(this.state.createdAt).format('YYYY/MM/DD HH:mm:ss')
                }</td>
                <td className="rollTable__td__wrap">{this.state.createdBy}</td>
                <td className="rollTable__td__wrap">{this.state.turn}</td>
                <td className="rollTable__td__wrap">{this.state.description}</td>
                <td className="rollTable__td__wrap">{this.state.dice}</td>
                <td className="rollTable__td__wrap">{this.state.sides}</td>
                <td className="rollTable__td__wrap">{this.state.mods}</td>
                <td className="rollTable__td__wrap">{this.state.result}</td>
                <td className="rollTable__td__wrap">
                    <RollEpilogueForm
                        rid={this.state.id}
                        epilogue={this.state.epilogue}
                        onSubmit={this.onSubmitEpilogue}/>
                </td>
{/*
                <td className='rowForm'>
                    <td className='colForm'><input type='checkbox'/></td>
                    <td className='colForm'><input type='checkbox'/></td>
                </td>
*/}
            </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(RollRow);
