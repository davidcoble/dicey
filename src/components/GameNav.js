import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { gameNavList } from './games/GameNavList';
import { keystrokeClearinghouse } from './utils/KeystrokeClearinghouse';

export const GameNav = (props) => {
    // console.log("Nav props = " + JSON.stringify(props, null, 2));
    // props.auth.isAdmin && console.log("Bingo!");
    

    return (
        <div className='navDiv'>
            <nav className='navNav'>
                {gameNavList.map((nav) =>
                    <NavLink key={nav.path}
                        activeClassName="selected"
                        className='nav__link'
                        to={nav.path}>{nav.displayText}
                    </NavLink>
                )}
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
