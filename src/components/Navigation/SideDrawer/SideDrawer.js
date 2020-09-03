import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    // ...
    return (
        <div className={classes.SideDrawer}>
            <div>MENU</div>

            <div className={classes.Logo}>
                <Logo></Logo>
            </div>

            <nav>
                <NavigationItems></NavigationItems>
            </nav>
        </div>
    );
};

export default sideDrawer;