import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObj, checkValidity } from '../../shared/utility';

const Auth = props => {
    const { building, onSetAuthRedirectPath } = props;
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                name: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                name: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 7
            },
            valid: false,
            touched: false
        }
    });
    const [isSignup, setIsSignup] = useState(true);

    const formElementsArray = [];
    let authRedirect = null;

    useEffect(() => {
        if (!building && authRedirect !== '/') {
            onSetAuthRedirectPath();
        }
    }, [building, authRedirect, onSetAuthRedirectPath]);

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = updateObj(controls, {
            [inputIdentifier]: updateObj(controls[inputIdentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
                touched: true
            })
        });

        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchAuthModeHandler = (event) => {
        event.preventDefault();
        
        setIsSignup(prevIsSignup => {
            return !prevIsSignup
        });
    }

    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            value={formElement.config.value}/>
    ));

    if (props.loading) {
        form = <Spinner></Spinner>;
    }

    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>;
    }

    return (
        <div className={classes.Auth}>
            {props.error && <ErrorMessage message={props.error.message}></ErrorMessage>}

            {authRedirect}

            <form onSubmit={submitHandler}>
                {form}

                <Button btnType="Success">Submit</Button>
                <Button 
                    btnType="Danger" clicked={(event) => switchAuthModeHandler(event)}>Switch To {isSignup ? 'Sign In' : 'Sign Up'}</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);