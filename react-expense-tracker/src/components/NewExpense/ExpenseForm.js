import React, { useState } from "react";
import "./ExpenseForm.css";

// const ExpenseForm = () => {

// const titleChangedHandler = () => {
//     console.log("Title changed!");
// }

/* We use the regular event object that would be available automatically whenever the
    event handler is called. This event has a "target" object that has a "value" property 
    which can be used to get the user input. */
// const titleChangedHandler = (event) => {
//     console.log(event);
// }

/* We can call useState() multiple times to declare separate state variables and to 
    manage them separately. And we here pass an empty string to provide an initial value 
    to the state variable and also because the number and date values would also appear 
    as string in event.target.value. And remember that React hooks can be placed only at 
    the top level of the component function. */
// const [enteredTitle, setEnteredTitle] = useState("");
// const [enteredAmount, setEnteredAmount] = useState("");
// const [enteredDate, setEnteredDate] = useState("");

// const titleChangedHandler = (event) => {
//     // console.log(event.target.value);
//     setEnteredTitle(event.target.value);
// }

/* Note: Amount value and Date values would appear as string in the event.target.value 
    property */
// const amountChangedHandler = (event) => {
//     // console.log(event);
//     setEnteredAmount(event.target.value);
// }

// const dateChangedHandler = (event) => {
//     // console.log(event);
//     setEnteredDate(event.target.value);
// }

//     return (
//         <form>
//             <div className="new-expense__controls">
//                 <div className="new-expense__control">
//                     <label>Title</label>
//                     {/* Note: In React onChange behaves like onInput because of the React
//                     Team's decision. So this "titleChangedHandler" would be called on
//                     every keystroke. */}
//                     <input type="text" onChange={titleChangedHandler}/>
//                 </div>
//                 <div className="new-expense__control">
//                     <label>Amount</label>
//                     <input type="number" min="0.01" step="0.01"
//                     onChange={amountChangedHandler} />
//                 </div>
//                 <div className="new-expense__control">
//                     <label>Date</label>
//                     {/* We have added this min and max attributes because later we will
//                     add filter where we use this date range. */}
//                     <input type="date" min="2019-01-01" max="2022-12-31"
//                     onChange={dateChangedHandler} />
//                 </div>
//             </div>
//             <div className="new-expense__actions">
//                 <button type="submit">Add Expense</button>
//             </div>
//         </form>
//     );
// }

/* Here we use one state to store the user inputs. This is possible because we can also 
pass an object to useState() and now we store an object containing the form inputs as 
key-value pairs. 
The downside of this approach is that for updating a specific property of this object we 
now also have to specify the otherproperties as well (which we are not updating) in the 
state updating function. This is because updating a state variable always replaces it 
instead of merging it. */
// const ExpenseForm = () => {

//     const [userInput, setUserInput] = useState({
//         enteredTitle: "",
//         enteredAmount: "",
//         enteredDate: ""
//     });

// const titleChangedHandler = (event) => {
// setEnteredTitle(event.target.value);

/* Here we use the spread operator of ES6 to copy the old properties of 
        "userInput" object and then override the propery which we want to update. */
// setUserInput({
//     ...userInput,
//     enteredTitle: event.target.value
// });

/* Here we use a different syntax with the state updating function i.e. we now
        pass a function as an argument to this state updating function. This function also
        receives the latest state for that state updating function, as an argument by React.
        We use this approach instead of the above approach where we just pass a value to 
        the state updating function is because that in the former approach React schedules 
        state updates and in certain cases where we schedule a lot of state updates and we 
        depend on the previous state for updating the state then the previous state may
        not be the correct state to depend on.
        
        But with this approach React guarantees that the previous state inside the state 
        updating function is really the latest state considering all the previous scheduled 
        state updates. That is the advantage of this syntax and is to be used whenever
        state updates depend on previous state. Below in the state updating function
        we extract the properties of the latest object(userInput) which is the previous 
        state and then override properties we want to update. */
//         setUserInput((prevState) => {
//             return {
//                 ...prevState,
//                 enteredTitle: event.target.value
//             }
//         });

//         console.log(userInput.enteredTitle);
//     }

//     const amountChangedHandler = (event) => {
//         // setEnteredAmount(event.target.value);

//         // setUserInput({
//         //     ...userInput,
//         //     enteredAmount: event.target.value
//         // });

//         setUserInput((prevState) => {
//             return {
//                 ...prevState,
//                 enteredAmount: event.target.value
//             }
//         });

//         console.log(userInput.enteredAmount);
//     }

//     const dateChangedHandler = (event) => {
//         // setEnteredDate(event.target.value);

//         // setUserInput({
//         //     ...userInput,
//         //     enteredDate: event.target.value
//         // });

//         setUserInput((prevState) => {
//             return {
//                 ...prevState,
//                 enteredDate: event.target.value
//             }
//         });

//         console.log(userInput.enteredDate);
//     }

//     return (
//         <form>
//             <div className="new-expense__controls">
//                 <div className="new-expense__control">
//                     <label>Title</label>
//                     <input type="text" onChange={titleChangedHandler}/>
//                 </div>
//                 <div className="new-expense__control">
//                     <label>Amount</label>
//                     <input type="number" min="0.01" step="0.01"
//                     onChange={amountChangedHandler} />
//                 </div>
//                 <div className="new-expense__control">
//                     <label>Date</label>
//                     <input type="date" min="2019-01-01" max="2022-12-31"
//                     onChange={dateChangedHandler} />
//                 </div>
//             </div>
//             <div className="new-expense__actions">
//                 <button type="submit">Add Expense</button>
//             </div>
//         </form>
//     );
// }

/* We again switch back to the multiple state variables approach that we used earlier 
above to capture user inputs. 
Now we add a submit listner to the overall form. Even though we could add a submit event 
listner to the submit button also but that is not the best place to add that because HTML 
form element has a default behaviour built into, i.e. if there is a button of type="submit" 
inside of the form element then on clicking that button the overall form emits a submit 
event which we can listen to. 
 */
// const ExpenseForm = () => {

//     const [enteredTitle, setEnteredTitle] = useState("");
//     const [enteredAmount, setEnteredAmount] = useState("");
//     const [enteredDate, setEnteredDate] = useState("");

//     const titleChangedHandler = (event) => {
//         setEnteredTitle(event.target.value);

//         // console.log(enteredTitle);
//     }

//     const amountChangedHandler = (event) => {
//         setEnteredAmount(event.target.value);

//         // console.log(enteredAmount);
//     }

//     const dateChangedHandler = (event) => {
//         setEnteredDate(event.target.value);

//         // console.log(enteredDate);
//     }

// const submitHandler = (event) => {
/* We add the event.preventDefault() because normally the submit event would cause 
        the submission of the form to the server that hosted this form. And after that the
        entire page also reloads which clears the form and also the user input that we 
        collected also get lost because this expenseData has the scope of this arrow 
        function submitHandler(). And we want to prevent that default form submission 
        because we want to use JavaScript to handle form submission. */
//         event.preventDefault();

//         console.log(event);

//         const expenseData = {
//             title: enteredTitle,
//             amount: enteredAmount,
//             date: enteredDate
//         }
//         console.log(expenseData);
//     }

//     return (
//         <form onSubmit={submitHandler}>
//             <div className="new-expense__controls">
//                 <div className="new-expense__control">
//                     <label>Title</label>
//                     <input type="text" onChange={titleChangedHandler}/>
//                 </div>
//                 <div className="new-expense__control">
//                     <label>Amount</label>
//                     <input type="number" min="0.01" step="0.01"
//                     onChange={amountChangedHandler} />
//                 </div>
//                 <div className="new-expense__control">
//                     <label>Date</label>
//                     <input type="date" min="2019-01-01" max="2022-12-31"
//                     onChange={dateChangedHandler} />
//                 </div>
//             </div>
//             <div className="new-expense__actions">
//                 <button type="submit">Add Expense</button>
//             </div>
//         </form>
//     );
// }

/* Here we clear the form upon user submission. For this we use Two-Way binding which 
means we now not just listen to user inputs but we can also set values to the input 
programatically. */
// const ExpenseForm = () => {

//     const [enteredTitle, setEnteredTitle] = useState("");
//     const [enteredAmount, setEnteredAmount] = useState("");
//     const [enteredDate, setEnteredDate] = useState("");

//     const titleChangedHandler = (event) => {
//         setEnteredTitle(event.target.value);
//     }

//     const amountChangedHandler = (event) => {
//         setEnteredAmount(event.target.value);
//     }

//     const dateChangedHandler = (event) => {
//         setEnteredDate(event.target.value);
//     }
//     const submitHandler = (event) => {
//         event.preventDefault();

//         // console.log(event);

//         const expenseData = {
//             title: enteredTitle,
//             amount: enteredAmount,
//             date: enteredDate
//         }
//         console.log(expenseData);

//         setEnteredTitle("");
//         setEnteredAmount("");
//         setEnteredDate("");
//     }

//     return (
//         <form onSubmit={submitHandler}>
//             <div className="new-expense__controls">
//                 <div className="new-expense__control">
//                     <label>Title</label>
//                     <input
//                     type="text"
//                     onChange={titleChangedHandler}
//                     value={enteredTitle}/>
//                 </div>
//                 <div className="new-expense__control">
//                     <label>Amount</label>
//                     <input
//                     type="number"
//                     min="0.01"
//                     step="0.01"
//                     onChange={amountChangedHandler}
//                     value={enteredAmount} />
//                 </div>
//                 <div className="new-expense__control">
//                     <label>Date</label>
//                     <input
//                     type="date"
//                     min="2019-01-01"
//                     max="2022-12-31"
//                     onChange={dateChangedHandler}
//                     value={enteredDate} />
//                 </div>
//             </div>
//             <div className="new-expense__actions">
//                 <button type="submit">Add Expense</button>
//             </div>
//         </form>
//     );
// }

/* We have generated the expenseData but this is not the component that requires this 
data instead it is the App component that needs it because we have the expenses array
over there. So far we have been passing the data top-down i.e. from the parent to the 
child component. But now we need to pass the data bottom-up i.e.from the child component 
to the parent component. To do that we employ this following pattern: 
1. Define a event handler in the parent function. 
2. Add an event attribute/prop to the child component used inside the parent component and
set to its value the reference to this event handler. 
3. Inside the child component function, call this event attribute/prop available using 
props and then pass the data as parameter to it. This way the event handler defined in the
parent component would be executed and receive the data from the child component.

This pattern of passing/moving the data/state from the child component to the parent 
component either to use that data/state over there or to further pass them down to other 
components that require it is called "Lifting the state up". The goal here is to lift
the data/state only that much up in the component tree until we reach a component that has
direct access to both the involved components i.e. the component that generates the data
and the one that actually uses it.

In our case we lift the data up to the App component i.e. the root component but it 
doesn't have to be this component everytime as mentioned above in previous paragraph. And 
the reason we lifted the state/data up to this component is because this component has 
access to the ExpenseForm(which generates the data) through NewExpense and it also has 
access to the Expenses(where this data/state will be used) because both these NewExpense
and Expenses components are being used in the JSX code of App component.
 */
const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const [formVisibilityStatus, setFormVisibilityStatus] = useState(false);

  const titleChangedHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangedHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangedHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    // console.log(event);

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount, // + is required to convert 'enteredAmount'(which is a string) to a number type 
      date: new Date(enteredDate),
    };
    props.onSaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    cancelHandler();
  };

  const cancelHandler = () => {
    setFormVisibilityStatus((prevState) => !prevState);
  };

  const newExpenseFormControls = (
    <div className="new-expense__controls">
      <div className="new-expense__control">
        <label>Title</label>
        <input
          type="text"
          onChange={titleChangedHandler}
          value={enteredTitle}
        />
      </div>
      <div className="new-expense__control">
        <label>Amount</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          onChange={amountChangedHandler}
          value={enteredAmount}
        />
      </div>
      <div className="new-expense__control">
        <label>Date</label>
        <input
          type="date"
          min="2019-01-01"
          max="2022-12-31"
          onChange={dateChangedHandler}
          value={enteredDate}
        />
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={cancelHandler}>Cancel</button>
        <button type="submit">Add Expense</button>
      </div>
    </div>
  );

  const addNewExpenseBtn = <button type="button" onClick={cancelHandler}>Add New Expense</button> ;

  return (
    <form onSubmit={submitHandler}>
      {formVisibilityStatus ? newExpenseFormControls : addNewExpenseBtn}
    </form>
  );
};

export default ExpenseForm;
