import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import RollEpilogueForm from './RollEpilogueForm';
import { startEditRoll } from '../../actions/rolls';
import ReactTooltip from 'react-tooltip'


export class RollRow extends React.Component {
    constructor(props) {
        super(props);
        // console.log("RollRow this.state = " + JSON.stringify(this.state, null, 2));
        // console.log("RollRow this.props = " + JSON.stringify(this.props, null, 2));
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
        //console.log("RollRow this.state = " + JSON.stringify(this.state, null, 2));

        return (
            <tr>
                <td className="rollTable__td__ellipsis">
                    <ReactTooltip id={this.props.id}>
                        Date: {moment(this.state.createdAt).format('YY/MM/DD HH:mm:ss')}<br/>
                        Player: {this.state.createdBy}<br/>
                        Description: {this.state.description}<br/>
                        Turn: {this.state.turn}<br/>
                        Dice: {this.state.dice} {this.state.sides}-sided dice<br/>
                        Modifier: {this.state.mods}<br/>
                        Result: {this.state.result}<br/>
                        Epilogue: {this.props.epilogue}
                    </ReactTooltip>
                    <a data-tip data-for={this.props.id}>
                        {moment(this.state.createdAt).format('YY/MM/DD HH:mm:ss')}
                    </a>
                </td>

                <td className="rollTable__td__ellipsis">
                    <a data-tip data-for={this.props.id}>
                        {this.state.createdBy}
                    </a>
                </td>
                <td className="rollTable__td__ellipsis">
                    <a data-tip data-for={this.props.id}>
                        {this.state.turn}
                    </a>
                </td>
                <td className="rollTable__td__ellipsis">
                    <a data-tip data-for={this.props.id}>
                        {this.state.description}
                    </a>
                </td>
                <td className="rollTable__td__ellipsis rollTable__td__center">
                    <a data-tip data-for={this.props.id}>
                        {this.state.dice}
                    </a>
                </td>
                <td className="rollTable__td__ellipsis rollTable__td__center">
                    <a data-tip data-for={this.props.id}>
                        {this.state.sides}
                    </a>
                </td>
                <td className="rollTable__td__ellipsis rollTable__td__center">
                    <a data-tip data-for={this.props.id}>
                        {this.state.mods}
                    </a>
                </td>
                <td className="rollTable__td__ellipsis rollTable__td__right">
                    <a data-tip data-for={this.props.id}>
                        {this.state.result}
                    </a>
                </td>
                <td className="rollTable__td__ellipsis">
                    <RollEpilogueForm
                        rid={this.state.id}
                        epilogue={this.state.epilogue}
                        onSubmit={this.onSubmitEpilogue}/>
                </td>
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
