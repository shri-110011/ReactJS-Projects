import {Component} from 'react';
import classes from './User.module.css';

class User extends Component  {

  /* Every class based component has to have a render() that would be called
  by React to render the JSX code.
  Note: We are able to access this.props inside this class because we are
  extending/inheriting the Component class. */
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }

}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
