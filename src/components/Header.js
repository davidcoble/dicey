import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import Nav from "./Nav";

export const Header = (props) => {
    const startLogout = props.startLogout;
    const name = props.name;

    function showMenu() {
        history.push("/gameMenu")
    }

    return (
        <header className="header">
            <div className="content-container-header">
                <div className="header__content">
                    <Link className="header__title" to="/">
                        <h1>Alea Iacta Est</h1>
                    </Link>
                    <div className="header__right">
                        <p>Logged in as {name}</p>
                        <button className="button-tiny button--link" onClick={startLogout}>Logout</button>
                    </div>
                    <div className="header__right">
                        <Link className="button-tiny button--link" to="/boxes">boxes</Link>
                    </div>
                    <div className="header__right">
                        <button className="button-big button--link" onClick={showMenu}>&bull;&bull;&bull;</button>
                    </div>
                </div>
            </div >
            {/* <Nav auth={props} /> */}
        </header >
    );
};

const mapDispatchToProps = (dispatch) => {
    // console.log("header loading dispatch = " + JSON.stringify(dispatch, null, 2));
    return ({
        startLogout: () => dispatch(startLogout())
    });
};

const mapStateToProps = (state) => {
    // console.log("Header mapStateToProps state.auth = " + JSON.stringify(state.auth, null, 2));
    return ({
        name: state.auth.name
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
