import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
    {label: "Bacon", type: "bacon"}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p className={classes.TotalPrice}>
            <strong>{'Current Price: £' + props.totalPrice.toFixed(2)}</strong>
        </p>

        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label}
                          type={ctrl.type}
                          added={() => props.ingredientAdded(ctrl.type)}
                          remove={() => props.ingredientRemoved(ctrl.type)}
                          disabled={props.disabled[ctrl.type]}/>
        ))}

        <button className={classes.OrderButton} onClick={props.ordered} disabled={!props.purchasable}>ORDER NOW</button>
    </div>
)

export default buildControls;