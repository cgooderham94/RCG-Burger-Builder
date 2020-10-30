import React from 'react';

import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={classes.InputElement}
                    value={props.value} 
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} 
                            value={option.value}>{option.label}</option>
                    ))}
                </select>
            );
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
        default:
            inputElement = <input className={classes.InputElement}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>
    }

    return (
        <div className={classes.FieldContainer}>
            <label></label>
            {inputElement}
        </div>
    )
};

export default input;