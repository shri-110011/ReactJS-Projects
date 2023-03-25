// import React, { useState, useEffect, useContext } from "react";
import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

//     if (storedUserLoggedInInformation === "1") {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const loginHandler = (email, password) => {
//     localStorage.setItem("isLoggedIn", "1");
//     setIsLoggedIn(true);
//   };

//   const logoutHandler = () => {
//     localStorage.removeItem("isLoggedIn");
//     setIsLoggedIn(false);
//   };

//   return (
//     /* We removed the React.Fragment empty wrapper since we are now using the 
//     AuthContext.Provider component to wrap the adjacent components. 
//     After providing the context we need to then consume it i.e to use the context
//     value in the components that are descendens of this AuthContext.Provider and 
//     need this context value.
    
//     We can't only set string or objects or other JavaScript datatypes as values to 
//     the context but we can also set reference to the function as value to the 
//     context. That is what we do by setting the "logoutHandler" as value to the 
//     "onLogout" key in the context. Thus we have a dynamic context where we don't 
//     just pass data to our components but also functions.
//     */
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: isLoggedIn,
//         onLogout: logoutHandler,
//       }}
//     >
//       {/* The <main> tag specifies the main content of a document.
//       The content inside the <main> element should be unique to the document. It 
//       should not contain any content that is repeated across documents such as 
//       sidebars, navigation links, copyright information, site logos, and search 
//       forms. */}
//       <MainHeader />
//       <main>
//         {!isLoggedIn && <Login onLogin={loginHandler} />}
//         {isLoggedIn && <Home onLogout={logoutHandler} />}
//       </main>
//     </AuthContext.Provider>
//   );
// }

/* Here we have a more focused "App" component whose main task is to bring 
something to the screen. We have moved the "AuthContext.Provider" wrapper that was
responsible for managing app wide state into "AuthContextProvider" component in
auth-context.js file. So this is a best practice which developers may prefer more.
 */
function App() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
