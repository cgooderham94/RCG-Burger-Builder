import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        { props.isAuthenticated && <NavigationItem link="/orders">Orders</NavigationItem> }
        { props.isAuthenticated ? 
            <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/login">Login</NavigationItem> }
    </ul>
);

export default navigationItems;