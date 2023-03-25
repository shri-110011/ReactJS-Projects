// import React, { useState, useEffect } from "react";
// import React, { useState, useReducer } from "react";
// import React, { useState, useReducer, useEffect } from "react";
// import React, { useState, useReducer, useEffect, useContext } from "react";
import React, { useState, useReducer, useEffect, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("Cleanup");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   authCtx.onLogin(emailState.value, passwordState.value);
  // };

  /* Here we are learning the React.forwardRef() and the useImperativeHandle()
  hook which allows us to access a component's internal functionality from
  the parent component where the other component is being used. In this case
  we are accessing the functionalities exposed by Input component from this 
  Login component. 
  In this case focus() is the functionality of the Input component that we are 
  accessing from this Login component in this submitHandler(). */
  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    }
    else if(!emailIsValid) {
      emailInputRef.current.focus();
    }
    else {
      passwordInputRef.current.focus();
    }
  };

  // return (
  //   <Card className={classes.login}>
  //     <form onSubmit={submitHandler}>
  //       <div
  //         className={`${classes.control} ${
  //           emailState.isValid === false ? classes.invalid : ""
  //         }`}
  //       >
  //         <label htmlFor="email">E-Mail</label>
  //         <input
  //           type="email"
  //           id="email"
  //           value={emailState.value}
  //           onChange={emailChangeHandler}
  //           onBlur={validateEmailHandler}
  //           autoComplete="username"
  //         />
  //       </div>
  //       <div
  //         className={`${classes.control} ${
  //           passwordState.isValid === false ? classes.invalid : ""
  //         }`}
  //       >
  //         <label htmlFor="password">Password</label>
  //         <input
  //           type="password"
  //           id="password"
  //           name="password"
  //           value={passwordState.value}
  //           onChange={passwordChangeHandler}
  //           onBlur={validatePasswordHandler}
  //           autoComplete="current-password"
  //         />
  //       </div>
  //       <div className={classes.actions}>
  //         <Button type="submit" className={classes.btn} disabled={!formIsValid}>
  //           Login
  //         </Button>
  //       </div>
  //     </form>
  //   </Card>
  // );

  /* Here we created a re-usable Input component for email and password field. */
  // return (
  //   <Card className={classes.login}>
  //     <form onSubmit={submitHandler}>
  //       <Input
  //         type="email"
  //         label="E-Mail"
  //         id="email"
  //         value={emailState.value}
  //         onChange={emailChangeHandler}
  //         onBlur={validateEmailHandler}
  //         isValid={emailState.isValid}
  //         autoComplete="username"
  //       />
  //       <Input
  //         type="password"
  //         label="Password"
  //         id="password"
  //         value={passwordState.value}
  //         onChange={passwordChangeHandler}
  //         onBlur={validatePasswordHandler}
  //         isValid={passwordState.isValid}
  //         autoComplete="current-password"
  //       />
  //       <div className={classes.actions}>
  //         <Button type="submit" className={classes.btn} disabled={!formIsValid}>
  //           Login
  //         </Button>
  //       </div>
  //     </form>
  //   </Card>
  // );

  /* Note: Fuction components cannot be given "ref" prop but with 
  useImperativeHandle() and React.forwardRef() it is possible to get a reference to 
  the object exposed by that function component.

  And this approach should be used rarely and is ok for the input field focus use 
  case shown here.
  */
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          label="E-Mail"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailState.isValid}
          autoComplete="username"
        />
        <Input
          ref={passwordInputRef}
          type="password"
          label="Password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordState.isValid}
          autoComplete="current-password"
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;