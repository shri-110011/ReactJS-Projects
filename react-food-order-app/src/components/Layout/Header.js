import {Fragment} from 'react';
/* Note: We import the image in a similar way as we import css files i.e. we 
specify path of the image along with the image name and its extension. */
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    // return (
    //     <Fragment>
    //         <header className={classes.header}>
    //             <h1>ReactMeals</h1>
    //             <button>Cart</button>
    //         </header>
    //         <div className={classes['main-image']}>
    //             <img src= {mealsImage} alt="A table full of delicious food!" />
    //         </div>
    //     </Fragment>
    // );

    // Added the HeaderCartButton component.
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src= {mealsImage} alt="A table full of delicious food!" />
            </div>
        </Fragment>
    );
}

export default Header;