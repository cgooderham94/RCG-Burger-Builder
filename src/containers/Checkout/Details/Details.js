import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './Details.module.css';

class Details extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            city: '',
            postCode: ''
        }
    }

    render() {
        return (
            <div className={classes.Details}>
                <h4>Enter your details</h4>

                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="city" placeholder="City" />
                    <input className={classes.Input} type="text" name="postcode" placeholder="Post Code" />

                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default Details;