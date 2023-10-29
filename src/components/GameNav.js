import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export const GameNav = (props) => {
    // console.log("Nav props = " + JSON.stringify(props, null, 2));
    // props.auth.isAdmin && console.log("Bingo!");
    return (
        <div className='navDiv'>
            <nav className='navNav'>
            <NavLink activeClassName="selected" className='nav__link' to='/rolls'>rolls</NavLink>
            <NavLink activeClassName="selected" className='nav__link' to='/maps'>maps</NavLink>
                <a className='nav__link' href='https://github.com/davidcoble/dicey/issues'>suggestions</a>
                {/*{ props.auth.isAdmin === 'true' ? (*/}
                {/*    <Link className='nav__link' to='/'>admin {props.auth.name}</Link>*/}
                {/*): (*/}
                {/*    <Link className='nav__link' to='/'>{props.auth.name}</Link>*/}
                {/*)}*/}

            </nav>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({

});
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameNav);
