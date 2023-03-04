import "./ExpenseDate.css";

/* Adding this import for React from 'react' but it is not required because modern
React project setups use it behind the scenes for transforming the JSX code to 
React.createElement() method calls. */
import React from "react";

/* We added the "props" parameter here because we are setting the "date" attribute on 
the 'ExpenseDate' component in the 'ExpenseItem' component function. 

Also note we have added the import for ExpenseDate.css which would be found at 
"react-complete-guide-code-03-react-basics-working-with-components\extra-files" to the 
top and added the classes to the JSX code of this component. 
*/

// function ExpenseDate(props) {

// Here we use a different function syntax.
const ExpenseDate = (props) => {
  /* We use the toLocaleString() method of the JavaScript Date object that provides us 
  options to format our date. See MDN for details about this method. */
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const year = props.date.getFullYear();
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  // console.log("Inside ExpenseDate");
  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
