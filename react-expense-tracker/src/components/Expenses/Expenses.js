// import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
// import Card from "./Card";
import Card from "../UI/Card";

/* Adding this import for React from 'react' but it is not required because modern
React project setups use it behind the scenes for transforming the JSX code to 
React.createElement() method calls. */
import React, { useState } from "react";

import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

/* Since we now have content between a custom HTML element i.e. the 'Card' component the
content inside it won't be rendered until we tell that custom component to support that.
And we do that by setting the value of "props" object's "children" property inside
'Card' component function. */

// function Expenses(props) {

// Here we use a different function syntax for Expenses component function.
// const Expenses = (props) => {
//   return (
//     <Card className="expenses">
//       <ExpenseItem
//         title={props.expenses[0].title}
//         amount={props.expenses[0].amount}
//         date={props.expenses[0].date}
//       />
//       <ExpenseItem
//         title={props.expenses[1].title}
//         amount={props.expenses[1].amount}
//         date={props.expenses[1].date}
//       />
//       <ExpenseItem
//         title={props.expenses[2].title}
//         amount={props.expenses[2].amount}
//         date={props.expenses[2].date}
//       />
//       <ExpenseItem
//         title={props.expenses[3].title}
//         amount={props.expenses[3].amount}
//         date={props.expenses[3].date}
//       />
//     </Card>
//   );
// }

/* Here we add a filter for the year and use lifting state concept to get the selected 
year from the ExpensesFilter into this Expenses component. */
// const Expenses = (props) => {

//   const [filteredYear, setFilteredYear] = useState("2019");

//   const filterChangedHandler = (selectedYear) => {
//     console.log(selectedYear);
//     setFilteredYear(selectedYear);
//   };

//   return (
//     <div>
//       <Card  className="expenses">
//         <ExpensesFilter selectedYear={filteredYear} onChangeFilter={filterChangedHandler} />
//         <ExpenseItem
//           title={props.expenses[0].title}
//           amount={props.expenses[0].amount}
//           date={props.expenses[0].date}
//         />
//         <ExpenseItem
//           title={props.expenses[1].title}
//           amount={props.expenses[1].amount}
//           date={props.expenses[1].date}
//         />
//         <ExpenseItem
//           title={props.expenses[2].title}
//           amount={props.expenses[2].amount}
//           date={props.expenses[2].date}
//         />
//         <ExpenseItem
//           title={props.expenses[3].title}
//           amount={props.expenses[3].amount}
//           date={props.expenses[3].date}
//         />
//       </Card>
//     </div>
//   );
// };

/* Here we render the expense items dynamically which means that we now use an array to 
show expense items.

In React if we have an array of custom HTML elements inside the curly braces then React 
will render those custom components side by side. So we make use of the JavaScript
map() available on every array to transform "props.expenses" array to an array of
JSX elements.

We see that how this approach of dynamically rendering a list of data can help us from 
repeating the component multiple times manually in the JSX code.

*/
// const Expenses = (props) => {
//   const [filteredYear, setFilteredYear] = useState("2019");

//   const filterChangedHandler = (selectedYear) => {
//     console.log(selectedYear);
//     setFilteredYear(selectedYear);
//   };

//   return (
//     <div>
//       <Card className="expenses">
//         <ExpensesFilter
//           selectedYear={filteredYear}
//           onChangeFilter={filterChangedHandler}
//         />

//         {props.expenses.map((expense) => (
//           <ExpenseItem
//             title={expense.title}
//             amount={expense.amount}
//             date={expense.date}
//           />
//         ))}
//       </Card>
//     </div>
//   );
// };

/* Here we add the "key" prop that can be added to custom as well as built in HTML tags
to help React uniquely identify the items in a list and to update the list efficiently.

Remember the value to the "key" prop must be unique per list item. */
// const Expenses = (props) => {
//   const [filteredYear, setFilteredYear] = useState("2019");

//   const filterChangedHandler = (selectedYear) => {
//     console.log(selectedYear);
//     setFilteredYear(selectedYear);
//   };

//   return (
//     <div>
//       <Card className="expenses">
//         <ExpensesFilter
//           selectedYear={filteredYear}
//           onChangeFilter={filterChangedHandler}
//         />

//         {props.expenses.map((expense) => (
//           <ExpenseItem
//             key={expense.id}
//             title={expense.title}
//             amount={expense.amount}
//             date={expense.date}
//           />
//         ))}
//       </Card>
//     </div>
//   );
// };

/* If we use the index made available by the JavaScript map() as unique value to the 
"key" prop for each of the list item then the warning:
Each child in a list should have a unique "key" prop.
would go away but still we will run into bugs if the ExpenseItem would be stateful because
the index is not associated with the item content, it is associated with the order in
which the items in the array appears and with each addition of a new item all list items
order would change and hence their assocaited state would be lost. 

So do not use index as a value for "key" prop. */
// const Expenses = (props) => {
//   const [filteredYear, setFilteredYear] = useState("2019");

//   const filterChangedHandler = (selectedYear) => {
//     console.log(selectedYear);
//     setFilteredYear(selectedYear);
//   };

//   return (
//     <div>
//       <Card className="expenses">
//         <ExpensesFilter
//           selectedYear={filteredYear}
//           onChangeFilter={filterChangedHandler}
//         />

//         {props.expenses.map((expense, index) => (
//           <ExpenseItem
//             key={index}
//             title={expense.title}
//             amount={expense.amount}
//             date={expense.date}
//           />
//         ))}
//       </Card>
//     </div>
//   );
// };


/* Here we added the code to filter the original array and to derive a new array that
has expenses with year equal to the filteredYear. And then we show that filtered expenses
to the view. */
// const Expenses = (props) => {
//   const [filteredYear, setFilteredYear] = useState("2020");

//   const filteredExpenses = props.expenses.filter(expense => {
//     return expense.date.getFullYear().toString()=== filteredYear;
//   });

//   console.log(filteredExpenses);

//   const filterChangedHandler = (selectedYear) => {
//     console.log(selectedYear);
//     setFilteredYear(selectedYear);
//   };

//   return (
//     <div>
//       <Card className="expenses">
//         <ExpensesFilter
//           selectedYear={filteredYear}
//           onChangeFilter={filterChangedHandler}
//         />

//         {filteredExpenses.map((expense) => (
//           <ExpenseItem
//             key={expense.id}
//             title={expense.title}
//             amount={expense.amount}
//             date={expense.date}
//           />
//         ))}
//       </Card>
//     </div>
//   );
// };

/* Here we conditionally output some text when no expenses are found using the
JavaScript ternary operator. */
// const Expenses = (props) => {
//   const [filteredYear, setFilteredYear] = useState("2020");

//   const filteredExpenses = props.expenses.filter(expense => {
//     return expense.date.getFullYear().toString()=== filteredYear;
//   });

//   console.log(filteredExpenses);

//   const filterChangedHandler = (selectedYear) => {
//     console.log(selectedYear);
//     setFilteredYear(selectedYear);
//   };

//   return (
//     <div>
//       <Card className="expenses">
//         <ExpensesFilter
//           selectedYear={filteredYear}
//           onChangeFilter={filterChangedHandler}
//         />

//         {filteredExpenses.length === 0 ? (<p>No Eexpenses found!</p>)
//          : 
//          (filteredExpenses.map((expense) => (
//           <ExpenseItem
//             key={expense.id}
//             title={expense.title}
//             amount={expense.amount}
//             date={expense.date}
//           />
//           ))
//         )}
      
//       </Card>
//     </div>
//   );
// };

/* Here we conditionally output some text when no expenses are found using the
JavaScript logical AND operator. */
// const Expenses = (props) => {
//   const [filteredYear, setFilteredYear] = useState("2020");

//   const filteredExpenses = props.expenses.filter(expense => {
//     return expense.date.getFullYear().toString()=== filteredYear;
//   });

//   console.log(filteredExpenses);

//   const filterChangedHandler = (selectedYear) => {
//     console.log(selectedYear);
//     setFilteredYear(selectedYear);
//   };

//   return (
//     <div>
//       <Card className="expenses">
//         <ExpensesFilter
//           selectedYear={filteredYear}
//           onChangeFilter={filterChangedHandler}
//         />

//         {filteredExpenses.length === 0 && (<p>No expenses found!</p>)}
        
//         {filteredExpenses.length > 0 && (filteredExpenses.map((expense) => (
//           <ExpenseItem
//             key={expense.id}
//             title={expense.title}
//             amount={expense.amount}
//             date={expense.date}
//           />
//           ))
//         )}
      
//       </Card>
//     </div>
//   );
// };

/* Here we conditionally output some text when no expenses are found using the
a variable to store JSX code and then using dynamic expression to render it. */
// const Expenses = (props) => {
//   const [filteredYear, setFilteredYear] = useState("2020");

//   const filteredExpenses = props.expenses.filter(expense => {
//     return expense.date.getFullYear().toString()=== filteredYear;
//   });

//   console.log(filteredExpenses);

//   const filterChangedHandler = (selectedYear) => {
//     console.log(selectedYear);
//     setFilteredYear(selectedYear);
//   };

//   let expensesContent = <p>No Expenses Found!</p>;

//   if(filteredExpenses.length > 0) {
//     expensesContent = filteredExpenses.map((expense) => (
//       <ExpenseItem
//         key={expense.id}
//         title={expense.title}
//         amount={expense.amount}
//         date={expense.date}
//       />
//       ));
//   }

//   return (
//     <div>
//       <Card className="expenses">
//         <ExpensesFilter
//           selectedYear={filteredYear}
//           onChangeFilter={filterChangedHandler}
//         />
        
//         {expensesContent}
      
//       </Card>
//     </div>
//   );
// };

/* Here we extracted the logic and the JSX code for rendering expenses list into 
ExpenseList component. And now Expenses is a bit more leaner.
*/
const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filteredExpenses = props.expenses.filter(expense => {
    return expense.date.getFullYear().toString()=== filteredYear;
  });

  console.log(filteredExpenses);

  const filterChangedHandler = (selectedYear) => {
    console.log(selectedYear);
    setFilteredYear(selectedYear);
  };

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selectedYear={filteredYear}
          onChangeFilter={filterChangedHandler}
        />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
