import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName, 
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            key={ig.name} style={{
                textTransform: 'capitalize', 
                display: 'inline-block', 
                padding: '0.25rem', 
                margin: '0 5px', 
                border: '1px solid #ccc'
            }}>{ig.name} ({ig.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>GBP {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <button onClick={props.delete(props.orderId)}>Delete Order</button>
        </div> 
    )
}

export default order;