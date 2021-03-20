import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObj } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
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
            },
        },
        isSignup: true
    }

    componentDidMount () {
        if (!this.props.building && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = updateObj(this.state.controls, {
            [inputIdentifier]: updateObj(this.state.controls[inputIdentifier], {
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            })
        });

        this.setState({controls: updatedControls});
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render () {
        const formElementsArray = [];
        let authRedirect = null;

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value}/>
        ));


        if (this.props.loading) {
            form = <Spinner></Spinner>;
        }

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;
        }

        return (
            <div className={classes.Auth}>
                {this.props.error && <ErrorMessage message={this.props.error.message}></ErrorMessage>}

                {authRedirect}

                <form onSubmit={this.submitHandler}>
                    {form}

                    <Button btnType="Success">Submit</Button>
                    <Button 
                        btnType="Danger" clicked={(event) => this.switchAuthModeHandler(event)}>Switch To {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
                </form>
            </div>
        );
    }
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