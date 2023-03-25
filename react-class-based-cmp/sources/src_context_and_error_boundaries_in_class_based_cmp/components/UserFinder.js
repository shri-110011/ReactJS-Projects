import { Fragment, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary";

class UserFinder extends Component {
  /* In class based components we can point to just one context per 
  component. We do so by setting the 'contextType' static property 
  available in the class based component because of inheritance from
  Component class. To then access the context inside the class based 
  component context we use the 'this.context' property availabe inside
  that class based component.

  There is another way to access the context in class based components i.e.
  by using the Consumer component available on the context component that 
  we saw earlier. Since the Consumer component is used in the JSX code so
  we can use it for accessing context in both functional and class based
  components.
  
  On the contrary in functional components we can point to multiple
  context by using the 'useContext' React hook. */

  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    // Send http request...
    console.log(this.context.users);
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this);
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    // return (
    //   <Fragment>
    //     <div className={classes.finder}>
    //       <input type='search' onChange={this.searchChangeHandler.bind(this)} />
    //     </div>
    //     <Users users={this.state.filteredUsers} />
    //   </Fragment>
    // );

    /* Here we use an error boundary named ErrorBoundary to catch the 
    errors thrown by the child coponents that this error boundary wraps
    around. This error boundary is a term given to a class based component
    that has the componentDidCatch() lifecycle method defined. And such
    error boundary/boundries are required to relay information from one part
    of the application to other. Such errors may not be prevented by the 
    developer but we need to handle them so that our app don't crash and
    we can inspect those errors for analytics purpose. Eg: On sending
    http request, we may get the server is offline error which we want
    to handle. */
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

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
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
