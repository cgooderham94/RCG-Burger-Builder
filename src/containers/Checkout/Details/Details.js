import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Details.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObj, checkValidity } from '../../../shared/utility';

const Details = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                name: 'name',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                name: 'street',
                placeholder: 'Your Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        postCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                name: 'postCode',
                placeholder: 'Post Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 8
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                name: 'name',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                name: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {
                        value: 'fastest',
                        label: 'Fastest'
                    },
                    {
                        value: 'cheapest',
                        label: 'Cheapest'
                    }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true,
            touched: false
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let formElementId in orderForm) {
            formData[formElementId] = orderForm[formElementId].value
        }

        let order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }

        props.onOrderSubmitted(order, props.authToken);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObj(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObj(orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        var formValidity = true;

        for (let inputIdentifier in updatedOrderForm) {
            setFormIsValid(updatedOrderForm[inputIdentifier].valid && formValidity);
        }

        setOrderForm(updatedOrderForm);
    }

    const formElementsArray = [];

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    value={formElement.config.value}/>
            ))}

            <Button btnType="Success" clicked={orderHandler} disabled={!formIsValid}>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.Details}>
            <h4>Enter your details</h4>

            { form }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderSubmitted: (orderData, authToken) => dispatch(actions.purchaseBurger(orderData, authToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Details, axios));