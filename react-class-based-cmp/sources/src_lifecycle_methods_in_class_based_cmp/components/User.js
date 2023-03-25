import { Component } from 'react';

import classes from './User.module.css';

class User extends Component {

  /* Note: The component lifecycle methods would be called once for each 
  instance of the component. Since we have 3 User components i.e. why
  this componentWillUnmount() would be called 3 times. */
  componentWillUnmount() {
    console.log("User will unmount!");
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  } 
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
