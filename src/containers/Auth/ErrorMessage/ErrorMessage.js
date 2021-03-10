import React from 'react';
import classes from './ErrorMessage.module.css';

const errorMessage = (props) => {
    let message = '';

    switch (props.message) {
        case 'EMAIL_EXISTS':
            return <p className={classes.Error}>Email already exists, duh!</p>

        case 'INVALID_PASSWORD':
            return <p className={classes.Error}>Please check your password and try to sign in again.</p>

        default:
            return <p className={classes.Error}>Oops, there was an issue, please try again.</p>
    }
};

export default errorMessage;