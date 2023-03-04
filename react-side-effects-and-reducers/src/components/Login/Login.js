// import React, { useState, useEffect } from "react";
// import React, { useState, useReducer } from "react";
import React, { useState, useReducer, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// const Login = (props) => {
//   const [enteredEmail, setEnteredEmail] = useState("");
//   const [emailIsValid, setEmailIsValid] = useState();
//   const [enteredPassword, setEnteredPassword] = useState("");
//   const [passwordIsValid, setPasswordIsValid] = useState();
//   const [formIsValid, setFormIsValid] = useState(false);

//   /* Here we use usEffect() with dependencies specified. Dependency over here is anything
//   that we are using inside the useEffect() callback i.e. inside the annonymous function we
//   pass as 1st argument to useEffect(). We here have 3 dependencies: setFormIsValid,
//   enteredEmail, enteredPassword. setFormIsValid is just a pointer to the state updating
//   function for setting the value for "formIsValid" state and these state updating
//   functions are guarenteed by React to not change across mutiple re-executions of this
//   Login component.

//   In case we do not specify any dependency i.e. we just specify the first argument to this
//   useEffect() hook then the function inside useEEfect() would run everytime this Login
//   component is executed again.

//   Note : The calling of the state updating function is also a side-effect because we
//   call it in response to some user events or non-user event and calling it causes
//   re-execution of the component function which would cause re-evaluation of the JSX code
//   in order to re-render the UI. That is why we use useEffect() hook.

//   Another main reason for using useEffect() hook here is that we removed the code redundancy
//   by marking one place in this Login component where the form validity status check and
//   updation would occur. Earlier in multiple places this setFormIsValid() was called. */
//   useEffect(() => {
//     /* Here the code we have in the first argument to useEffect() contains the state updating
//     function which gets called for every keystroke and this is not something ideal. Because
//     if we would here have code that sends http requests to the backend server to validate if
//     the username is available, then execution of this effect on every keystroke would cause
//     a lot of unnecessary network traffic. Instead what we should do is wait for the user
//     to pause a certain duration say 500 milliseconds and then execute the checks we want to.
//     This is a programming pattern called debouncing where we avoid frequent calls to
//     time consuming functions by removing unwanted noise from the inputs. For this we can use
//     timers. */
//     // console.log("Checking form validity!");
//     // setFormIsValid(
//     //   enteredPassword.trim().length > 6 && enteredEmail.includes('@')
//     // );

//     const identifier = setTimeout(() => {
//       console.log("Checking form validity!");
//       setFormIsValid(
//         enteredPassword.trim().length > 6 && enteredEmail.includes("@")
//       );
//     }, 500);

//     /* This return statement here is a clean up function. Inside useEffect() first argument
//     (which is an annonymous function) we can return one thing and that has to be a function.
//     And it is called the clean up function. This clean up function would run before this
//     useEffect() executes the function provided as first arguement to it. And only for the
//     very first time this useEffect() executes this function provided as first arguement to
//     it before this clean up function, thereafter the clean up function will execute before
//     this useEffect() executes the function provided as first arguement to it. You can see
//     this behaviour from the console logs in chrome dev tools.

//     If you need to understand how the clean up function works in a more detail see the
//     useEffect_cleanup_function_working.html file in this project root folder that contains
//     a javascript code that explains this.  */
//     return () => {
//       console.log("Cleanup");
//       clearTimeout(identifier);
//     };
//   }, [enteredEmail, enteredPassword]);

//   /* From this below useEffect() one can look at the various parts of useEffect() and
//   what each part does. */
//   useEffect(() => {
//     console.log("EFFECT RUNNING");

//     return () => {
//       console.log("EFFECT CLEANUP");
//     };
//   }, [enteredPassword]);

//   const emailChangeHandler = (event) => {
//     setEnteredEmail(event.target.value);
//     // setFormIsValid(
//     //   event.target.value.includes('@') && enteredPassword.trim().length > 6
//     // );
//   };

//   const passwordChangeHandler = (event) => {
//     setEnteredPassword(event.target.value);
//     // setFormIsValid(
//     //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
//     // );
//   };

//   const validateEmailHandler = () => {
//     setEmailIsValid(enteredEmail.includes("@"));
//   };

//   const validatePasswordHandler = () => {
//     setPasswordIsValid(enteredPassword.trim().length > 6);
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     props.onLogin(enteredEmail, enteredPassword);
//   };

//   return (
//     <Card className={classes.login}>
//       <form onSubmit={submitHandler}>
//         <div
//           className={`${classes.control} ${
//             emailIsValid === false ? classes.invalid : ""
//           }`}
//         >
//           <label htmlFor="email">E-Mail</label>
//           <input
//             type="email"
//             id="email"
//             value={enteredEmail}
//             onChange={emailChangeHandler}
//             onBlur={validateEmailHandler}
//             autoComplete="username"
//           />
//         </div>
//         <div
//           className={`${classes.control} ${
//             passwordIsValid === false ? classes.invalid : ""
//           }`}
//         >
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={enteredPassword}
//             onChange={passwordChangeHandler}
//             onBlur={validatePasswordHandler}
//             autoComplete="current-password"
//           />
//         </div>
//         <div className={classes.actions}>
//           <Button type="submit" className={classes.btn} disabled={!formIsValid}>
//             Login
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };

/* Here we use the useReducer() React hook instead of useEffect() or useState() hooks to 
manage the states in this Login component.
useReducer() is a powerful state management hook that can be used as an alternative to 
useState() in case of complex state management.
useReducer() is to be used when:
1. We want to combine related states that must be updated together. Like the "enteredEmail"
and "emailIsValid" states which are to be updated in conjunction.
2. When we have a case where we call a state updating that updates the state based on some
other state snapshot. In such case it is better to go for useReducer().
 */
// const emailReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.val, isValid: action.val.includes("@") };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return { value: state.value, isValid: state.value.includes("@") };
//   }

//   return { value: "", isValid: false };
// };

// const passwordReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.val, isValid: action.val.trim().length > 6 };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return { value: state.value, isValid: state.value.trim().length > 6 };
//   }

//   return { value: "", isValid: false };
// };

// const Login = (props) => {
//   // const [enteredEmail, setEnteredEmail] = useState("");
//   // const [emailIsValid, setEmailIsValid] = useState();
//   // const [enteredPassword, setEnteredPassword] = useState("");
//   // const [passwordIsValid, setPasswordIsValid] = useState();
//   const [formIsValid, setFormIsValid] = useState(false);

//   const [emailState, dispatchEmail] = useReducer(emailReducer, {
//     value: "",
//     isValid: null,
//   });

//   const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
//     value: "",
//     isValid: null,
//   });

//   const emailChangeHandler = (event) => {
//     dispatchEmail({ type: "USER_INPUT", val: event.target.value });
//     setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
//   };

//   const passwordChangeHandler = (event) => {
//     dispatchPassword({ type: "USER_INPUT", val: event.target.value });
//     setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
//   };

//   const validateEmailHandler = () => {
//     dispatchEmail({ type: "INPUT_BLUR" });
//   };

//   const validatePasswordHandler = () => {
//     dispatchPassword({ type: "INPUT_BLUR" });
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     props.onLogin(emailState.value, passwordState.value);
//   };

//   return (
//     <Card className={classes.login}>
//       <form onSubmit={submitHandler}>
//         <div
//           className={`${classes.control} ${
//             emailState.isValid === false ? classes.invalid : ""
//           }`}
//         >
//           <label htmlFor="email">E-Mail</label>
//           <input
//             type="email"
//             id="email"
//             value={emailState.value}
//             onChange={emailChangeHandler}
//             onBlur={validateEmailHandler}
//             autoComplete="username"
//           />
//         </div>
//         <div
//           className={`${classes.control} ${
//             passwordState.isValid === false ? classes.invalid : ""
//           }`}
//         >
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={passwordState.value}
//             onChange={passwordChangeHandler}
//             onBlur={validatePasswordHandler}
//             autoComplete="current-password"
//           />
//         </div>
//         <div className={classes.actions}>
//           <Button type="submit" className={classes.btn} disabled={!formIsValid}>
//             Login
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };

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

/* Here we optimize the LoginComponent further by removing the setFormIsValid() state 
updating function calls from the emailChangeHandler() and passwordChangeHandler() and
placing that in the useEffect(). This is because earlier there was a possiblity that in
very rare case the setFormIsValid() may run before the "emailState" or "passwordState" 
updation process completed and hence the form validty status may get updated against the 
old state values.

To overcome this we use the useEffect() because it is guarenteed to run after the 
dependencies which in this case is the emailState.isValid and passwordState.isValid 
changes and hence it will be ok to call the state updating function setFormIsValid() which
sets the form validity state based on some other state because now the latest value of that
other state would be available inside setFormIsValid(). 
 */
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  /* Notice this object destructuring technique has been used to prevent unnecessary effect
  execution for the case when the form is already valid or invalid and further changes to the 
  input don't change the form validty status. So by using object de-structuring we are
  able to add nested properties of some object as dependencies in useEffect().
  
  See (Adding Nested Properties As Dependencies To useEffect) in readMe.txt for some more 
  explanation on this. */
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return ()=>{
      console.log("Cleanup");
      clearTimeout(identifier);
    }
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

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            autoComplete="username"
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            autoComplete="current-password"
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
