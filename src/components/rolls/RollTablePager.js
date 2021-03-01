import React from 'react';
import { connect } from 'react-redux';
import { startSetLinesPerPage } from "../../actions/players";

export class RollTablePager extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ...props
    //     }
    // }

    setLinesPerPage = (lines) => {
        console.log("lines per page: " + lines);
        this.props.startSetLinesPerPage(this.props.uid, this.props.gid, lines)
    }

    render() {
        return (
            <table className="pagerTable">
                <thead>
                <tr>
                    <th>
                        lines per page
                    </th>
                    <th>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </th>
                    <th>
                        first
                    </th>
                    <th>
                        prev
                    </th>
                    <th>
                        jump to
                    </th>
                    <th>
                        next
                    </th>
                    <th>
                        last
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <button className="button--tight button--trans"
                                onClick={() => this.setLinesPerPage(2)}>2
                        </button>
                        <button className="button--tight button--trans"
                                onClick={() => this.setLinesPerPage(4)}>4
                        </button>
                        <button className="button--tight button--trans"
                                onClick={() => this.setLinesPerPage(8)}>8
                        </button>
                        <button className="button--tight button--trans"
                                onClick={() => this.setLinesPerPage(16)}>16
                        </button>
                        <button className="button--tight button--trans"
                                onClick={() => this.setLinesPerPage(32)}>32
                        </button>
                        <button className="button--tight button--trans"
                                onClick={() => this.setLinesPerPage(64)}>64
                        </button>
                        <button className="button--tight button--trans"
                                onClick={() => this.setLinesPerPage(128)}>128
                        </button>
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        <button className="button--tight button--trans"
                                onClick={() => this.jumpToPage(1)}>&lt;&lt;&lt;--
                        </button>
                    </td>
                    <td>
                        <button className="button--tight button--trans"
                                onClick={() => this.jumpToPage(1)}>&lt;--
                        </button>
                    </td>
                    <td>
                        <button className="button--tight button--trans"
                                onClick={() => this.jumpToPage(1)}>2 3 4 5 6
                        </button>
                    </td>
                    <td>
                        <button className="button--tight button--trans"
                                onClick={() => this.jumpToPage(1)}>--&gt;
                        </button>
                    </td>
                    <td>
                        <button className="button--tight button--trans"
                                onClick={() => this.jumpToPage({lastPage})}>--&gt;&gt;&gt;
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state, props) => {
    let player = state.players.find((p) => {
        return p.uid === state.auth.uid
    });
    let gid = player.rollingGame;
    return {
        uid: state.auth.uid,
        gid: gid
    }
};

const mapDispatchToProps = (dispatch, props) => ({
    startSetLinesPerPage: (uid, gid, linesPerPage) => dispatch(startSetLinesPerPage(uid, gid, linesPerPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RollTablePager);
