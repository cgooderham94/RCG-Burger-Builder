import React from 'react';

import burgerLogo from '../../assets/img/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="BigBurger Logo" />
    </div>
)

export default logo;