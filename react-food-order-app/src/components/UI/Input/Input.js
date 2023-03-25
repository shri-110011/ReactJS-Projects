import React from 'react';
import classes from './Input.module.css';



// const Input = (props) => {
//     return (
//         <div className={classes.input}>
//             <label htmlFor={props.input.id}>{props.label}</label>
//             <input {...props.input} />
//         </div>
//     );
// }

// Passed the Input component as an argument to the forwardRef().
const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default Input;