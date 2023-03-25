import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    /* Remember this HeaderCartButton will be re-evaluated for every change in 
    the CartContext. */
    const cartCtx = useContext(CartContext);

    const [btnIsHighLisghted, setBtnIsHighlighted] = useState(false);

    
    /* numberOfCartItems will also consider the amount of each item that has 
    been ordered. That's why we used the reduce() which basically returns a single
    value. */

    const {items} = {...cartCtx};
    const numberOfCartItems = items.reduce((curNumber, item)=>{
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} + ${btnIsHighLisghted ? classes.bump : ''}`;

    useEffect(()=> {
        if(items.length === 0) {
            return;
        }

        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    // return (
    //     <button className={classes.button} onClick={props.onClick}>
    //         <span className={classes.icon}>
    //             <CartIcon />
    //         </span>
    //         <span>Your Cart</span>
    //         <span className={classes.badge}>{numberOfCartItems}</span>
    //     </button>
    // );

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;