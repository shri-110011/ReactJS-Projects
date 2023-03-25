// import { Fragment, useState, useEffect } from "react";
import { Fragment, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

class UserFinder extends Component {
  constructor() {
    super();
    this.state = {
      // filteredUsers: DUMMY_USERS,
      filteredUsers: DUMMY_USERS,
      searchTerm: "",
    };
  }

  searchChangeHandler(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  /* Note: Since in class based components we can't use the React hooks,
  so we have the concept of Component Lifecycle. Here we have some built
  in methods available because we inherit the Component class from 'react'
  , which we can use to execute code at differnt points of the Component 
  Lifecycle. 

  componentDidUpdate() - This will be executed whenever the component was 
  updated because of state change i.e. after the JSX code was re-evaluated
  because of state change.

  componentDidUpdate() is equivalent to useEffect(…, []), because this 
  version of useEffect(…, []) in functional components runs the effect 
  function only once for the first time, after the JSX code has been 
  evaluated.
  
  */

  /* This will cause infinite loop. Because for every state change this 
    componentDidUpdate() will execute and inside it we everytime update
    the state which then cause this componentDidUpdate() to be called
    again and we get an infinite loop.*/
  // componentDidUpdate() {
  //   this.setState((prevState) => {
  //     return {
  //       filteredUsers: prevState.filteredUsers.filter((user) =>
  //         user.name.includes(prevState.searchTerm)
  //       ),
  //     };
  //   });
  // }

  /* componentDidUpdate(prevProps, prevState) receives two parameters 
  by React.
  prevProps holds the previous 'props' snapshot before this component was 
  updated.
  prevState holds the previous 'this.state' snapshot before this component 
  was updated.

  Here we use if statement inside componentDidUpdate() to avoid infinite
  loop because of the state updation inside of it.
  */
  componentDidUpdate(prevProps, prevState) {
    // console.log("prevState.searchTerm: " + prevState.searchTerm);
    // console.log("this.state.searchTerm: " + this.state.searchTerm);
    // console.log("prevState.filteredUsers: ", prevState.filteredUsers);
    // console.log("this.state.filteredUsers: ", this.state.filteredUsers);
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  /* componentDidMount() lifecycle method is called only once during the
  very first time after the JSX code has been redered. 
  This is where we can place the http request related logic because here 
  in this case we may need to fetch the user data only once from the server.
  So that is what we have simulated here. */

  componentDidMount() {
    console.log("Inside componentDidMount()")
    this.setState({filteredUsers:  DUMMY_USERS});
  }

  render() {
    console.log("Inside render():");
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
