import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(prevState => {
            return !prevState.showSideDrawer;
        });
    }

    return (
        <Aux>
            <div>Toolbar, SideDrawer, Backdrop</div>

            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuthenticated={props.isAuthenticated} />

            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} isAuthenticated={props.isAuthenticated} />

            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);