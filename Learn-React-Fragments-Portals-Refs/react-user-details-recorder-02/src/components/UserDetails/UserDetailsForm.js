import React, { useState, Fragment, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
// import Wrapper from "../Helpers/Wrapper";

import classes from "./UserDetailsForm.module.css";

// const UserDetailsForm = (props) => {
//   const [enteredUsername, setEnteredUsername] = useState("");
//   const [enteredUserAge, setEnteredUserAge] = useState("");
//   const [error, setError] = useState(false);

//   const addUserHandler = (event) => {
//     event.preventDefault();

//     if (
//       enteredUsername.trim().length === 0 ||
//       enteredUserAge.trim().length === 0
//     ) {
//       setError({
//         title: "Invalid Input",
//         message: "Please enter a valid name and age (non-empty values)!",
//       });
//       return;
//     }

//     if (+enteredUserAge < 1) {
//       setError({
//         title: "Invalid Age",
//         message: "Please enter a valid age (> 0).",
//       });
//       return;
//     }

//     const user = {
//       name: enteredUsername,
//       age: enteredUserAge,
//     };
//     props.onUserAdded(user);
//     console.log(user);
//     setEnteredUsername("");
//     setEnteredUserAge("");
//   };

//   const nameHandler = (event) => {
//     setEnteredUsername(event.target.value);
//   };

//   const ageHandler = (event) => {
//     setEnteredUserAge(event.target.value);
//   };

//   const onConfirmHandler = () => {
//     setError(null);
//   };

//   /* Here we use a wrapping div to place the backdrop and the ErrorModal components side by 
//   side. */
//   // return (
//   //   <div>
//   //     {error && (
//   //       <ErrorModal
//   //         title={error.title}
//   //         message={error.message}
//   //         onConfirm={onConfirmHandler}
//   //       />
//   //     )}
//   //     <Card className={classes["user-details-form"]}>
//   //       <form onSubmit={addUserHandler}>
//   //         <label>Username</label>
//   //         <input type="text" value={enteredUsername} onChange={nameHandler} />

//   //         <label>Age (Years)</label>
//   //         <input type="number" value={enteredUserAge} onChange={ageHandler} />

//   //         <Button type="submit" onClick={addUserHandler}>
//   //           Add User
//   //         </Button>
//   //       </form>
//   //     </Card>
//   //   </div>
//   // );

//   /* Here we use array of components to place the backdrop and the ErrorModal components 
//   side by side, because React can render an array of JSX elements returned by the React 
//   component. */
//   // return (
//   //   [
//   //     error && (
//   //       <ErrorModal
//   //         title={error.title}
//   //         message={error.message}
//   //         onConfirm={onConfirmHandler}
//   //         key="error-modal"
//   //       />
//   //     ), 
//   //     <Card className={classes["user-details-form"]} key="add-user-card">
//   //       <form onSubmit={addUserHandler}>
//   //         <label>Username</label>
//   //         <input type="text" value={enteredUsername} onChange={nameHandler} />

//   //         <label>Age (Years)</label>
//   //         <input type="number" value={enteredUserAge} onChange={ageHandler} />

//   //         <Button type="submit" onClick={addUserHandler}>
//   //           Add User
//   //         </Button>
//   //       </form>
//   //     </Card>
//   //   ]
//   // );

//   /* Here we use a Wrappper component which is just an empty React component that simply
//   * renders the content placed between its opening and closing tags. This workaround allows 
//   us to prevent the <div> soup problem where we have unnecessary <div> tags being rendered to 
//   the real DOM i.e. those situations in which we want to have custom html components side by 
//   side and therfore we use a wrapping <div> to follow the JSX rule of having only one root 
//   level JSX element being returned from a React component.   */
//   // return (
//   //   <Wrapper>
//   //     {error && (
//   //       <ErrorModal
//   //         title={error.title}
//   //         message={error.message}
//   //         onConfirm={onConfirmHandler}
//   //         key="error-modal"
//   //       />
//   //     )} 
//   //     <Card className={classes["user-details-form"]} key="add-user-card">
//   //       <form onSubmit={addUserHandler}>
//   //         <label>Username</label>
//   //         <input type="text" value={enteredUsername} onChange={nameHandler} />

//   //         <label>Age (Years)</label>
//   //         <input type="number" value={enteredUserAge} onChange={ageHandler} />

//   //         <Button type="submit" onClick={addUserHandler}>
//   //           Add User
//   //         </Button>
//   //       </form>
//   //     </Card>
//   //   </Wrapper>
//   // );

//   /* We saw how we can gracefully overcome the <div> soup prblem by using wrapper component.
//   But we don't have to create a custom wrapper component because there is a built in one
//   available. We can use either <></> or <React.Fragment></React.Fragment> as wrapper 
//   component. */
//   // return (
//   //   <>
//   //     {error && (
//   //       <ErrorModal
//   //         title={error.title}
//   //         message={error.message}
//   //         onConfirm={onConfirmHandler}
//   //         key="error-modal"
//   //       />
//   //     )} 
//   //     <Card className={classes["user-details-form"]} key="add-user-card">
//   //       <form onSubmit={addUserHandler}>
//   //         <label>Username</label>
//   //         <input type="text" value={enteredUsername} onChange={nameHandler} />

//   //         <label>Age (Years)</label>
//   //         <input type="number" value={enteredUserAge} onChange={ageHandler} />

//   //         <Button type="submit" onClick={addUserHandler}>
//   //           Add User
//   //         </Button>
//   //       </form>
//   //     </Card>
//   //   </>
//   // );

//   // Here we use React.Fragment as  wrapper component.
//   // return (
//   //   <React.Fragment>
//   //     {error && (
//   //       <ErrorModal
//   //         title={error.title}
//   //         message={error.message}
//   //         onConfirm={onConfirmHandler}
//   //         key="error-modal"
//   //       />
//   //     )} 
//   //     <Card className={classes["user-details-form"]} key="add-user-card">
//   //       <form onSubmit={addUserHandler}>
//   //         <label>Username</label>
//   //         <input type="text" value={enteredUsername} onChange={nameHandler} />

//   //         <label>Age (Years)</label>
//   //         <input type="number" value={enteredUserAge} onChange={ageHandler} />

//   //         <Button type="submit" onClick={addUserHandler}>
//   //           Add User
//   //         </Button>
//   //       </form>
//   //     </Card>
//   //   </React.Fragment>
//   // );

//   /* Right now we use ErrorModal component(which contains the modal and the backdrop) nested 
//   inside a React component.
//   In bigger applications these could be deeply nested inside other custom html components. 
//   But ErrorModal should be adjacent to the root element of our application because this
//   component is reusable and its backdrop and modal are stacked above all the elements in our 
//   application. If they are deeply nested inside other html components it could cause
//   styling or accessibility issues and even if it doesn't generally it is not 
//   semantically correct i.e. DOM structure wise this implementation is not good. 
  
//   That is where we use another React feature called Portals to enable us write our components
//   the way we want to so as to easily pass data around but the html content of those 
//   components would be rendered somewhere else in the real DOM. 
  
//   For example we can continue to use the ErrorModal and backdrop here in this 
//   UserDetailsForm component but their html content would be rendered on the root level 
//   adjacent to the App component which is the root level component. */
//   return (
//     <Fragment>
//       {error && (
//         <ErrorModal
//           title={error.title}
//           message={error.message}
//           onConfirm={onConfirmHandler}
//           key="error-modal"
//         />
//       )} 
//       <Card className={classes["user-details-form"]} key="add-user-card">
//         <form onSubmit={addUserHandler}>
//           <label>Username</label>
//           <input type="text" value={enteredUsername} onChange={nameHandler} />

//           <label>Age (Years)</label>
//           <input type="number" value={enteredUserAge} onChange={ageHandler} />

//           <Button type="submit" onClick={addUserHandler}>
//             Add User
//           </Button>
//         </form>
//       </Card>
//     </Fragment>
//   );
// };

/* Here we use refs instead of state to fetch the user entered data and to reset the form 
after the user submits it. */
const UserDetailsForm = (props) => {
  const [error, setError] = useState(false);

  /* useRef() is a React hook and must be used inside a functional component and outside
  any function or loops or conditional constructs. 
  useRef() returns a value which is a reference to the DOM element to which we connnect
  useRef() to. Here we connected "nameInputRef" to the "input" element that takes the 
  username by using the "ref" props on the "input" element.

  Also note that using refS shortened our code a bit and we should not use refs to manipulate
  the DOM directly but there are some exceptions. Like when we want to just reset the
  form elements we can do so by manipulating the DOM using the refs connected to the 
  required form elements. 
  
  When we use refs to fetch the user inputs and to reset the form input elements then this
  UserDetailsForm component becomes an uncontrolled component because React is not
  controlling the internal state of the form input elements in order to display values 
  in accordance with the state. We just are getting a references to the input elemnets to
  interact with it. */
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (
      enteredName.trim().length === 0 ||
      enteredAge.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values)!",
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }

    const user = {
      name: enteredName,
      age: enteredAge,
    };

    props.onUserAdded(user);
    console.log(user);
    
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const onConfirmHandler = () => {
    setError(null);
  };

   return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={onConfirmHandler}
          key="error-modal"
        />
      )} 
      <Card className={classes["user-details-form"]} key="add-user-card">
        <form onSubmit={addUserHandler}>
          <label>Username</label>
          <input type="text" ref={nameInputRef} />

          <label>Age (Years)</label>
          <input type="number" ref={ageInputRef} />

          <Button type="submit" onClick={addUserHandler}>
            Add User
          </Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default UserDetailsForm;
