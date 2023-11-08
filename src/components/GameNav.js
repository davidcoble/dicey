import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export const GameNav = (props) => {
    // console.log("Nav props = " + JSON.stringify(props, null, 2));
    // props.auth.isAdmin && console.log("Bingo!");
    return (
        <div className='navDiv'>
            <nav className='navNav'>
            <NavLink activeClassName="selected" className='nav__link' to='/rolls'>Rolls</NavLink>
            <NavLink activeClassName="selected" className='nav__link' to='/maps'>Maps</NavLink>
            <NavLink activeClassName="selected" className='nav__link' to='/forcepool/german'>GE Forcepool</NavLink>
            <NavLink activeClassName="selected" className='nav__link' to='/forcepool/japanese'>JA Forcepool</NavLink>
            <NavLink activeClassName="selected" className='nav__link' to='/forcepool/wally-eto'>WA ETO Forcepool</NavLink>
            <NavLink activeClassName="selected" className='nav__link' to='/forcepool/wally-pto'>WA PTO Forcepool</NavLink>
            <NavLink activeClassName="selected" className='nav__link' to='/forcepool/soviet-eto'>RU ETO Forcepool</NavLink>
            <NavLink activeClassName="selected" className='nav__link' to='/forcepool/soviet-pto'>RU PTO Forcepool</NavLink>
            <NavLink activeClassName="selected" className='nav__link' to='/forcepool/neutral-minors'>Neutral Minors</NavLink>
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
