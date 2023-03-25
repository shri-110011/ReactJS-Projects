// import { useState } from 'react';
import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

/* Note: In class based components we can't use the React hooks. */
class Users extends Component {

  constructor() {
    super();
    console.log("Inside Constructor")
    this.name="John";
    this.state = {
      showUsers: true,
    }
  }

  toggleUsersHandler() {
    this.setState(prevState => {
      return {
        showUsers: !prevState.showUsers
      }
    })
  };

  render() {
    const usersList = (
      <ul>
        {DUMMY_USERS.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    const person = {
      name: "Bob",
      age: 24
    }

    /* Note: We used this.toggleUsersHandler.bind(this) function to specify 
    what the 'this' keyword inside the toggleUsersHandler() would refer to.
    If we don't specify this.toggleUsersHandler.bind(this) then the 'this'
    inside toggleUsersHandler() won't refer to the 'this' keyword referring
    to the context when the JSX code was executed, and then we would get 
    TypeError if we try to access any class property or method inside 
    toggleUsersHandler().
    */
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
