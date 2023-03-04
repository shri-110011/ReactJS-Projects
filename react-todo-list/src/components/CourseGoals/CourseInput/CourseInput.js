import React, { useState } from 'react';
// import styled from 'styled-components';

import Button from '../../UI/Button/Button';
// import './CourseInput.css';

import styles from './CourseInput.module.css';

/* Note here we are having more than one component in the .js file one is the functional
component "CourseInput" and the other one is the styled component "FormControl". If we
want to use the styled component in more than one component then we can create a separate
.js file for it. */
// const FormControl = styled.div`
//   margin: 0.5rem 0;

//   /* We also can dynamically change parts of the css styles using the "props" object that 
//   is available inside this backticks, provided by the "styled-components". */
//   & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${props => props.invalid ? "red" : "black"};
//   }

//   & input {
//     display: block;
//     width: 100%;
//     border: 1px solid ${props => props.invalid ? "red" : "#ccc"};
//     background:  ${props => props.invalid ? "#ffd7d7" : "transparent"};
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//   }

//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }

//   // &.invalid input {
//   //   border-color: "red";
//   //   background-color: #ffd7d7;
//   // }

//   // &.invalid label {
//   //   color: red;
//   // }
// `;

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');

  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if(event.target.value.trim().length !== 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();

    if(enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  /* Here we added the dynamic inline style for the label and the input field for the 
  case when the "enteredValue" is invalid. For this we also added an extra piece of 
  state "isValid".
  But we should also note that we have style duplication because of this dynamic inline 
  style approach. We are resetting the "borderColor" back to its original light grey color 
  once the "enteredValue" is correct, in the inline style but this is already there in 
  the css file so this is the style duplication. */
  // return (
  //   <form onSubmit={formSubmitHandler}>
  //     <div className="form-control">
  //       <label style={{color: isValid ? "black" : "red"}}>Course Goal</label>
  //       <input 
  //         type="text" 
  //         onChange={goalInputChangeHandler}
  //         style={{
  //           borderColor: isValid ? "#ccc" : "red", 
  //           backgroundColor: isValid ? "transparent" : "salmon"
  //         }} />
  //     </div>
  //     <Button type="submit">Add Goal</Button>
  //   </form>
  // );

  /* Look, here we add the dynamic css classes instead of the dynamic inline style which 
  also helps us ahcieve the same conditional styling task but this approach also helps to
  avoid style duplication and we deal with styles only in the css files. */
  // return (
  //   <form onSubmit={formSubmitHandler}>
  //     <div className={`form-control ${!isValid ? "invalid" : ""}`}>
  //       <label>Course Goal</label>
  //       <input 
  //         type="text" 
  //         onChange={goalInputChangeHandler} />
  //     </div>
  //     <Button type="submit">Add Goal</Button>
  //   </form>
  // );

  /* Note we now made use the styled component "FormControl" to combine the "div" and its
  styles. And we also pass it the dynamic css class "invalid" using embedded expression 
  and "styled components" package will automatically pass through the known props to the 
  underlying target element ("div" in this case) for simple elements. */
  // return (
  //   <form onSubmit={formSubmitHandler}>
  //     <FormControl className={!isValid && "invalid"}>
  //       <label>Course Goal</label>
  //       <input 
  //         type="text" 
  //         onChange={goalInputChangeHandler} />
  //     </FormControl>
  //     <Button type="submit">Add Goal</Button>
  //   </form>
  // );

  /* Here we use another feature provided by the "styled-components" which is that it pass
  through all the props set on the styled component to the underlying component it 
  creates. Using this feature we dynamically change parts of the css styles. */
  // return (
  //   <form onSubmit={formSubmitHandler}>
  //     <FormControl invalid={!isValid}>
  //       <label>Course Goal</label>
  //       <input 
  //         type="text" 
  //         onChange={goalInputChangeHandler} />
  //     </FormControl>
  //     <Button type="submit">Add Goal</Button>
  //   </form>
  // );

  /* Here we use css modules to add normal styles and to dynamically add class to the 
  DOM elements. 
  Note: When we say styles.invalid we are referring to a converted css class name
  genarated by css modules behind the scenes. And for style.form-control, form-control
  is not a valid key name so we use the other way i.e. styles['form-control'] to
  refer to the converted css class name genarated by css modules.
  
  And finally for adding media queries while using css modules, is easy. We just need to 
  add the media query in the css file as we normally do.
   */
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
        <label>Course Goal</label>
        <input 
          type="text" 
          onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );

};

export default CourseInput;
