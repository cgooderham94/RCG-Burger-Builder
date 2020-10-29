import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Details.module.css';
import axios from '../../../axios-orders';

class Details extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            city: '',
            postCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        alert('You can continue');

        this.setState({loading: true});

        let order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Charlie',
                address: '1 The Street',
                postCode: 'AA11 BBB',
                country: 'United Kingdom',
                email: 'cgooderham94@gmail.com'
            },
            deliveryMethod: 'UBER Eats'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(error => {
                this.setState({loading: false});
            });

        console.log(this.props.ingredients);
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="city" placeholder="City" />
                <input className={classes.Input} type="text" name="postcode" placeholder="Post Code" />

                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.Details}>
                <h4>Enter your details</h4>

                {form}
            </div>
        )
    }
}

export default Details;