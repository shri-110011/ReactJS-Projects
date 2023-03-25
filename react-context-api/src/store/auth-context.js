import React, {useState, useEffect} from "react";

/* Context is a concept in React that allows us to manage component or app wide 
state. To create a context we use the React.createContext() and pass the default 
value for the context as an argument to this function. Context is just a container 
that contains some data that is to be shared component wide or app wide. So this 
context value could be as simple as some string but typically it is an object.

So component mainly allows us to avoid build long chains of "props" just to forward
data from the source to the destination. Context helps us to acheive this by 
storing the state information behind the scenes managed by React.

React.createContext() returns an object that can contain other React components. */
// const AuthContext = React.createContext({
//   isLoggedIn: false
// });

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (email, password) => {},
    onLogout: () => {}
  });

/* Here we create a dedicated context managing component "AuthContextProvider". 

Note that React context should only be used for app or component wide state 
management i.e. for states that affect multiple components. For component
configuration props is the best choice. And React context is not to be 
used for frequently changing app or component wide state because it is not 
optimized for that.
 */
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    console.log("11");
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler
      }}
    >{props.children}</AuthContext.Provider>
  );
};

/* To use this context at places where this context is required we export it. 
Since this context is required in MainHeader and Login components so we use this 
context by providing this context in the App component. Providing the context 
means using this context in the JSX code to wrap other components that want to 
listen or access this context. */
export default AuthContext;