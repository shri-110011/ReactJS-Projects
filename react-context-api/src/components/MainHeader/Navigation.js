import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  /* Using the Consumer on the context object AuthContext in this case is one way 
  of consuming the context. But typically we will use a more elegant way using the
  React hook.

  If we use the Provider component on the context i.e (AuthContext.Provider) and 
  if we do not provide the "value" prop then we won't be able to access the default
  context value in the Consumer component on the same context. But if we do not use
  the AuthContext.Provider then we could access the default context value in the 
  Consumer component on the same context(AuthContext).
  */
  // return (
  //   <AuthContext.Consumer>
  //     {(ctx) => {
  //       return (
  //         <nav className={classes.nav}>
  //           <ul>
  //             {ctx.isLoggedIn && (
  //               <li>
  //                 <a href="/">Users</a>
  //               </li>
  //             )}
  //             {ctx.isLoggedIn && (
  //               <li>
  //                 <a href="/">Admin</a>
  //               </li>
  //             )}
  //             {ctx.isLoggedIn && (
  //               <li>
  //                 <button onClick={props.onLogout}>Logout</button>
  //               </li>
  //             )}
  //           </ul>
  //         </nav>
  //       );
  //     }}
  //   </AuthContext.Consumer>
  // );

  /* Here we use the React useContext() hook and then pass a reference to the 
  context whose value we want. */
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
