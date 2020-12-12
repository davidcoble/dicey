import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { startSaveUserPage } from '../actions/auth';

export const PrivateRoute = ({
                                 isAuthenticated,
                                 isAdmin,
                                 name,
                                 component: Component,
                                 path,
                                 startSaveUserPage,
                                 ...rest
                             }) => {
    /* TODO:  move startSaveUserPage out of this ... constructor? */
    console.log("isAdmin = " + isAdmin);
    console.log("Private Route isAuthenticated =" + JSON.stringify(isAuthenticated, null, 2));
    return (
        <Route {...rest} component={(props) => {
            startSaveUserPage(window.location.href);
            // console.log("Route props = " + JSON.stringify(props, null, 2));
            return (isAuthenticated ? (
                <div>
                    <Header/>
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to="/"/>
            ));
        }}/>
    )
};


const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid,
        name: state.auth.name
    };
}

const mapDispatchToProps = (dispatch) => ({
    startSaveUserPage: (path) => dispatch(startSaveUserPage(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
