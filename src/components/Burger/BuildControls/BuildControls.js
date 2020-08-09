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
        <h1>{'Current Price: £' + props.totalPrice}</h1>

        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label}
                          type={ctrl.type}
                          added={() => props.ingredientAdded(ctrl.type)}
                          remove={() => props.ingredientRemoved(ctrl.type)}
                          disabled={props.disabled[ctrl.type]}/>
        ))}
    </div>
)

export default buildControls;