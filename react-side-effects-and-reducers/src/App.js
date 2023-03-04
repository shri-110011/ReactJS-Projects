import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Side effect is any task that happens in our application that is not directly related to
  the rendering of the UI, for example sending http requests, storing data in browser local
  storage, setting and managing timers. Here the side effect is the task of storing data in 
  browser local storage. If we would use this side effect logic directly inside this App() 
  component function then it will cause an infinite loop once we log in because then we call 
  setIsLoggedIn(true); in loginHandler() which causes this App() to be executed again and
  during this second execution cycle setIsLoggedIn(true); in the side effect code will 
  execute which causes a infinite loop. */
  // const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  // console.log("Flag 1");

  // if(storedUserLoggedInInformation === "1") {
  //   console.log("Flag 2");
  //   setIsLoggedIn(true);
  // }

  /* Here we use the useEffect() which is built in React hook to work with side effects.
  The 1st argument to the useEffect() is the function we want to run conditionally and
  not on everytime this component function is executed. The second argument to useEffect() 
  is an array containing the dependencies which would be checked for any changes on everytime 
  this component function is executed.
  */
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    console.log("Flag 1");

    if(storedUserLoggedInInformation === "1") {
      console.log("Flag 2");
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    console.log("Flag 3");
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
